export interface SalaryQuery {
  monthlySalary: number;
  deductionPercentage: number;
}

function parseAmount(value: string): number {
  return Number(value.replace(/,/g, ""));
}

export function parseSalaryQuery(
  query: string,
): SalaryQuery | null {
  const text = query.toLowerCase().trim();

  // ========================================
  // Find salary amount
  // ========================================

  const salaryMatch = text.match(
    /(?:salary|income|ctc)?\s*(?:of|is|=)?\s*(?:₹|rs\.?|inr)?\s*([\d,]+(?:\.\d+)?)\s*(k|lakh|lakhs|lac|lacs)?/i,
  );

  if (!salaryMatch) {
    return null;
  }

  let monthlySalary = parseAmount(salaryMatch[1]);

  const unit = salaryMatch[2]?.toLowerCase();

  if (unit === "k") {
    monthlySalary *= 1_000;
  } else if (
    unit === "lakh" ||
    unit === "lakhs" ||
    unit === "lac" ||
    unit === "lacs"
  ) {
    monthlySalary *= 100_000;
  }

  // ========================================
  // Find deduction percentage
  // ========================================

  const deductionMatch = text.match(
    /(?:deduction|deductions|tax|cut|cuts)\s*(?:of|at|by)?\s*(\d+(?:\.\d+)?)\s*%?/i,
  );

  let deductionPercentage = 0;

  if (deductionMatch) {
    deductionPercentage = Number(deductionMatch[1]);
  }

  // ========================================
  // Also support:
  // "10% deduction"
  // ========================================

  if (!deductionMatch) {
    const percentageBeforeDeduction = text.match(
      /(\d+(?:\.\d+)?)\s*%\s*(?:deduction|deductions|tax|cut|cuts)\b/i,
    );

    if (percentageBeforeDeduction) {
      deductionPercentage = Number(
        percentageBeforeDeduction[1],
      );
    }
  }

  // ========================================
  // Validation
  // ========================================

  if (
    !Number.isFinite(monthlySalary) ||
    monthlySalary <= 0 ||
    !Number.isFinite(deductionPercentage) ||
    deductionPercentage < 0 ||
    deductionPercentage > 100
  ) {
    return null;
  }

  return {
    monthlySalary,
    deductionPercentage,
  };
}