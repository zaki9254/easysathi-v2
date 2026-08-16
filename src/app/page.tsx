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

import { AnswerCard } from "@/components/answers/AnswerCard";
import { detectIntent } from "@/lib/intent/detectIntent";
import { parsePercentageQuery } from "@/lib/intent/parsePercentage";
import { calculatePercentage } from "@/lib/calculators/percentage";
import { parseEmiQuery } from "@/lib/intent/parseEmi";
import { calculateEMI } from "@/lib/calculators/emi";
import { parseConverterQuery } from "@/lib/intent/parseConverter";
import { convertUnit } from "@/lib/calculators/converter";
import { calculateAge } from "@/lib/calculators/age";
import { calculateGST } from "@/lib/calculators/gst";
import { parseSipQuery } from "@/lib/intent/parseSip";
import { calculateSIP } from "@/lib/calculators/sip";
import { calculateBMI } from "@/lib/calculators/bmi";
import { parseBMIQuery } from "@/lib/intent/parseBmi";
import { parseSalaryQuery } from "@/lib/intent/parseSalary";
import { calculateSalary } from "@/lib/calculators/salary";

const suggestions = [
  "Calculate EMI for ₹10 lakh",
  "20% of ₹5,000",
  "Convert 5 feet to cm",
  "Calculate my age from 15/08/2000",
  "GST on ₹10,000 at 18%",
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

interface Answer {
  title: string;
  answer: string;
  description?: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);

  const handleSearch = (value?: string) => {
    const searchQuery = (value ?? query).trim();

    if (!searchQuery) {
      return;
    }

    const intent = detectIntent(searchQuery);

    // ==========================================
    // EMI
    // ==========================================

    if (intent === "emi") {
      const parsed = parseEmiQuery(searchQuery);

      if (!parsed) {
        setAnswer({
          title: "I need a little more information",
          answer:
            "Please provide the loan amount, interest rate, and loan tenure.",
          description: "Example: EMI for ₹10 lakh at 9% for 5 years.",
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

      return;
    }

    // ==========================================
    // PERCENTAGE
    // ==========================================

    if (intent === "percentage") {
      const parsed = parsePercentageQuery(searchQuery);

      if (!parsed) {
        setAnswer({
          title: "Percentage calculation",
          answer: "I couldn't understand the numbers.",
          description: "Try something like: 20% of ₹5,000",
        });

        return;
      }

      const result = calculatePercentage(parsed.percentage, parsed.value);

      setAnswer({
        title: `${parsed.percentage}% of ₹${parsed.value.toLocaleString(
          "en-IN",
        )}`,

        answer: `₹${result.toLocaleString("en-IN")}`,

        description: `This is ${parsed.percentage}% of ₹${parsed.value.toLocaleString(
          "en-IN",
        )}.`,

        details: [
          {
            label: "Percentage",
            value: `${parsed.percentage}%`,
          },
          {
            label: "Original value",
            value: `₹${parsed.value.toLocaleString("en-IN")}`,
          },
        ],
      });

      return;
    }

    // ==========================================
    // CONVERTER
    // ==========================================

    if (intent === "converter") {
      const parsed = parseConverterQuery(searchQuery);

      if (!parsed) {
        setAnswer({
          title: "Unit conversion",
          answer: "I couldn't understand the conversion.",
          description: "Try something like: 5 feet to cm",
        });

        return;
      }

      const lengthUnits = [
        "mm",
        "millimeter",
        "millimeters",
        "cm",
        "centimeter",
        "centimeters",
        "m",
        "meter",
        "meters",
        "km",
        "kilometer",
        "kilometers",
        "inch",
        "inches",
        "ft",
        "foot",
        "feet",
        "yard",
        "yards",
        "mile",
        "miles",
      ];

      const weightUnits = [
        "mg",
        "milligram",
        "milligrams",
        "g",
        "gram",
        "grams",
        "kg",
        "kilogram",
        "kilograms",
        "tonne",
        "ton",
        "lb",
        "lbs",
        "pound",
        "pounds",
        "oz",
        "ounce",
        "ounces",
      ];

      const temperatureUnits = [
        "c",
        "celsius",
        "°c",
        "f",
        "fahrenheit",
        "°f",
        "k",
        "kelvin",
        "°k",
      ];

      const fromUnit = parsed.from.toLowerCase();
      const toUnit = parsed.to.toLowerCase();

      let category: "length" | "weight" | "temperature";

      if (lengthUnits.includes(fromUnit) && lengthUnits.includes(toUnit)) {
        category = "length";
      } else if (
        weightUnits.includes(fromUnit) &&
        weightUnits.includes(toUnit)
      ) {
        category = "weight";
      } else if (
        temperatureUnits.includes(fromUnit) &&
        temperatureUnits.includes(toUnit)
      ) {
        category = "temperature";
      } else {
        setAnswer({
          title: "Unit conversion",
          answer: "These units cannot be converted together.",
        });

        return;
      }

      const result = convertUnit(
        parsed.value,
        parsed.from,
        parsed.to,
        category,
      );

      if (result === null) {
        setAnswer({
          title: "Unit conversion",
          answer: "I couldn't calculate this conversion.",
        });

        return;
      }

      setAnswer({
        title: `${parsed.value} ${parsed.from} to ${parsed.to}`,
        answer: `${result.toLocaleString("en-IN", {
          maximumFractionDigits: 6,
        })} ${parsed.to}`,
        description: `${parsed.value} ${parsed.from} is equal to ${result.toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 6,
          },
        )} ${parsed.to}.`,
        details: [
          {
            label: "From",
            value: `${parsed.value} ${parsed.from}`,
          },
          {
            label: "To",
            value: `${result.toLocaleString("en-IN", {
              maximumFractionDigits: 6,
            })} ${parsed.to}`,
          },
        ],
      });

      return;
    }

    // ==========================================
    // GST
    // ==========================================

    if (intent === "gst") {
      const gstMatch = searchQuery.match(
        /(?:gst|goods and services tax)\s*(?:on|of)?\s*₹?\s*([\d,]+(?:\.\d+)?)\s*(?:at|@)?\s*(\d+(?:\.\d+)?)\s*%?/i,
      );

      if (!gstMatch) {
        setAnswer({
          title: "GST Calculator",
          answer: "Please provide the amount and GST rate.",
          description: "Example: GST on ₹10,000 at 18%",
        });

        return;
      }

      const amount = Number(gstMatch[1].replace(/,/g, ""));
      const gstRate = Number(gstMatch[2]);

      const result = calculateGST(amount, gstRate);

      setAnswer({
        title: "GST Calculation",
        answer: `₹${result.gstAmount.toLocaleString("en-IN")}`,
        description: `${gstRate}% GST on ₹${amount.toLocaleString("en-IN")}.`,
        details: [
          {
            label: "Original amount",
            value: `₹${amount.toLocaleString("en-IN")}`,
          },
          {
            label: "GST rate",
            value: `${gstRate}%`,
          },
          {
            label: "GST amount",
            value: `₹${result.gstAmount.toLocaleString("en-IN")}`,
          },
          {
            label: "Total amount",
            value: `₹${result.totalAmount.toLocaleString("en-IN")}`,
          },
        ],
      });

      return;
    }

    // ==========================================
    // AGE
    // ==========================================

    if (intent === "age") {
      const dateMatch = searchQuery.match(
        /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
      );

      if (!dateMatch) {
        setAnswer({
          title: "Age Calculator",
          answer: "Please provide your date of birth.",
          description: "Example: Calculate my age from 15/08/2000",
        });

        return;
      }

      const [, day, month, year] = dateMatch;

      const dateOfBirth = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0",
      )}`;

      const age = calculateAge(new Date(dateOfBirth));

      setAnswer({
        title: "Your Age",
        answer: `${age.years} years`,
        description: `You are ${age.years} years, ${age.months} months and ${age.days} days old.`,
        details: [
          {
            label: "Date of birth",
            value: `${day}/${month}/${year}`,
          },
          {
            label: "Age",
            value: `${age.years} years, ${age.months} months, ${age.days} days`,
          },
        ],
      });

      return;
    }

    // ==========================================
    // SIP
    // ==========================================

    if (intent === "sip") {
      const parsed = parseSipQuery(searchQuery);

      if (!parsed) {
        setAnswer({
          title: "SIP Calculation",
          answer: "I couldn't understand the numbers.",
          description: "Try something like: SIP of ₹5,000 at 12% for 10 years.",
        });

        return;
      }

      const result = calculateSIP(
        parsed.monthlyInvestment,
        parsed.annualRate,
        parsed.years,
      );

      setAnswer({
        title: "SIP Calculation",

        answer: `₹${result.totalValue.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })}`,

        description: `Estimated value of investing ₹${parsed.monthlyInvestment.toLocaleString(
          "en-IN",
        )} per month at ${parsed.annualRate}% for ${parsed.years} years.`,

        details: [
          {
            label: "Monthly investment",
            value: `₹${parsed.monthlyInvestment.toLocaleString("en-IN")}`,
          },
          {
            label: "Expected return",
            value: `${parsed.annualRate}%`,
          },
          {
            label: "Investment period",
            value: `${parsed.years} years`,
          },
          {
            label: "Invested amount",
            value: `₹${result.investedAmount.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}`,
          },
          {
            label: "Estimated returns",
            value: `₹${result.estimatedReturns.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}`,
          },
        ],
      });

      return;
    }

    // ==========================================
    // SALARY
    // ==========================================

    if (intent === "salary") {
      const parsed = parseSalaryQuery(searchQuery);

      if (!parsed) {
        setAnswer({
          title: "Salary Calculator",
          answer: "I couldn't understand the salary.",
          description: "Try something like: ₹50,000 salary with 10% deduction.",
        });

        return;
      }

      const result = calculateSalary(
        parsed.monthlySalary,
        parsed.deductionPercentage,
      );

      setAnswer({
        title: "Salary Calculation",

        answer: `₹${result.monthlyTakeHome.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })}`,

        description: `Estimated monthly take-home salary from ₹${result.monthlySalary.toLocaleString(
          "en-IN",
        )} with ${parsed.deductionPercentage}% deductions.`,

        details: [
          {
            label: "Monthly salary",
            value: `₹${result.monthlySalary.toLocaleString("en-IN")}`,
          },
          {
            label: "Annual salary",
            value: `₹${result.annualSalary.toLocaleString("en-IN")}`,
          },
          {
            label: "Deduction",
            value: `${parsed.deductionPercentage}%`,
          },
          {
            label: "Monthly deduction",
            value: `₹${result.deductionAmount.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}`,
          },
          {
            label: "Monthly take-home",
            value: `₹${result.monthlyTakeHome.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}`,
          },
          {
            label: "Annual take-home",
            value: `₹${result.annualTakeHome.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}`,
          },
        ],
      });

      return;
    }

    // ==========================================
    // BMI
    // ==========================================

    if (intent === "bmi") {
      const parsed = parseBMIQuery(searchQuery);

      if (!parsed) {
        setAnswer({
          title: "BMI Calculator",
          answer: "I couldn't understand the height and weight.",
          description:
            "Try something like: Calculate BMI for 70 kg and 175 cm.",
        });

        return;
      }

      const result = calculateBMI(parsed.weightKg, parsed.heightCm);

      if (!result) {
        setAnswer({
          title: "BMI Calculator",
          answer: "I couldn't calculate the BMI.",
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
            value: `${parsed.weightKg} kg`,
          },
          {
            label: "Height",
            value: `${parsed.heightCm.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })} cm`,
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

      return;
    }

    // ==========================================
    // UNKNOWN
    // ==========================================

    setAnswer({
      title: searchQuery,
      answer: "I don't have a tool for this yet.",
      description:
        "EasySathi is still learning how to handle this type of request.",
    });
  };

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearAnswer = () => {
    setAnswer(null);
    setQuery("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ==========================================
          HEADER
      ========================================== */}

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

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="px-6 pb-20 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}

          <div className="mb-5 inline-flex items-center rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
            Simple answers. Less searching.
          </div>

          {/* Heading */}

          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
            What do you want
            <span className="block">help with?</span>
          </h1>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Calculate, convert, create or find what you need. Just tell
            EasySathi what you&apos;re looking for.
          </p>

          {/* ==========================================
              SEARCH
          ========================================== */}

          <div id="search" className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
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

            {/* ==========================================
                SUGGESTIONS
            ========================================== */}

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestion(suggestion)}
                  className="rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* ==========================================
                ANSWER
            ========================================== */}

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

      {/* ==========================================
          CATEGORIES
      ========================================== */}

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
                  onClick={() => {
                    if (category.title === "Money") {
                      document
                        .getElementById("search")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }

                    if (category.title === "Converters") {
                      setQuery("Convert 5 feet to cm");
                      handleSearch("Convert 5 feet to cm");

                      document
                        .getElementById("search")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                    if (category.title === "Documents") {
                      document
                        .getElementById("search")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                    if (category.title === "Students") {
                      document
                        .getElementById("search")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
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

      {/* ==========================================
          ABOUT
      ========================================== */}

      <section id="about" className="border-t px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">
            One place for everyday problems
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            You shouldn&apos;t have to search through multiple websites just to
            find the right calculator or utility. EasySathi is being built to
            understand what you need and take you directly to the answer.
          </p>
        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 EasySathi</p>

          <p>Simple answers. Less searching.</p>
        </div>
      </footer>
    </main>
  );
}
