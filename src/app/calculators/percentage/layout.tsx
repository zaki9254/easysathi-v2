import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Online | EasySathi",
  description:
    "Calculate percentages quickly and easily with EasySathi's free online percentage calculator.",
  keywords: [
    "percentage calculator",
    "percent calculator",
    "calculate percentage",
    "percentage calculator online",
  ],
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
