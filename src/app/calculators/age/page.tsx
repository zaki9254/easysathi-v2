"use client";

import { useState } from "react";
import { AnswerCard } from "@/components/answers/AnswerCard";
import { calculateAge } from "@/lib/calculators/age";

interface Answer {
  title: string;
  answer: string;
  description?: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export default function AgeCalculatorPage() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);

  const handleCalculate = () => {
    if (!dateOfBirth) {
      return;
    }

    const birthDate = new Date(`${dateOfBirth}T00:00:00`);

    if (Number.isNaN(birthDate.getTime())) {
      return;
    }

    const result = calculateAge(birthDate);

    setAnswer({
      title: "Age Calculation",

      answer: `${result.years} years`,

      description: `You are ${result.years} years, ${result.months} months and ${result.days} days old.`,

      details: [
        {
          label: "Date of birth",
          value: new Date(`${dateOfBirth}T00:00:00`).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            },
          ),
        },
        {
          label: "Years",
          value: `${result.years}`,
        },
        {
          label: "Months",
          value: `${result.months}`,
        },
        {
          label: "Days",
          value: `${result.days}`,
        },
      ],
    });
  };

  const clearAnswer = () => {
    setAnswer(null);
    setDateOfBirth("");
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
            Age Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Calculate your exact age in years, months, and days from your date
            of birth.
          </p>

          {/* Calculator Input */}

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-2xl border bg-background p-6 text-left shadow-sm sm:p-8">
              <label htmlFor="date-of-birth" className="text-sm font-medium">
                Date of birth
              </label>

              <input
                id="date-of-birth"
                type="date"
                value={dateOfBirth}
                max={new Date().toISOString().split("T")[0]}
                onChange={(event) => {
                  setDateOfBirth(event.target.value);
                  setAnswer(null);
                }}
                className="mt-2 h-[52px] w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              />

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-4 h-[52px] w-full rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Calculate Age
              </button>
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
            How age is calculated
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Your age is calculated by comparing your date of birth with today's
            date. EasySathi calculates the difference in complete years, months,
            and days.
          </p>

          <div className="mt-6 rounded-2xl border bg-muted/30 p-6 text-center">
            <p className="text-lg font-medium">
              Date of birth → Years + Months + Days
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
