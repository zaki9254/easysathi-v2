export function parseConverterQuery(query: string) {
  const match = query.match(
    /(\d+(?:\.\d+)?)\s*(mm|millimeters?|cm|centimeters?|m|meters?|km|kilometers?|inch|inches|ft|foot|feet|yard|yards|mile|miles|kg|kilograms?|g|grams?|mg|milligrams?|lb|lbs|pounds?|oz|ounces?|celsius|fahrenheit|kelvin|°c|°f|°k)\s+(?:to|in)\s*(mm|millimeters?|cm|centimeters?|m|meters?|km|kilometers?|inch|inches|ft|foot|feet|yard|yards|mile|miles|kg|kilograms?|g|grams?|mg|milligrams?|lb|lbs|pounds?|oz|ounces?|celsius|fahrenheit|kelvin|°c|°f|°k)/i,
  );

  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  const from = match[2];
  const to = match[3];

  if (!Number.isFinite(value)) {
    return null;
  }

  return {
    value,
    from,
    to,
  };
}