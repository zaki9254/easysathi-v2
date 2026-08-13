function parseAmount(value: string, unit?: string): number {
  const number = Number(value.replace(/,/g, ""));

  if (!Number.isFinite(number)) {
    return NaN;
  }

  if (!unit) {
    return number;
  }

  const normalizedUnit = unit.toLowerCase();

  switch (normalizedUnit) {
    case "k":
      return number * 1_000;

    case "lakh":
    case "lakhs":
    case "lac":
    case "lacs":
      return number * 100_000;

    case "crore":
    case "crores":
    case "cr":
      return number * 10_000_000;

    default:
      return number;
  }
}

export interface PercentageQuery {
  percentage: number;
  value: number;
}

export function parsePercentageQuery(
  query: string,
): PercentageQuery | null {
  const text = query.toLowerCase().trim();

  // ========================================
  // Percentage
  // ========================================

  const percentageMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(?:%|percent|percentage)/i,
  );

  if (!percentageMatch) {
    return null;
  }

  const percentage = Number(percentageMatch[1]);

  // ========================================
  // Value after "of"
  // ========================================

  const valueMatch = text.match(
    /\bof\s*(?:₹|rs\.?|inr)?\s*(\d[\d,]*(?:\.\d+)?)\s*(k|lakh|lakhs|lac|lacs|crore|crores|cr)?/i,
  );

  if (!valueMatch) {
    return null;
  }

  const value = parseAmount(
    valueMatch[1],
    valueMatch[2],
  );

  if (
    !Number.isFinite(percentage) ||
    !Number.isFinite(value) ||
    percentage < 0 ||
    value < 0
  ) {
    return null;
  }

  return {
    percentage,
    value,
  };
}