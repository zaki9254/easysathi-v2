export type Intent =
  | "emi"
  | "percentage"
  | "unknown";

export function detectIntent(query: string): Intent {
  const normalizedQuery = query.toLowerCase();

  if (
    normalizedQuery.includes("emi") ||
    normalizedQuery.includes("loan payment") ||
    normalizedQuery.includes("monthly payment")
  ) {
    return "emi";
  }

  if (
    normalizedQuery.includes("%") ||
    normalizedQuery.includes("percent") ||
    normalizedQuery.includes("percentage")
  ) {
    return "percentage";
  }

  return "unknown";
}