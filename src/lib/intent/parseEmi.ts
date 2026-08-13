function parseAmount(value: string, unit?: string): number {
  const number = Number(value.replace(/,/g, ""));

  if (!unit) {
    return number;
  }

  const normalizedUnit = unit.toLowerCase();

  if (["lakh", "lakhs", "lac", "lacs"].includes(normalizedUnit)) {
    return number * 100000;
  }

  if (["crore", "crores", "cr"].includes(normalizedUnit)) {
    return number * 10000000;
  }

  if (normalizedUnit === "k") {
    return number * 1000;
  }

  return number;
}

export function parseEmiQuery(query: string) {
  const amountMatch = query.match(
    /(?:₹|rs\.?|inr)?\s*(\d[\d,]*(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|crore|crores|cr|k)?/i,
  );

  const rateMatch = query.match(
    /(\d+(?:\.\d+)?)\s*%\s*(?:interest|rate)?/i,
  );

  const yearsMatch = query.match(
    /(\d+(?:\.\d+)?)\s*(years?|yrs?|yr)\b/i,
  );

  const monthsMatch = query.match(
    /(\d+(?:\.\d+)?)\s*(months?|mos?)\b/i,
  );

  if (!amountMatch || !rateMatch) {
    return null;
  }

  const principal = parseAmount(amountMatch[1], amountMatch[2]);
  const annualRate = Number(rateMatch[1]);

  let years: number;

  if (yearsMatch) {
    years = Number(yearsMatch[1]);
  } else if (monthsMatch) {
    years = Number(monthsMatch[1]) / 12;
  } else {
    return null;
  }

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    principal <= 0 ||
    annualRate < 0 ||
    years <= 0
  ) {
    return null;
  }

  return {
    principal,
    annualRate,
    years,
  };
}