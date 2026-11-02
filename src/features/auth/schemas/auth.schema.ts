import { z } from "zod";

export const CODE_LENGTH = 4;

/** Allow common formatting, but reject letters and misplaced plus signs. */
const isValidPhone = (value: string): boolean => {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(trimmed) && digits.length >= 8 && digits.length <= 15;
};

const phone = z.string().min(1, "Please enter your phone number")
  .refine(isValidPhone, "Please enter a valid phone number");

const password = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

export const signUpSchema = z.object({
  name: z.string().min(1, "Please enter your full name"),
  email: z.string().min(1, "Please enter your email").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"),
  phone,
  password,
  password_confirmation: z.string().min(1, "Please confirm your password"),
}).refine((v) => v.password === v.password_confirmation, {
  message: "Passwords do not match", path: ["password_confirmation"],
});

export const signInSchema = z.object({
  identifier: z.string().min(1, "Please enter your phone number or email").superRefine((value, ctx) => {
    const trimmed = value.trim();
    if (trimmed.includes("@")) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        ctx.addIssue({ code: "custom", message: "Please enter a valid email" });
      }
    } else if (!isValidPhone(trimmed)) {
      ctx.addIssue({ code: "custom", message: "Please enter a valid phone number" });
    }
  }),
  password: z.string().min(1, "Please enter your password"),
  remember: z.boolean(),
});

export const otpSchema = z.object({
  code: z.string().min(1, "Please enter the code").length(CODE_LENGTH, `Enter all ${CODE_LENGTH} digits`),
});

export const resetPasswordSchema = z.object({
  password,
  password_confirmation: z.string().min(1, "Please confirm your password"),
}).refine((v) => v.password === v.password_confirmation, {
  message: "Passwords do not match", path: ["password_confirmation"],
});

export const forgetPasswordSchema = z.object({ phone });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;
