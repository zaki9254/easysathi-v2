"use client";

import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AnswerCard } from "@/components/answers/AnswerCard";
import { parsePercentageQuery } from "@/lib/intent/parsePercentage";
import { calculatePercentage } from "@/lib/calculators/percentage";

interface Answer {
  title: string;
  answer: string;
  description?: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export default function PercentageCalculatorPage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);

  const handleCalculate = (value?: string) => {
    const searchQuery = (value ?? query).trim();

    if (!searchQuery) {
      return;
    }

    const parsed = parsePercentageQuery(searchQuery);

    if (!parsed) {
      setAnswer({
        title: "Percentage Calculation",
        answer: "I couldn't understand the numbers.",
        description: "Try something like: 20% of ₹5,000",
      });

      return;
    }

    const result = calculatePercentage(parsed.percentage, parsed.value);

    setAnswer({
      title: "Percentage Calculation",

      answer: `₹${result.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,

      description: `${parsed.percentage}% of ₹${parsed.value.toLocaleString(
        "en-IN",
      )} is ₹${result.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}.`,

      details: [
        {
          label: "Percentage",
          value: `${parsed.percentage}%`,
        },
        {
          label: "Original value",
          value: `₹${parsed.value.toLocaleString("en-IN")}`,
        },
        {
          label: "Result",
          value: `₹${result.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
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
            Percentage Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Quickly calculate any percentage of a number. Just enter your
            calculation below.
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
                placeholder="Try: 20% of ₹5,000"
                className="h-[68px] rounded-2xl border bg-background pl-12 pr-16 text-base shadow-sm transition-shadow placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring"
              />

              <button
                type="button"
                onClick={() => handleCalculate()}
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl bg-foreground text-background transition-opacity hover:opacity-80"
                aria-label="Calculate percentage"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>

            {/* Examples */}

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["20% of ₹5,000", "15% of ₹10,000", "10% of ₹50,000"].map(
                (example) => (
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
                ),
              )}
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
            How to calculate a percentage
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            To calculate a percentage of a number, multiply the percentage by
            the number and divide by 100.
          </p>

          <div className="mt-6 rounded-2xl border bg-muted/30 p-6 text-center">
            <p className="text-lg font-medium">Percentage × Value ÷ 100</p>
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
