/**
 * MuryoKeisan — Calculator API Server
 * Run: node server.js
 */

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.API_PORT || 4000;

// ────────────────────────────────────────────────────────────────
// Middleware
// ────────────────────────────────────────────────────────────────

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://muryokeisan.online',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

const isPositiveNumber    = (v) => typeof v === 'number' && isFinite(v) && v > 0;
const isNonNegativeNumber = (v) => typeof v === 'number' && isFinite(v) && v >= 0;
const err400              = (res, msg) => res.status(400).json({ error: msg });

// ────────────────────────────────────────────────────────────────
// Health check
// ────────────────────────────────────────────────────────────────

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'MuryoKeisan API is running', port: PORT });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/bmi
// Body: { height: number (cm), weight: number (kg) }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/bmi', (req, res) => {
  const { height, weight } = req.body ?? {};

  if (!isPositiveNumber(height) || !isPositiveNumber(weight)) {
    return err400(res, '身長・体重には正の数値を入力してください');
  }

  const bmi = weight / Math.pow(height / 100, 2);

  let category;
  if      (bmi < 18.5) category = '低体重';
  else if (bmi < 25)   category = '普通体重';
  else if (bmi < 30)   category = '肥満（1度）';
  else if (bmi < 35)   category = '肥満（2度）';
  else if (bmi < 40)   category = '肥満（3度）';
  else                 category = '肥満（4度）';

  res.json({
    bmi:      parseFloat(bmi.toFixed(2)),
    category,
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/body-fat
// Body: { height: cm, weight: kg, age: number, gender: 'male'|'female' }
// Formula: Deurenberg (1991)
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/body-fat', (req, res) => {
  const { height, weight, age, gender } = req.body ?? {};

  if (!isPositiveNumber(height) || !isPositiveNumber(weight) || !isPositiveNumber(age)) {
    return err400(res, '身長・体重・年齢には正の数値を入力してください');
  }
  if (!['male', 'female'].includes(gender)) {
    return err400(res, '性別は male または female を指定してください');
  }

  const bmi         = weight / Math.pow(height / 100, 2);
  const sexConstant = gender === 'male' ? 16.2 : 5.4;
  const bodyFat     = Math.max(3, Math.min(60, (1.20 * bmi) + (0.23 * age) - sexConstant));

  let category;
  if (gender === 'male') {
    if      (bodyFat < 10) category = '低い';
    else if (bodyFat < 20) category = '標準';
    else if (bodyFat < 25) category = 'やや高い';
    else                   category = '高い';
  } else {
    if      (bodyFat < 20) category = '低い';
    else if (bodyFat < 30) category = '標準';
    else if (bodyFat < 35) category = 'やや高い';
    else                   category = '高い';
  }

  res.json({ bodyFat: parseFloat(bodyFat.toFixed(1)), category });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/age
// Body: { birthDate: ISO string, referenceDate?: ISO string }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/age', (req, res) => {
  const { birthDate, referenceDate } = req.body ?? {};

  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return err400(res, '有効な生年月日を入力してください');

  const today = referenceDate ? new Date(referenceDate) : new Date();
  if (isNaN(today.getTime())) return err400(res, '基準日に有効な日付を入力してください');
  if (birth > today) return err400(res, '生年月日は基準日以前の日付を入力してください');

  let years  = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth()    - birth.getMonth();
  let days   = today.getDate()     - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) { years--; months += 12; }

  const totalDays   = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
  const totalMonths = years * 12 + months;
  const totalWeeks  = Math.floor(totalDays / 7);

  res.json({ years, months, days, totalDays, totalMonths, totalWeeks });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/days
// Body: { startDate: ISO string, endDate: ISO string }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/days', (req, res) => {
  const { startDate, endDate } = req.body ?? {};

  const start = new Date(startDate);
  const end   = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return err400(res, '有効な日付を入力してください');
  }

  const diffMs   = Math.abs(end - start);
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  res.json({
    days:   diffDays,
    weeks:  Math.floor(diffDays / 7),
    months: Math.floor(diffDays / 30.4375),
    years:  Math.floor(diffDays / 365.25),
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/due-date
// Body: { lastPeriodDate: ISO string }   ← matches frontend field name
// Naegele's rule: LMP + 280 days
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/due-date', (req, res) => {
  // Accept both lastPeriodDate (frontend) and lastPeriod (legacy)
  const rawDate = req.body?.lastPeriodDate ?? req.body?.lastPeriod;
  const lmp = new Date(rawDate);
  if (isNaN(lmp.getTime())) return err400(res, '有効な最終月経開始日を入力してください');

  const dueDate    = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
  const today      = new Date();
  const daysPassed = Math.max(0, Math.floor((today - lmp) / (1000 * 60 * 60 * 24)));
  const weeks      = Math.floor(daysPassed / 7);
  const daysRem    = daysPassed % 7;

  let trimester;
  if      (weeks < 14) trimester = '妊娠初期（〜13週）';
  else if (weeks < 28) trimester = '妊娠中期（14〜27週）';
  else                 trimester = '妊娠後期（28週〜）';

  res.json({
    dueDate:       dueDate.toISOString().split('T')[0],
    weeksPregnant: weeks,
    daysPregnant:  daysRem,
    trimester,
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/tax
// Body: { amount: number, rate?: number (default 10) }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/tax', (req, res) => {
  const { amount, rate = 10 } = req.body ?? {};

  if (!isNonNegativeNumber(amount)) return err400(res, '金額には0以上の数値を入力してください');
  if (!isPositiveNumber(rate) || rate > 100) return err400(res, '税率は0〜100の間で入力してください');

  const taxAmount       = Math.round(amount * (rate / 100));
  const totalWithTax    = amount + taxAmount;
  const totalWithoutTax = Math.round(amount / (1 + rate / 100));

  res.json({ taxAmount, totalWithTax, totalWithoutTax, rate });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/discount
// Body: { originalPrice: number, discountPercent: number }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/discount', (req, res) => {
  const { originalPrice, discountPercent } = req.body ?? {};

  if (!isNonNegativeNumber(originalPrice)) {
    return err400(res, '元の価格には0以上の数値を入力してください');
  }
  if (!isNonNegativeNumber(discountPercent) || discountPercent > 100) {
    return err400(res, '割引率は0〜100の間で入力してください');
  }

  const discountAmount = Math.round(originalPrice * (discountPercent / 100));
  const finalPrice     = originalPrice - discountAmount;
  const savedAmount    = discountAmount;

  res.json({ originalPrice, discountPercent, discountAmount, finalPrice, savedAmount });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/percentage
// Body: { value: number, percentage: number }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/percentage', (req, res) => {
  const { value, percentage } = req.body ?? {};

  if (!isNonNegativeNumber(value) || !isNonNegativeNumber(percentage)) {
    return err400(res, '値・パーセントには0以上の数値を入力してください');
  }

  const result   = (value * percentage) / 100;
  const increase = value + result;
  const decrease = value - result;

  res.json({
    result:   Math.round(result   * 100) / 100,
    increase: Math.round(increase * 100) / 100,
    decrease: Math.round(decrease * 100) / 100,
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/income-tax
// Body: { income: number, deductions: number }
// Japanese progressive income tax (令和6年度)
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/income-tax', (req, res) => {
  const { income, deductions = 0 } = req.body ?? {};

  if (!isNonNegativeNumber(income))     return err400(res, '年収には0以上の数値を入力してください');
  if (!isNonNegativeNumber(deductions)) return err400(res, '控除額には0以上の数値を入力してください');

  // 給与所得控除を自動計算
  let employmentDeduction = 0;
  if      (income <= 1_625_000)  employmentDeduction = 550_000;
  else if (income <= 1_800_000)  employmentDeduction = Math.round(income * 0.4) - 100_000;
  else if (income <= 3_600_000)  employmentDeduction = Math.round(income * 0.3) + 80_000;
  else if (income <= 6_600_000)  employmentDeduction = Math.round(income * 0.2) + 440_000;
  else if (income <= 8_500_000)  employmentDeduction = Math.round(income * 0.1) + 1_100_000;
  else                           employmentDeduction = 1_950_000;

  // 課税所得 = 年収 - 給与所得控除 - 各種所得控除
  const taxableIncome = Math.max(0, income - employmentDeduction - deductions);

  // 累進税率ブラケット
  const brackets = [
    { limit: 1_950_000,  rate: 0.05, base: 0           },
    { limit: 3_300_000,  rate: 0.10, base: 97_500       },
    { limit: 6_950_000,  rate: 0.20, base: 232_500      },
    { limit: 9_000_000,  rate: 0.23, base: 962_500      },
    { limit: 18_000_000, rate: 0.33, base: 1_434_000    },
    { limit: 40_000_000, rate: 0.40, base: 4_404_000    },
    { limit: Infinity,   rate: 0.45, base: 13_204_000   },
  ];
  const thresholds = [0, 1_950_000, 3_300_000, 6_950_000, 9_000_000, 18_000_000, 40_000_000];

  let incomeTax = 0;
  if (taxableIncome > 0) {
    const idx     = brackets.findIndex((b) => taxableIncome <= b.limit);
    const bracket = brackets[idx];
    const prev    = thresholds[idx] ?? 0;
    incomeTax     = bracket.base + (taxableIncome - prev) * bracket.rate;
  }

  // 復興特別所得税 2.1%
  const reconstructionTax = incomeTax * 0.021;
  const totalTax          = incomeTax + reconstructionTax;

  res.json({
    taxableIncome:     Math.round(taxableIncome),
    incomeTax:         Math.round(totalTax),
    netIncome:         Math.round(income - totalTax),
    effectiveRate:     income > 0 ? parseFloat(((totalTax / income) * 100).toFixed(2)) : 0,
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/property-tax
// Body: { assessedValue: number, isResidential?: boolean }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/property-tax', (req, res) => {
  const { assessedValue, isResidential = false } = req.body ?? {};

  if (!isNonNegativeNumber(assessedValue)) {
    return err400(res, '評価額には0以上の数値を入力してください');
  }

  // 住宅用地の課税標準の特例（小規模住宅用地: 1/6）
  const taxableValue      = isResidential ? assessedValue / 6 : assessedValue;
  const propertyTax       = Math.round(taxableValue * 0.014);  // 固定資産税 1.4%
  const cityPlanningTax   = Math.round(taxableValue * 0.003);  // 都市計画税 0.3%

  res.json({
    propertyTax,
    cityPlanningTax,
    total:        propertyTax + cityPlanningTax,
    taxableValue: Math.round(taxableValue),
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/wage
// Body: { hourlyWage: number, hoursPerDay: number, daysPerWeek: number }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/wage', (req, res) => {
  const { hourlyWage, hoursPerDay, daysPerWeek } = req.body ?? {};

  if (!isPositiveNumber(hourlyWage) || !isPositiveNumber(hoursPerDay) || !isPositiveNumber(daysPerWeek)) {
    return err400(res, '時給・勤務時間・勤務日数には正の数値を入力してください');
  }

  const daily   = hourlyWage * hoursPerDay;
  const weekly  = daily * daysPerWeek;
  const monthly = weekly * (52 / 12);   // 52 weeks / 12 months = 4.333...
  const yearly  = monthly * 12;

  res.json({
    daily:   Math.round(daily),
    weekly:  Math.round(weekly),
    monthly: Math.round(monthly),
    yearly:  Math.round(yearly),
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/time
// Body: { hours1, minutes1, hours2, minutes2, operation: 'add'|'subtract' }
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/time', (req, res) => {
  const { hours1 = 0, minutes1 = 0, hours2 = 0, minutes2 = 0, operation = 'add' } = req.body ?? {};

  if ([hours1, minutes1, hours2, minutes2].some((v) => !isNonNegativeNumber(v))) {
    return err400(res, '時間・分には0以上の数値を入力してください');
  }

  const t1            = hours1 * 60 + minutes1;
  const t2            = hours2 * 60 + minutes2;
  const resultMinutes = operation === 'add' ? t1 + t2 : Math.abs(t1 - t2);

  res.json({
    hours:        Math.floor(resultMinutes / 60),
    minutes:      resultMinutes % 60,
    totalMinutes: resultMinutes,
  });
});

// ────────────────────────────────────────────────────────────────
// POST /api/calc/unemployment
// Body: { salary: number (monthly), age: number, yearsWorked: number }
// 雇用保険（基本手当）簡易計算
// ────────────────────────────────────────────────────────────────

app.post('/api/calc/unemployment', (req, res) => {
  const { salary, age, yearsWorked } = req.body ?? {};

  if (!isPositiveNumber(salary) || !isPositiveNumber(age) || !isNonNegativeNumber(yearsWorked)) {
    return err400(res, '賃金・年齢・勤続年数には正の数値を入力してください');
  }

  // 所定給付日数（一般離職者・自己都合退職）
  let benefitDays;
  if      (yearsWorked < 1)  benefitDays = 0;
  else if (yearsWorked < 5)  benefitDays = 90;
  else if (yearsWorked < 10) benefitDays = 120;
  else if (yearsWorked < 20) benefitDays = 150;
  else                       benefitDays = 180;

  // 賃金日額・基本手当日額
  const dailyWage    = salary / 30;
  const MAX_BENEFIT  = 8_370; // 令和6年度上限目安
  const dailyBenefit = Math.min(Math.round(dailyWage * 0.5), MAX_BENEFIT);
  const totalBenefit = dailyBenefit * benefitDays;

  res.json({
    days:         benefitDays,
    dailyBenefit,
    totalBenefit,
  });
});

// ────────────────────────────────────────────────────────────────
// 404 & Global error handler
// ────────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, _req, res, _next) => {
  console.error('[Error]', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ────────────────────────────────────────────────────────────────
// Start
// ────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🔢  MuryoKeisan API`);
  console.log(`    http://localhost:${PORT}\n`);
  console.log('Routes:');
  console.log('  POST /api/calc/bmi');
  console.log('  POST /api/calc/body-fat');
  console.log('  POST /api/calc/age');
  console.log('  POST /api/calc/days');
  console.log('  POST /api/calc/due-date');
  console.log('  POST /api/calc/tax');
  console.log('  POST /api/calc/discount');
  console.log('  POST /api/calc/percentage');
  console.log('  POST /api/calc/income-tax');
  console.log('  POST /api/calc/property-tax');
  console.log('  POST /api/calc/wage');
  console.log('  POST /api/calc/time');
  console.log('  POST /api/calc/unemployment\n');
});