export type UnitCategory = "length" | "weight" | "temperature";

const lengthUnits: Record<string, number> = {
  mm: 0.001,
  millimeter: 0.001,
  millimeters: 0.001,

  cm: 0.01,
  centimeter: 0.01,
  centimeters: 0.01,

  m: 1,
  meter: 1,
  meters: 1,

  km: 1000,
  kilometer: 1000,
  kilometers: 1000,

  inch: 0.0254,
  inches: 0.0254,

  ft: 0.3048,
  foot: 0.3048,
  feet: 0.3048,

  yard: 0.9144,
  yards: 0.9144,

  mile: 1609.344,
  miles: 1609.344,
};

const weightUnits: Record<string, number> = {
  mg: 0.001,
  milligram: 0.001,
  milligrams: 0.001,

  g: 1,
  gram: 1,
  grams: 1,

  kg: 1000,
  kilogram: 1000,
  kilograms: 1000,

  tonne: 1_000_000,
  ton: 1_000_000,

  lb: 453.59237,
  lbs: 453.59237,
  pound: 453.59237,
  pounds: 453.59237,

  oz: 28.349523125,
  ounce: 28.349523125,
  ounces: 28.349523125,
};

function normalizeUnit(unit: string) {
  return unit.toLowerCase().trim();
}

export function convertUnit(
  value: number,
  from: string,
  to: string,
  category: UnitCategory,
): number | null {
  const fromUnit = normalizeUnit(from);
  const toUnit = normalizeUnit(to);

  if (category === "length") {
    const fromFactor = lengthUnits[fromUnit];
    const toFactor = lengthUnits[toUnit];

    if (fromFactor === undefined || toFactor === undefined) {
      return null;
    }

    return (value * fromFactor) / toFactor;
  }

  if (category === "weight") {
    const fromFactor = weightUnits[fromUnit];
    const toFactor = weightUnits[toUnit];

    if (fromFactor === undefined || toFactor === undefined) {
      return null;
    }

    return (value * fromFactor) / toFactor;
  }

  if (category === "temperature") {
    if (fromUnit === "c" || fromUnit === "celsius") {
      if (toUnit === "f" || toUnit === "fahrenheit") {
        return (value * 9) / 5 + 32;
      }

      if (toUnit === "k" || toUnit === "kelvin") {
        return value + 273.15;
      }

      return value;
    }

    if (fromUnit === "f" || fromUnit === "fahrenheit") {
      if (toUnit === "c" || toUnit === "celsius") {
        return ((value - 32) * 5) / 9;
      }

      if (toUnit === "k" || toUnit === "kelvin") {
        return ((value - 32) * 5) / 9 + 273.15;
      }

      return value;
    }

    if (fromUnit === "k" || fromUnit === "kelvin") {
      if (toUnit === "c" || toUnit === "celsius") {
        return value - 273.15;
      }

      if (toUnit === "f" || toUnit === "fahrenheit") {
        return ((value - 273.15) * 9) / 5 + 32;
      }

      return value;
    }
  }

  return null;
}