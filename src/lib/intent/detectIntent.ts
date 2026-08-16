export type Intent =
  | "emi"
  | "percentage"
  | "converter"
  | "age"
  | "gst"
  | "sip"
  | "bmi"
  | "salary"
  | "unknown";

export function detectIntent(query: string): Intent {
  const text = query.toLowerCase().trim();

  // ========================================
  // EMI
  // ========================================

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

  // ========================================
  // GST
  // ========================================

  const gstPattern =
    /\b(gst|goods and services tax)\b/i;

  if (gstPattern.test(text)) {
    return "gst";
  }

  // ========================================
  // SIP
  // ========================================

  const sipPattern =
    /\b(sip|systematic investment plan|mutual fund)\b/i;

  if (sipPattern.test(text)) {
    return "sip";
  }

 // ========================================
// Salary
// ========================================

const salaryPattern =
  /\b(salary|income|monthly salary|annual salary|yearly salary|ctc|take home|take-home|in hand|in-hand|gross salary|net salary|income tax|salary breakup|salary breakdown)\b/i;

if (salaryPattern.test(text)) {
  return "salary";
}

  // ========================================
  // Percentage
  // ========================================

  const percentagePattern =
    /\d+(?:\.\d+)?\s*(?:%|percent|percentage)(?:\s|$)/i;

  if (percentagePattern.test(text)) {
    return "percentage";
  }

  // ========================================
  // Converter
  // ========================================

  const converterPattern =
    /\b(convert|conversion|to)\b.*\b(mm|cm|m|km|inch|inches|ft|foot|feet|yard|mile|mg|g|kg|gram|grams|pound|pounds|lb|lbs|oz|ounce|celsius|fahrenheit|kelvin|°c|°f|°k)\b/i;

  if (converterPattern.test(text)) {
    return "converter";
  }

  // ========================================
  // Age
  // ========================================

  const agePattern =
    /\b(age|my age|calculate my age|how old am i|born|date of birth|dob)\b/i;

  if (agePattern.test(text)) {
    return "age";
  }

  // ========================================
  // BMI
  // ========================================

  const bmiPattern =
    /\b(bmi|body mass index|calculate bmi|my bmi)\b/i;

  if (bmiPattern.test(text)) {
    return "bmi";
  }

  // ========================================
  // Unknown
  // ========================================

  return "unknown";
}