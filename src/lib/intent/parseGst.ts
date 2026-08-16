export interface GstQuery {
  amount: number;
  gstRate: number;
}

export function parseGstQuery(query: string): GstQuery | null {
  const text = query.toLowerCase().trim();

  // ========================================
  // Amount
  // ========================================

  const amountMatch = text.match(
    /(?:gst|goods and services tax)\s*(?:on|of)?\s*(?:₹|rs\.?|inr)?\s*([\d,]+(?:\.\d+)?)/i,
  );

  if (!amountMatch) {
    return null;
  }

  const amount = Number(amountMatch[1].replace(/,/g, ""));

  // ========================================
  // GST Rate
  // ========================================

  const rateMatch = text.match(
    /(?:at|@|gst)\s*(\d+(?:\.\d+)?)\s*%/i,
  );

  if (!rateMatch) {
    return null;
  }

  const gstRate = Number(rateMatch[1]);

  // ========================================
  // Validation
  // ========================================

  if (
    !Number.isFinite(amount) ||
    !Number.isFinite(gstRate) ||
    amount <= 0 ||
    gstRate < 0
  ) {
    return null;
  }

  return {
    amount,
    gstRate,
  };
}