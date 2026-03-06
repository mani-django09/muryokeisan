import { Router } from "express";
import { z } from "zod";

const router = Router();

// Validation helper
function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`).join(', ') };
  }
  return { success: true, data: result.data };
}

// BMI Calculator
const bmiSchema = z.object({
  weight: z.number().positive("体重は正の数である必要があります"),
  height: z.number().positive("身長は正の数である必要があります"),
});

router.post("/calc/bmi", (req, res) => {
  const validation = validateRequest(bmiSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { weight, height } = validation.data;
  const bmi = weight / Math.pow(height / 100, 2);
  
  let category = "";
  if (bmi < 18.5) category = "低体重";
  else if (bmi < 25) category = "普通体重";
  else if (bmi < 30) category = "肥満(1度)";
  else if (bmi < 35) category = "肥満(2度)";
  else if (bmi < 40) category = "肥満(3度)";
  else category = "肥満(4度)";

  res.json({
    bmi: parseFloat(bmi.toFixed(2)),
    category,
    weight,
    height,
  });
});

// Consumption Tax Calculator
const taxSchema = z.object({
  amount: z.number().nonnegative("金額は0以上である必要があります"),
  rate: z.number().min(0).max(100).optional(),
});

router.post("/calc/tax", (req, res) => {
  const validation = validateRequest(taxSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { amount, rate = 10 } = validation.data;
  const taxAmount = amount * (rate / 100);
  const totalAmount = amount + taxAmount;

  res.json({
    baseAmount: amount,
    taxRate: rate,
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  });
});

// Date Calculation (Days between dates)
const daysSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日付形式はYYYY-MM-DDである必要があります"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日付形式はYYYY-MM-DDである必要があります"),
});

router.post("/calc/days", (req, res) => {
  const validation = validateRequest(daysSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { startDate, endDate } = validation.data;
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ error: "無効な日付です" });
  }

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  res.json({
    startDate,
    endDate,
    days: diffDays,
    weeks: parseFloat((diffDays / 7).toFixed(2)),
    months: parseFloat((diffDays / 30.44).toFixed(2)),
    years: parseFloat((diffDays / 365.25).toFixed(2)),
  });
});

// Time Calculation (Hours and minutes)
const timeSchema = z.object({
  hours: z.number().nonnegative("時間は0以上である必要があります"),
  minutes: z.number().min(0).max(59, "分は0-59の範囲である必要があります"),
  operation: z.enum(["add", "subtract"]).optional(),
  addHours: z.number().nonnegative().optional(),
  addMinutes: z.number().nonnegative().optional(),
});

router.post("/calc/time", (req, res) => {
  const validation = validateRequest(timeSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { hours, minutes, operation = "add", addHours = 0, addMinutes = 0 } = validation.data;
  
  let totalMinutes = hours * 60 + minutes;
  const operationMinutes = addHours * 60 + addMinutes;
  
  if (operation === "add") {
    totalMinutes += operationMinutes;
  } else {
    totalMinutes -= operationMinutes;
  }

  const resultHours = Math.floor(Math.abs(totalMinutes) / 60);
  const resultMinutes = Math.abs(totalMinutes) % 60;

  res.json({
    hours: resultHours,
    minutes: resultMinutes,
    totalMinutes: Math.abs(totalMinutes),
    totalHours: parseFloat((Math.abs(totalMinutes) / 60).toFixed(2)),
  });
});

// Percentage Calculator
const percentageSchema = z.object({
  value: z.number(),
  percentage: z.number(),
  operation: z.enum(["of", "increase", "decrease", "what_percent"]).optional(),
});

router.post("/calc/percentage", (req, res) => {
  const validation = validateRequest(percentageSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { value, percentage, operation = "of" } = validation.data;
  let result = 0;

  switch (operation) {
    case "of":
      result = (value * percentage) / 100;
      break;
    case "increase":
      result = value + (value * percentage) / 100;
      break;
    case "decrease":
      result = value - (value * percentage) / 100;
      break;
    case "what_percent":
      result = (percentage / value) * 100;
      break;
  }

  res.json({
    value,
    percentage,
    operation,
    result: parseFloat(result.toFixed(2)),
  });
});

// Body Fat Calculator
const bodyFatSchema = z.object({
  gender: z.enum(["male", "female"]),
  age: z.number().positive("年齢は正の数である必要があります"),
  weight: z.number().positive("体重は正の数である必要があります"),
  height: z.number().positive("身長は正の数である必要があります"),
  waist: z.number().positive("ウエストは正の数である必要があります").optional(),
  neck: z.number().positive("首回りは正の数である必要があります").optional(),
  hip: z.number().positive("ヒップは正の数である必要があります").optional(),
});

router.post("/calc/body-fat", (req, res) => {
  const validation = validateRequest(bodyFatSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { gender, age, weight, height, waist = 0, neck = 0, hip = 0 } = validation.data;
  
  // US Navy method approximation
  let bodyFatPercentage = 0;
  
  if (gender === "male" && waist && neck) {
    bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else if (gender === "female" && waist && neck && hip) {
    bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  } else {
    // Fallback: BMI-based estimation
    const bmi = weight / Math.pow(height / 100, 2);
    if (gender === "male") {
      bodyFatPercentage = 1.20 * bmi + 0.23 * age - 16.2;
    } else {
      bodyFatPercentage = 1.20 * bmi + 0.23 * age - 5.4;
    }
  }

  let category = "";
  if (gender === "male") {
    if (bodyFatPercentage < 6) category = "必須脂肪";
    else if (bodyFatPercentage < 14) category = "アスリート";
    else if (bodyFatPercentage < 18) category = "フィットネス";
    else if (bodyFatPercentage < 25) category = "平均";
    else category = "肥満";
  } else {
    if (bodyFatPercentage < 14) category = "必須脂肪";
    else if (bodyFatPercentage < 21) category = "アスリート";
    else if (bodyFatPercentage < 25) category = "フィットネス";
    else if (bodyFatPercentage < 32) category = "平均";
    else category = "肥満";
  }

  res.json({
    bodyFatPercentage: parseFloat(bodyFatPercentage.toFixed(2)),
    category,
    gender,
    age,
    weight,
    height,
  });
});

// Due Date Calculator
const dueDateSchema = z.object({
  lastPeriodDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日付形式はYYYY-MM-DDである必要があります"),
  cycleLength: z.number().positive().optional(),
});

router.post("/calc/due-date", (req, res) => {
  const validation = validateRequest(dueDateSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { lastPeriodDate, cycleLength = 28 } = validation.data;
  const lmp = new Date(lastPeriodDate);
  
  if (isNaN(lmp.getTime())) {
    return res.status(400).json({ error: "無効な日付です" });
  }

  // Add 280 days (40 weeks)
  const dueDate = new Date(lmp);
  dueDate.setDate(dueDate.getDate() + 280);

  // Calculate current week
  const today = new Date();
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const currentWeek = Math.floor(diffDays / 7);

  res.json({
    lastPeriodDate,
    dueDate: dueDate.toISOString().split('T')[0],
    currentWeek: Math.max(0, Math.min(40, currentWeek)),
    daysUntilDue: Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))),
  });
});

// Discount Calculator
const discountSchema = z.object({
  originalPrice: z.number().positive("元の価格は正の数である必要があります"),
  discountPercent: z.number().min(0).max(100, "割引率は0-100の範囲である必要があります"),
});

router.post("/calc/discount", (req, res) => {
  const validation = validateRequest(discountSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { originalPrice, discountPercent } = validation.data;
  const discountAmount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discountAmount;
  const savedAmount = discountAmount;

  res.json({
    originalPrice,
    discountPercent,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalPrice: parseFloat(finalPrice.toFixed(2)),
    savedAmount: parseFloat(savedAmount.toFixed(2)),
  });
});

// Age Calculator
const ageSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日付形式はYYYY-MM-DDである必要があります"),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

router.post("/calc/age", (req, res) => {
  const validation = validateRequest(ageSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { birthDate, targetDate } = validation.data;
  const birth = new Date(birthDate);
  const target = targetDate ? new Date(targetDate) : new Date();
  
  if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
    return res.status(400).json({ error: "無効な日付です" });
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

  res.json({
    birthDate,
    targetDate: target.toISOString().split('T')[0],
    years,
    months,
    days,
    totalDays,
    totalMonths: years * 12 + months,
  });
});

// Property Tax Calculator (Japanese)
const propertyTaxSchema = z.object({
  assessedValue: z.number().positive("評価額は正の数である必要があります"),
  landArea: z.number().positive("土地面積は正の数である必要があります").optional(),
  buildingArea: z.number().positive("建物面積は正の数である必要があります").optional(),
});

router.post("/calc/property-tax", (req, res) => {
  const validation = validateRequest(propertyTaxSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { assessedValue, landArea = 0, buildingArea = 0 } = validation.data;
  
  // Standard rate: 1.4% (固定資産税標準税率)
  const standardRate = 0.014;
  const propertyTax = assessedValue * standardRate;
  
  // City planning tax (都市計画税): 0.3% (if applicable)
  const cityPlanningRate = 0.003;
  const cityPlanningTax = assessedValue * cityPlanningRate;
  
  const totalTax = propertyTax + cityPlanningTax;

  res.json({
    assessedValue,
    propertyTax: parseFloat(propertyTax.toFixed(0)),
    cityPlanningTax: parseFloat(cityPlanningTax.toFixed(0)),
    totalTax: parseFloat(totalTax.toFixed(0)),
    standardRate: standardRate * 100,
    cityPlanningRate: cityPlanningRate * 100,
  });
});

// Income Tax Calculator (Japanese simplified)
const incomeTaxSchema = z.object({
  annualIncome: z.number().nonnegative("年収は0以上である必要があります"),
  deductions: z.number().nonnegative("控除額は0以上である必要があります").optional(),
});

router.post("/calc/income-tax", (req, res) => {
  const validation = validateRequest(incomeTaxSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { annualIncome, deductions = 0 } = validation.data;
  const taxableIncome = Math.max(0, annualIncome - deductions);
  
  // Japanese progressive tax rates (simplified)
  let incomeTax = 0;
  if (taxableIncome <= 1950000) {
    incomeTax = taxableIncome * 0.05;
  } else if (taxableIncome <= 3300000) {
    incomeTax = 97500 + (taxableIncome - 1950000) * 0.10;
  } else if (taxableIncome <= 6950000) {
    incomeTax = 232500 + (taxableIncome - 3300000) * 0.20;
  } else if (taxableIncome <= 9000000) {
    incomeTax = 962500 + (taxableIncome - 6950000) * 0.23;
  } else if (taxableIncome <= 18000000) {
    incomeTax = 1434000 + (taxableIncome - 9000000) * 0.33;
  } else if (taxableIncome <= 40000000) {
    incomeTax = 4404000 + (taxableIncome - 18000000) * 0.40;
  } else {
    incomeTax = 13204000 + (taxableIncome - 40000000) * 0.45;
  }

  // Reconstruction surtax (復興特別所得税): 2.1%
  const reconstructionTax = incomeTax * 0.021;
  const totalTax = incomeTax + reconstructionTax;
  
  const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;

  res.json({
    annualIncome,
    deductions,
    taxableIncome,
    incomeTax: parseFloat(incomeTax.toFixed(0)),
    reconstructionTax: parseFloat(reconstructionTax.toFixed(0)),
    totalTax: parseFloat(totalTax.toFixed(0)),
    effectiveRate: parseFloat(effectiveRate.toFixed(2)),
    netIncome: parseFloat((annualIncome - totalTax).toFixed(0)),
  });
});

// Hourly Wage Calculator
const wageSchema = z.object({
  hourlyRate: z.number().positive("時給は正の数である必要があります"),
  hoursPerDay: z.number().positive("1日の労働時間は正の数である必要があります"),
  daysPerWeek: z.number().min(1).max(7, "週の労働日数は1-7の範囲である必要があります"),
});

router.post("/calc/wage", (req, res) => {
  const validation = validateRequest(wageSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { hourlyRate, hoursPerDay, daysPerWeek } = validation.data;
  
  const dailyWage = hourlyRate * hoursPerDay;
  const weeklyWage = dailyWage * daysPerWeek;
  const monthlyWage = weeklyWage * 4.33; // Average weeks per month
  const annualWage = monthlyWage * 12;

  res.json({
    hourlyRate,
    hoursPerDay,
    daysPerWeek,
    dailyWage: parseFloat(dailyWage.toFixed(0)),
    weeklyWage: parseFloat(weeklyWage.toFixed(0)),
    monthlyWage: parseFloat(monthlyWage.toFixed(0)),
    annualWage: parseFloat(annualWage.toFixed(0)),
  });
});

// Unemployment Insurance Calculator (Japanese)
const unemploymentSchema = z.object({
  monthlyWage: z.number().positive("月給は正の数である必要があります"),
  age: z.number().positive("年齢は正の数である必要があります"),
  yearsWorked: z.number().nonnegative("勤続年数は0以上である必要があります"),
  reason: z.enum(["voluntary", "company"]),
});

router.post("/calc/unemployment", (req, res) => {
  const validation = validateRequest(unemploymentSchema, req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { monthlyWage, age, yearsWorked, reason } = validation.data;
  
  // Calculate daily wage (average over 6 months)
  const dailyWage = (monthlyWage * 6) / 180;
  
  // Basic allowance rate (50-80% depending on wage)
  let allowanceRate = 0.5;
  if (dailyWage < 5000) {
    allowanceRate = 0.8;
  } else if (dailyWage < 12000) {
    allowanceRate = 0.7 - ((dailyWage - 5000) / 7000) * 0.2;
  } else {
    allowanceRate = 0.5;
  }
  
  const dailyAllowance = dailyWage * allowanceRate;
  
  // Calculate benefit days based on age and years worked
  let benefitDays = 90;
  if (reason === "company") {
    if (yearsWorked < 1) benefitDays = 90;
    else if (yearsWorked < 5) benefitDays = 90;
    else if (yearsWorked < 10) benefitDays = 120;
    else if (yearsWorked < 20) benefitDays = 150;
    else benefitDays = 180;
    
    if (age >= 45 && yearsWorked >= 20) benefitDays = 240;
  } else {
    if (yearsWorked < 10) benefitDays = 90;
    else if (yearsWorked < 20) benefitDays = 120;
    else benefitDays = 150;
  }
  
  const totalBenefit = dailyAllowance * benefitDays;

  res.json({
    monthlyWage,
    dailyWage: parseFloat(dailyWage.toFixed(0)),
    allowanceRate: parseFloat((allowanceRate * 100).toFixed(1)),
    dailyAllowance: parseFloat(dailyAllowance.toFixed(0)),
    benefitDays,
    totalBenefit: parseFloat(totalBenefit.toFixed(0)),
    monthlyEstimate: parseFloat((dailyAllowance * 30).toFixed(0)),
  });
});

export default router;
