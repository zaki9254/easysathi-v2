export interface BMIResult {
  bmi: number;
  category: string;
}

export function calculateBMI(
  weightKg: number,
  heightCm: number,
): BMIResult | null {
  if (
    !Number.isFinite(weightKg) ||
    !Number.isFinite(heightCm) ||
    weightKg <= 0 ||
    heightCm <= 0
  ) {
    return null;
  }

  const heightM = heightCm / 100;

  const bmi = weightKg / (heightM * heightM);

  let category: string;

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  return {
    bmi: Number(bmi.toFixed(2)),
    category,
  };
}