"use client";

import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AnswerCard } from "@/components/answers/AnswerCard";
import { parseEmiQuery } from "@/lib/intent/parseEmi";
import { calculateEMI } from "@/lib/calculators/emi";

interface Answer {
  title: string;
  answer: string;
  description?: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export default function EmiCalculatorPage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);

  const handleCalculate = (value?: string) => {
    const searchQuery = (value ?? query).trim();

    if (!searchQuery) {
      return;
    }

    const parsed = parseEmiQuery(searchQuery);

    if (!parsed) {
      setAnswer({
        title: "EMI Calculation",
        answer: "I couldn't understand the loan details.",
        description: "Try something like: EMI for ₹10 lakh at 9% for 5 years.",
      });

      return;
    }

    const monthlyEMI = calculateEMI(
      parsed.principal,
      parsed.annualRate,
      parsed.years,
    );

    const totalPayment = monthlyEMI * parsed.years * 12;
    const totalInterest = totalPayment - parsed.principal;

    setAnswer({
      title: "EMI Calculation",

      answer: `₹${monthlyEMI.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })}`,

      description: `Your estimated monthly EMI for a ₹${parsed.principal.toLocaleString(
        "en-IN",
      )} loan at ${parsed.annualRate}% for ${parsed.years} years.`,

      details: [
        {
          label: "Loan amount",
          value: `₹${parsed.principal.toLocaleString("en-IN")}`,
        },
        {
          label: "Interest rate",
          value: `${parsed.annualRate}%`,
        },
        {
          label: "Loan tenure",
          value: `${parsed.years} years`,
        },
        {
          label: "Total interest",
          value: `₹${totalInterest.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}`,
        },
        {
          label: "Total payment",
          value: `₹${totalPayment.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}`,
        },
      ],
    });
  };

  const clearAnswer = () => {
    setAnswer(null);
    setQuery("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}

      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="text-xl font-semibold tracking-[-0.03em]">
            EasySathi
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a
              href="/#tools"
              className="transition-colors hover:text-foreground"
            >
              Tools
            </a>

            <a
              href="/#about"
              className="transition-colors hover:text-foreground"
            >
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Calculator */}

      <section className="px-6 pb-20 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
            Free online calculator
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            EMI Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Calculate your monthly loan EMI, total interest, and total repayment
            amount.
          </p>

          {/* Search */}

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleCalculate();
                  }
                }}
                placeholder="Try: EMI for ₹10 lakh at 9% for 5 years"
                className="h-[68px] rounded-2xl border bg-background pl-12 pr-16 text-base shadow-sm transition-shadow placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring"
              />

              <button
                type="button"
                onClick={() => handleCalculate()}
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl bg-foreground text-background transition-opacity hover:opacity-80"
                aria-label="Calculate EMI"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>

            {/* Examples */}

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[
                "EMI for ₹10 lakh at 9% for 5 years",
                "EMI for ₹5 lakh at 10% for 3 years",
                "EMI for ₹10 lakh at 8.5% for 60 months",
              ].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => {
                    setQuery(example);
                    handleCalculate(example);
                  }}
                  className="rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {example}
                </button>
              ))}
            </div>

            {/* Answer */}

            {answer && (
              <AnswerCard
                title={answer.title}
                answer={answer.answer}
                description={answer.description}
                details={answer.details}
                onTryAnother={clearAnswer}
              />
            )}
          </div>
        </div>
      </section>

      {/* Information */}

      <section className="border-t px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            How EMI is calculated
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            EMI depends on the loan amount, interest rate, and repayment tenure.
            EasySathi calculates the estimated monthly payment using these
            values.
          </p>

          <div className="mt-6 rounded-2xl border bg-muted/30 p-6 text-center">
            <p className="text-lg font-medium">
              Principal + Interest → Monthly EMI
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 EasySathi</p>

          <p>Simple answers. Less searching.</p>
        </div>
      </footer>
    </main>
  );
}
