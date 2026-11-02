import type { LoginPayload } from "@/features/auth/types/auth";

/**
 * The sign-in field accepts a phone number **or** an email. These helpers
 * classify the value and build the payload the backend expects for each auth
 * method:
 * - contains "@" → `{ email, password }`
 * - otherwise    → `{ phone: "+<dial><digits>", password }`
 *
 * The phone is normalised to a bare digit string with a leading "+" so the
 * same account matches regardless of how the user formats it (spaces, dashes,
 * leading zero…). OTP-based flows may still expect the digits-only form, which
 * the backend already receives from the OTP screens.
 */

export function isIdentifierEmail(identifier: string): boolean {
  return identifier.includes("@");
}

/** "+20 123 4567" → "+201234567" (spaces/dashes/parentheses removed). */
export function normalizePhone(raw: string): string {
  let value = raw.replace(/[^\d+]/g, "");
  if (!value.startsWith("+")) value = `+${value}`;
  return value;
}

/** Split the single sign-in field into the API payload for its auth method. */
export function toLoginPayload(
  identifier: string,
  password: string,
): LoginPayload {
  if (isIdentifierEmail(identifier)) {
    return { email: identifier.trim(), password };
  }
  return { phone: normalizePhone(identifier), password };
}
