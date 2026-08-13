"use client";

import {
  Search,
  ArrowRight,
  Calculator,
  FileText,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { detectIntent } from "@/lib/intent/detectIntent";
import { parsePercentageQuery } from "@/lib/intent/parsePercentage";
import { calculatePercentage } from "@/lib/calculators/percentage";

const suggestions = [
  "Calculate EMI for ₹10 lakh",
  "20% of ₹5,000",
  "Convert 5 feet to cm",
  "Calculate my age",
];

const categories = [
  {
    title: "Money",
    description: "EMI, SIP, GST, salary and more",
    icon: Calculator,
  },
  {
    title: "Documents",
    description: "PDF, images, signatures and more",
    icon: FileText,
  },
  {
    title: "Students",
    description: "CGPA, marks, attendance and more",
    icon: GraduationCap,
  },
  {
    title: "Converters",
    description: "Length, weight, temperature and more",
    icon: RefreshCw,
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSearch = (value?: string) => {
    const searchQuery = value ?? query;

    if (!searchQuery.trim()) return;

    const intent = detectIntent(searchQuery);

    if (intent === "percentage") {
      const parsed = parsePercentageQuery(searchQuery);

      if (parsed) {
        const result = calculatePercentage(parsed.percentage, parsed.value);

        setAnswer(
          `${parsed.percentage}% of ₹${parsed.value.toLocaleString(
            "en-IN",
          )} = ₹${result.toLocaleString("en-IN")}`,
        );

        return;
      }
    }

    setAnswer("I understand your request, but I don't have a tool for it yet.");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="text-xl font-semibold tracking-[-0.03em]">
            EasySathi
          </div>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a
              href="#tools"
              className="transition-colors hover:text-foreground"
            >
              Tools
            </a>

            <a
              href="#about"
              className="transition-colors hover:text-foreground"
            >
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-20 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
            Simple answers. Less searching.
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
            What do you want
            <span className="block">help with?</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Calculate, convert, create or find what you need. Just tell
            EasySathi what you're looking for.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Ask EasySathi..."
                className="h-[68px] rounded-2xl border bg-background pl-12 pr-16 text-base shadow-sm transition-shadow placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring"
              />

              <button
                type="button"
                onClick={() => handleSearch()}
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl bg-foreground text-background transition-opacity hover:opacity-80"
                aria-label="Search"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                  className="rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            {answer && (
              <div className="mx-auto mt-8 max-w-2xl rounded-2xl border bg-muted/30 p-6 text-left">
                <p className="text-sm font-medium text-muted-foreground">
                  EasySathi Answer
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {answer}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="tools" className="border-t px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              EXPLORE
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              Popular utilities
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Everything you need in one place. More useful tools are coming.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  type="button"
                  className="group rounded-2xl border bg-background p-6 text-left transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-muted">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="font-semibold tracking-[-0.01em]">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">
            One place for everyday problems
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            You shouldn't have to search through multiple websites just to find
            the right calculator or utility. EasySathi is being built to
            understand what you need and take you directly to the answer.
          </p>
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
