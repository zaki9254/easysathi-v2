export interface BMIQuery {
  weightKg: number;
  heightCm: number;
}

export function parseBMIQuery(query: string): BMIQuery | null {
  const text = query.toLowerCase().trim();

  // Weight
  const weightMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(?:kg|kgs|kilogram|kilograms)\b/i,
  );

  // Height in cm
  const heightCmMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(?:cm|centimeter|centimeters)\b/i,
  );

  if (weightMatch && heightCmMatch) {
    const weightKg = Number(weightMatch[1]);
    const heightCm = Number(heightCmMatch[1]);

    if (weightKg > 0 && heightCm > 0) {
      return {
        weightKg,
        heightCm,
      };
    }
  }

  // Height in feet
  const heightFeetMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(?:ft|foot|feet)\b/i,
  );

  if (weightMatch && heightFeetMatch) {
    const weightKg = Number(weightMatch[1]);
    const heightFeet = Number(heightFeetMatch[1]);

    if (weightKg > 0 && heightFeet > 0) {
      return {
        weightKg,
        heightCm: heightFeet * 30.48,
      };
    }
  }

  return null;
}