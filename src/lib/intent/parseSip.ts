export interface SipQuery {
  monthlyInvestment: number;
  annualRate: number;
  years: number;
}

export function parseSipQuery(query: string): SipQuery | null {
  const text = query.toLowerCase().trim();

  // Monthly investment
  const investmentMatch = text.match(
    /(?:sip|invest|investment)\s*(?:of|for)?\s*(?:₹|rs\.?|inr)?\s*(\d[\d,]*(?:\.\d+)?)\s*(k|lakh|lakhs|lac|lacs|crore|crores|cr)?/i,
  );

  // Interest / expected return
  const rateMatch = text.match(
    /(\d+(?:\.\d+)?)\s*%/i,
  );

  // Tenure
  const tenureMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(years?|yrs?|yr|months?|mos?)/i,
  );

  if (!investmentMatch || !rateMatch || !tenureMatch) {
    return null;
  }

  let monthlyInvestment = Number(
    investmentMatch[1].replace(/,/g, ""),
  );

  const unit = investmentMatch[2]?.toLowerCase();

  if (unit === "k") {
    monthlyInvestment *= 1_000;
  } else if (
    unit === "lakh" ||
    unit === "lakhs" ||
    unit === "lac" ||
    unit === "lacs"
  ) {
    monthlyInvestment *= 100_000;
  } else if (
    unit === "crore" ||
    unit === "crores" ||
    unit === "cr"
  ) {
    monthlyInvestment *= 10_000_000;
  }

  const annualRate = Number(rateMatch[1]);

  let years = Number(tenureMatch[1]);

  const tenureUnit = tenureMatch[2].toLowerCase();

  if (
    tenureUnit === "month" ||
    tenureUnit === "months" ||
    tenureUnit === "mos"
  ) {
    years = years / 12;
  }

  if (
    !Number.isFinite(monthlyInvestment) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    monthlyInvestment <= 0 ||
    annualRate < 0 ||
    years <= 0
  ) {
    return null;
  }

  return {
    monthlyInvestment,
    annualRate,
    years,
  };
}