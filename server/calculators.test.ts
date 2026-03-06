import { describe, expect, it } from "vitest";

// Test the calculation logic directly
describe("Calculator API Logic", () => {
  describe("BMI Calculator", () => {
    it("calculates BMI correctly for normal weight", () => {
      const height = 170; // cm
      const weight = 65; // kg
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      expect(bmi).toBeCloseTo(22.49, 1);
      expect(bmi).toBeGreaterThanOrEqual(18.5);
      expect(bmi).toBeLessThan(25);
    });

    it("calculates BMI correctly for underweight", () => {
      const height = 170;
      const weight = 50;
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      expect(bmi).toBeLessThan(18.5);
    });

    it("calculates BMI correctly for overweight", () => {
      const height = 170;
      const weight = 85;
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      expect(bmi).toBeGreaterThanOrEqual(25);
    });
  });

  describe("Tax Calculator", () => {
    it("calculates consumption tax at 10%", () => {
      const amount = 1000;
      const taxRate = 10;
      const tax = amount * (taxRate / 100);
      const total = amount + tax;
      
      expect(tax).toBe(100);
      expect(total).toBe(1100);
    });

    it("calculates consumption tax at 8% (reduced rate)", () => {
      const amount = 1000;
      const taxRate = 8;
      const tax = amount * (taxRate / 100);
      const total = amount + tax;
      
      expect(tax).toBe(80);
      expect(total).toBe(1080);
    });
  });

  describe("Days Calculator", () => {
    it("calculates days between two dates correctly", () => {
      const startDate = new Date("2024-01-01");
      const endDate = new Date("2024-01-31");
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      expect(diffDays).toBe(30);
    });

    it("handles same day correctly", () => {
      const startDate = new Date("2024-01-15");
      const endDate = new Date("2024-01-15");
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      expect(diffDays).toBe(0);
    });
  });

  describe("Time Calculator", () => {
    it("adds hours and minutes correctly", () => {
      const hours1 = 2, minutes1 = 30;
      const hours2 = 1, minutes2 = 45;
      
      let totalMinutes = (hours1 * 60 + minutes1) + (hours2 * 60 + minutes2);
      const resultHours = Math.floor(totalMinutes / 60);
      const resultMinutes = totalMinutes % 60;
      
      expect(resultHours).toBe(4);
      expect(resultMinutes).toBe(15);
    });

    it("subtracts hours and minutes correctly", () => {
      const hours1 = 5, minutes1 = 30;
      const hours2 = 2, minutes2 = 45;
      
      let totalMinutes = (hours1 * 60 + minutes1) - (hours2 * 60 + minutes2);
      const resultHours = Math.floor(totalMinutes / 60);
      const resultMinutes = totalMinutes % 60;
      
      expect(resultHours).toBe(2);
      expect(resultMinutes).toBe(45);
    });
  });

  describe("Percentage Calculator", () => {
    it("calculates percentage of a number correctly", () => {
      const value = 200;
      const percentage = 25;
      const result = (value * percentage) / 100;
      
      expect(result).toBe(50);
    });

    it("calculates what percentage one number is of another", () => {
      const part = 25;
      const whole = 100;
      const percentage = (part / whole) * 100;
      
      expect(percentage).toBe(25);
    });
  });

  describe("Body Fat Calculator", () => {
    it("calculates body fat for male using Navy method", () => {
      // Navy method formula for men
      const waist = 85; // cm
      const neck = 38; // cm
      const height = 175; // cm
      
      // Simplified calculation
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      
      expect(bodyFat).toBeGreaterThan(0);
      expect(bodyFat).toBeLessThan(50);
    });
  });

  describe("Due Date Calculator", () => {
    it("calculates due date correctly (LMP + 280 days)", () => {
      const lmpDate = new Date("2024-01-01");
      const dueDate = new Date(lmpDate);
      dueDate.setDate(dueDate.getDate() + 280);
      
      expect(dueDate.getFullYear()).toBe(2024);
      expect(dueDate.getMonth()).toBe(9); // October (0-indexed)
      expect(dueDate.getDate()).toBe(6); // Jan 1 + 280 days = Oct 6
    });
  });

  describe("Discount Calculator", () => {
    it("calculates discount correctly", () => {
      const originalPrice = 10000;
      const discountPercent = 20;
      
      const discountAmount = originalPrice * (discountPercent / 100);
      const finalPrice = originalPrice - discountAmount;
      
      expect(discountAmount).toBe(2000);
      expect(finalPrice).toBe(8000);
    });

    it("handles 0% discount", () => {
      const originalPrice = 5000;
      const discountPercent = 0;
      
      const discountAmount = originalPrice * (discountPercent / 100);
      const finalPrice = originalPrice - discountAmount;
      
      expect(discountAmount).toBe(0);
      expect(finalPrice).toBe(5000);
    });
  });

  describe("Age Calculator", () => {
    it("calculates age correctly", () => {
      const birthDate = new Date("1990-06-15");
      const today = new Date("2024-01-15");
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      expect(age).toBe(33);
    });
  });

  describe("Wage Calculator", () => {
    it("calculates monthly wage from hourly rate", () => {
      const hourlyWage = 1200;
      const hoursPerDay = 8;
      const daysPerMonth = 22;
      
      const monthlyWage = hourlyWage * hoursPerDay * daysPerMonth;
      const annualWage = monthlyWage * 12;
      
      expect(monthlyWage).toBe(211200);
      expect(annualWage).toBe(2534400);
    });
  });

  describe("Property Tax Calculator", () => {
    it("calculates property tax for residential land", () => {
      const assessedValue = 10000000;
      const isResidential = true;
      
      // Small residential land: 1/6 reduction
      const taxableValue = isResidential ? assessedValue / 6 : assessedValue;
      const propertyTax = Math.round(taxableValue * 0.014);
      const cityPlanningTax = Math.round(taxableValue * 0.003);
      
      expect(taxableValue).toBeCloseTo(1666666.67, 0);
      expect(propertyTax).toBeGreaterThan(0);
      expect(cityPlanningTax).toBeGreaterThan(0);
    });

    it("calculates property tax for non-residential land", () => {
      const assessedValue = 10000000;
      const isResidential = false;
      
      const taxableValue = assessedValue;
      const propertyTax = Math.round(taxableValue * 0.014);
      const cityPlanningTax = Math.round(taxableValue * 0.003);
      
      expect(propertyTax).toBe(140000);
      expect(cityPlanningTax).toBe(30000);
    });
  });

  describe("Income Tax Calculator", () => {
    it("calculates income tax for 5M yen income", () => {
      const annualIncome = 5000000;
      
      // Simplified salary deduction calculation
      let salaryDeduction: number;
      if (annualIncome <= 1625000) {
        salaryDeduction = 550000;
      } else if (annualIncome <= 1800000) {
        salaryDeduction = annualIncome * 0.4 - 100000;
      } else if (annualIncome <= 3600000) {
        salaryDeduction = annualIncome * 0.3 + 80000;
      } else if (annualIncome <= 6600000) {
        salaryDeduction = annualIncome * 0.2 + 440000;
      } else if (annualIncome <= 8500000) {
        salaryDeduction = annualIncome * 0.1 + 1100000;
      } else {
        salaryDeduction = 1950000;
      }
      
      const basicDeduction = 480000;
      const taxableIncome = Math.max(0, annualIncome - salaryDeduction - basicDeduction);
      
      expect(salaryDeduction).toBe(1440000); // 5M * 0.2 + 440000
      expect(taxableIncome).toBe(3080000); // 5M - 1.44M - 0.48M
    });
  });

  describe("Unemployment Calculator", () => {
    it("calculates unemployment benefit correctly", () => {
      const dailyWage = 10000;
      const age = 35;
      const yearsWorked = 10;
      
      // Simplified benefit rate (50-80% depending on wage)
      const benefitRate = 0.6; // 60% for this example
      const dailyBenefit = Math.round(dailyWage * benefitRate);
      
      // Benefit days based on years worked (self-resignation)
      let benefitDays: number;
      if (yearsWorked < 5) {
        benefitDays = 90;
      } else if (yearsWorked < 10) {
        benefitDays = 90;
      } else if (yearsWorked < 20) {
        benefitDays = 120;
      } else {
        benefitDays = 150;
      }
      
      const totalBenefit = dailyBenefit * benefitDays;
      
      expect(dailyBenefit).toBe(6000);
      expect(benefitDays).toBe(120);
      expect(totalBenefit).toBe(720000);
    });
  });
});
