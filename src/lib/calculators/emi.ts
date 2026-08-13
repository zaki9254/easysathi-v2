export function calculateEMI(
  principal: number,
  annualRate: number,
  years: number,
): number {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    principal <= 0 ||
    annualRate < 0 ||
    years <= 0
  ) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;

  // Special case: 0% interest
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return emi;
}