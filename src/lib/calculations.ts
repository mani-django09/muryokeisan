/**
 * Shared Calculation Library
 * All calculator logic in one place for consistency and maintainability
 */

// BMI Calculator
export function calculateBMI(weight: number, height: number) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category = '';
  if (bmi < 18.5) category = '低体重';
  else if (bmi < 25) category = '普通体重';
  else if (bmi < 30) category = '肥満（1度）';
  else if (bmi < 35) category = '肥満（2度）';
  else if (bmi < 40) category = '肥満（3度）';
  else category = '肥満（4度）';
  
  return {
    bmi: parseFloat(bmi.toFixed(2)),
    category,
    weight,
    height
  };
}

// Tax Calculator
export function calculateTax(amount: number, rate: number = 10) {
  const tax = amount * (rate / 100);
  const total = amount + tax;
  
  return {
    amount,
    rate,
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
}

// Days Calculator
export function calculateDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    startDate,
    endDate,
    days: diffDays
  };
}

// Time Calculator
export function calculateTime(hours: number, minutes: number, operation: string = 'add', hours2: number = 0, minutes2: number = 0) {
  const totalMinutes1 = hours * 60 + minutes;
  const totalMinutes2 = hours2 * 60 + minutes2;
  
  let resultMinutes = operation === 'add' 
    ? totalMinutes1 + totalMinutes2 
    : totalMinutes1 - totalMinutes2;
  
  const resultHours = Math.floor(Math.abs(resultMinutes) / 60);
  const resultMins = Math.abs(resultMinutes) % 60;
  
  return {
    hours: resultHours,
    minutes: resultMins,
    totalMinutes: Math.abs(resultMinutes)
  };
}

// Percentage Calculator
export function calculatePercentage(number: number, percentage: number) {
  const result = (number * percentage) / 100;
  
  return {
    number,
    percentage,
    result: parseFloat(result.toFixed(2))
  };
}

// Body Fat Calculator
export function calculateBodyFat(gender: string, age: number, weight: number, height: number) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let bodyFat: number;
  if (gender === 'male') {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
  }
  
  return {
    gender,
    age,
    weight,
    height,
    bodyFat: parseFloat(bodyFat.toFixed(2))
  };
}

// Due Date Calculator
export function calculateDueDate(lastPeriod: string) {
  const lmp = new Date(lastPeriod);
  const dueDate = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000));
  
  return {
    lastPeriod,
    dueDate: dueDate.toISOString().split('T')[0]
  };
}

// Discount Calculator
export function calculateDiscount(price: number, discount: number) {
  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;
  
  return {
    originalPrice: price,
    discountPercent: discount,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalPrice: parseFloat(finalPrice.toFixed(2))
  };
}

// Age Calculator
export function calculateAge(birthDate: string) {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return {
    birthDate,
    age,
    nextBirthday: new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate()).toISOString().split('T')[0]
  };
}

// Property Tax Calculator
export function calculatePropertyTax(assessedValue: number, taxRate: number = 1.4) {
  const tax = assessedValue * (taxRate / 100);
  
  return {
    assessedValue,
    taxRate,
    propertyTax: parseFloat(tax.toFixed(2))
  };
}

// Income Tax Calculator
export function calculateIncomeTax(income: number) {
  let tax = 0;
  
  if (income <= 1950000) {
    tax = income * 0.05;
  } else if (income <= 3300000) {
    tax = 97500 + (income - 1950000) * 0.10;
  } else if (income <= 6950000) {
    tax = 232500 + (income - 3300000) * 0.20;
  } else if (income <= 9000000) {
    tax = 962500 + (income - 6950000) * 0.23;
  } else if (income <= 18000000) {
    tax = 1434000 + (income - 9000000) * 0.33;
  } else if (income <= 40000000) {
    tax = 4404000 + (income - 18000000) * 0.40;
  } else {
    tax = 13204000 + (income - 40000000) * 0.45;
  }
  
  return {
    income,
    tax: parseFloat(tax.toFixed(2)),
    netIncome: parseFloat((income - tax).toFixed(2))
  };
}

// Wage Calculator
export function calculateWage(hourlyRate: number, hoursPerDay: number, daysPerMonth: number) {
  const dailyWage = hourlyRate * hoursPerDay;
  const monthlyWage = dailyWage * daysPerMonth;
  const annualWage = monthlyWage * 12;
  
  return {
    hourlyRate,
    hoursPerDay,
    daysPerMonth,
    dailyWage: parseFloat(dailyWage.toFixed(2)),
    monthlyWage: parseFloat(monthlyWage.toFixed(2)),
    annualWage: parseFloat(annualWage.toFixed(2))
  };
}

// Unemployment Insurance Calculator
export function calculateUnemployment(salary: number, age: number, yearsWorked: number) {
  const dailyWage = salary / 30;
  let benefitRate = 0.5;
  
  if (dailyWage < 5000) benefitRate = 0.8;
  else if (dailyWage < 12000) benefitRate = 0.5 + (12000 - dailyWage) / 7000 * 0.3;
  
  const dailyBenefit = dailyWage * benefitRate;
  
  let days = 90;
  if (yearsWorked >= 20) days = 150;
  else if (yearsWorked >= 10) days = 120;
  else if (yearsWorked >= 5) days = 90;
  
  if (age >= 45) days += 30;
  
  const totalBenefit = dailyBenefit * days;
  
  return {
    salary,
    age,
    yearsWorked,
    dailyBenefit: parseFloat(dailyBenefit.toFixed(2)),
    days,
    totalBenefit: parseFloat(totalBenefit.toFixed(2))
  };
}
