"use client";

import { useState } from "react";
import { calculateAge } from "@/lib/calculators/age";

export default function AgeCalculatorPage() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!dateOfBirth) {
      return;
    }

    const birthDate = new Date(`${dateOfBirth}T00:00:00`);

    if (Number.isNaN(birthDate.getTime())) {
      return;
    }

    const age = calculateAge(birthDate);

    setResult(age);
  };

  const handleReset = () => {
    setDateOfBirth("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="text-xl font-semibold tracking-[-0.03em]">
            EasySathi
          </a>

          <a
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </a>
        </div>
      </header>

      {/* Calculator */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              CALCULATOR
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
              Age Calculator
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
              Calculate your exact age in years, months and days from your date
              of birth.
            </p>
          </div>

          {/* Card */}
          <div className="mt-10 rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
            <label htmlFor="date-of-birth" className="text-sm font-medium">
              Date of birth
            </label>

            <input
              id="date-of-birth"
              type="date"
              value={dateOfBirth}
              onChange={(event) => {
                setDateOfBirth(event.target.value);
                setResult(null);
              }}
              className="mt-2 h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleCalculate}
                className="h-12 flex-1 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Calculate Age
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="h-12 rounded-xl border px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Reset
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8 rounded-2xl border bg-muted/30 p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Your Age
                </p>

                <p className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
                  {result.years} years
                </p>

                <p className="mt-3 text-muted-foreground">
                  You are {result.years} years, {result.months} months and{" "}
                  {result.days} days old.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border bg-background p-4 text-center">
                    <p className="text-2xl font-semibold">{result.years}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Years</p>
                  </div>

                  <div className="rounded-xl border bg-background p-4 text-center">
                    <p className="text-2xl font-semibold">{result.months}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Months</p>
                  </div>

                  <div className="rounded-xl border bg-background p-4 text-center">
                    <p className="text-2xl font-semibold">{result.days}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Days</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              Age Calculator
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Use the EasySathi Age Calculator to find your exact age based on
              your date of birth. The result shows your age in years, months and
              days.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
