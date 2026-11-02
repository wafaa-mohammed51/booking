import { countries, type Country } from "../data/countries";

export const defaultCountry =
  countries.find((c) => c.code === "eg") ?? countries[0];

export function detectCountry(value: string): Country | undefined {
  let digits = value.trim();
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  digits = digits.replace(/\D/g, "");
  if (!digits) return undefined;

  return [...countries]
    .sort((a, b) => b.dial.length - a.dial.length)
    .find((c) => digits.startsWith(c.dial));
}
