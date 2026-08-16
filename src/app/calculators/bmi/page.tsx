"use client";

import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AnswerCard } from "@/components/answers/AnswerCard";
import { calculateBMI } from "@/lib/calculators/bmi";

interface Answer {
  title: string;
  answer: string;
  description?: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export default function BmiCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);

  const handleCalculate = () => {
    const weightKg = Number(weight);
    const heightCm = Number(height);

    if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
      setAnswer({
        title: "BMI Calculation",
        answer: "Please enter your weight and height.",
        description: "Example: Weight 70 kg and height 175 cm.",
      });

      return;
    }

    const result = calculateBMI(weightKg, heightCm);

    if (!result) {
      setAnswer({
        title: "BMI Calculation",
        answer: "I couldn't calculate your BMI.",
      });

      return;
    }

    setAnswer({
      title: "BMI Calculation",

      answer: `${result.bmi}`,

      description: `Your BMI is ${result.bmi}.`,

      details: [
        {
          label: "Weight",
          value: `${weightKg} kg`,
        },
        {
          label: "Height",
          value: `${heightCm.toFixed(2)} cm`,
        },
        {
          label: "BMI",
          value: `${result.bmi}`,
        },
        {
          label: "Category",
          value: result.category,
        },
      ],
    });
  };

  const clearAnswer = () => {
    setAnswer(null);
    setWeight("");
    setHeight("");
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
            BMI Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Calculate your Body Mass Index based on your weight and height.
          </p>

          {/* Inputs */}

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="text-left">
                <label className="mb-2 block text-sm font-medium">Weight</label>

                <div className="relative">
                  <Input
                    type="number"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    placeholder="70"
                    className="h-[60px] rounded-2xl border bg-background pr-16 text-base shadow-sm"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    kg
                  </span>
                </div>
              </div>

              <div className="text-left">
                <label className="mb-2 block text-sm font-medium">Height</label>

                <div className="relative">
                  <Input
                    type="number"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    placeholder="175"
                    className="h-[60px] rounded-2xl border bg-background pr-16 text-base shadow-sm"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    cm
                  </span>
                </div>
              </div>
            </div>

            {/* Calculate button */}

            <button
              type="button"
              onClick={handleCalculate}
              className="mt-5 flex h-[60px] w-full items-center justify-center gap-2 rounded-2xl bg-foreground text-background transition-opacity hover:opacity-80"
            >
              Calculate BMI
              <ArrowRight className="size-5" />
            </button>

            {/* Example */}

            <button
              type="button"
              onClick={() => {
                setWeight("70");
                setHeight("175");
              }}
              className="mt-4 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Try: 70 kg, 175 cm
            </button>

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
            How BMI is calculated
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            BMI is calculated using your weight and height. It gives a general
            indication of whether your weight falls within a healthy range for
            your height.
          </p>

          <div className="mt-6 rounded-2xl border bg-muted/30 p-6 text-center">
            <p className="text-lg font-medium">
              BMI = Weight (kg) ÷ Height² (m)
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
