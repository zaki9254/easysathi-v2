export type Intent = "emi" | "percentage" | "unknown";

export function detectIntent(query: string): Intent {
  const text = query.toLowerCase().trim();

  // ========================================
  // EMI / LOAN
  // ========================================

  const hasLoanKeyword =
    /\b(emi|loan|borrow|borrowing|home loan|car loan|personal loan)\b/i.test(
      text,
    );

  const hasRate = /\d+(?:\.\d+)?\s*%/i.test(text);

  const hasTenure =
    /\d+(?:\.\d+)?\s*(?:years?|yrs?|yr|months?|mos?)\b/i.test(text);

  // Examples:
  // EMI for ₹10 lakh at 9% for 5 years
  // 10 lakh loan at 9% for 5 years
  // 10 lakh at 9% for 60 months

  if (hasLoanKeyword && hasRate && hasTenure) {
    return "emi";
  }

  // Also support:
  // 10 lakh at 9% for 5 years

  if (hasRate && hasTenure) {
    return "emi";
  }

  // ========================================
  // PERCENTAGE
  // ========================================

  // Supports:
  // 20% of 5000
  // 15% of 2 crore
  // 10 percent of 5 lakh
  // 25 percentage of 10 lakh

  const percentagePattern =
    /\d+(?:\.\d+)?\s*(?:%|percent|percentage)(?:\s|$)/i;

  if (percentagePattern.test(text)) {
    return "percentage";
  }

  return "unknown";
}