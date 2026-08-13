export function calculateEMI(
  principal: number,
  annualRate: number,
  years: number
) {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return {
      emi: principal / numberOfPayments,
      totalPayment: principal,
      totalInterest: 0,
    };
  }

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = emi * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalPayment,
    totalInterest,
  };
}