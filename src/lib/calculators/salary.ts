export interface SalaryResult {
  annualSalary: number;
  monthlySalary: number;
  weeklySalary: number;
  dailySalary: number;
  deductionAmount: number;
  monthlyTakeHome: number;
  annualTakeHome: number;
}

export function calculateSalary(
  monthlySalary: number,
  deductionPercentage: number = 0,
): SalaryResult {
  const annualSalary = monthlySalary * 12;

  const deductionAmount =
    (monthlySalary * deductionPercentage) / 100;

  const monthlyTakeHome =
    monthlySalary - deductionAmount;

  const annualTakeHome =
    monthlyTakeHome * 12;

  const weeklySalary =
    annualSalary / 52;

  const dailySalary =
    annualSalary / 260;

  return {
    annualSalary,
    monthlySalary,
    weeklySalary,
    dailySalary,
    deductionAmount,
    monthlyTakeHome,
    annualTakeHome,
  };
}