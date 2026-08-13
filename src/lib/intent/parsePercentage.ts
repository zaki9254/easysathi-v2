export function parsePercentageQuery(query: string) {
  const match = query.match(
    /(\d+(?:\.\d+)?)\s*%\s*(?:of)?\s*(?:₹|rs\.?|inr)?\s*([\d,]+(?:\.\d+)?)?/i
  );

  if (!match) {
    return null;
  }

  const percentage = Number(match[1]);

  const value = Number(match[2]?.replace(/,/g, ""));

  if (Number.isNaN(percentage) || Number.isNaN(value)) {
    return null;
  }

  return {
    percentage,
    value,
  };
}