export type Intent = "emi" | "percentage" | "converter" | "unknown";


export function detectIntent(query: string): Intent {
  const text = query.toLowerCase().trim();

  // EMI
  const hasLoanKeyword =
    /\b(emi|loan|borrow|borrowing|home loan|car loan|personal loan)\b/i.test(
      text,
    );

  const hasRate = /\d+(?:\.\d+)?\s*%/i.test(text);

  const hasTenure =
    /\d+(?:\.\d+)?\s*(?:years?|yrs?|yr|months?|mos?)\b/i.test(text);

  if (hasLoanKeyword && hasRate && hasTenure) {
    return "emi";
  }

  if (hasRate && hasTenure) {
    return "emi";
  }

  // Percentage
  const percentagePattern =
    /\d+(?:\.\d+)?\s*(?:%|percent|percentage)(?:\s|$)/i;

  if (percentagePattern.test(text)) {
    return "percentage";
  }

  // Converter
  const converterPattern =
    /\b(convert|conversion|to)\b.*\b(mm|cm|m|km|inch|inches|ft|foot|feet|yard|mile|mg|g|kg|gram|grams|pound|pounds|lb|lbs|oz|ounce|celsius|fahrenheit|kelvin|°c|°f|°k)\b/i;

  if (converterPattern.test(text)) {
    return "converter";
  }

  return "unknown";
}