export function calculateSIP(
  monthlyInvestment: number,
  annualRate: number,
  years: number,
): {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
} {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  const totalValue =
    monthlyRate === 0
      ? monthlyInvestment * months
      : monthlyInvestment *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));

  const investedAmount = monthlyInvestment * months;

  const estimatedReturns = totalValue - investedAmount;

  return {
    investedAmount,
    estimatedReturns,
    totalValue,
  };
}