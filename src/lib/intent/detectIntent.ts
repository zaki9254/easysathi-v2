export type Intent =
  | "percentage"
  | "unknown";

export function detectIntent(query: string): Intent {
  const normalizedQuery = query.toLowerCase();

  if (
    normalizedQuery.includes("%") ||
    normalizedQuery.includes("percent") ||
    normalizedQuery.includes("percentage")
  ) {
    return "percentage";
  }

  return "unknown";
}