import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age | EasySathi",
  description:
    "Calculate your exact age in years, months and days using EasySathi's free online age calculator.",
  keywords: [
    "age calculator",
    "calculate age",
    "age calculator online",
    "exact age calculator",
    "date of birth calculator",
  ],
};

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
