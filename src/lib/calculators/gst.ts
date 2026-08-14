export function calculateGST(amount: number, gstRate: number) {
  const gstAmount = (amount * gstRate) / 100;
  const totalAmount = amount + gstAmount;

  return {
    gstAmount,
    totalAmount,
  };
}