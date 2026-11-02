import { z } from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current Password is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /[A-Z]/,
        "The password field must contain at least one uppercase letter."
      )
      .regex(
        /[a-z]/,
        "The password field must contain at least one lowercase letter."
      )
      .regex(/[A-Za-z]/, "The password field must contain at least one letter.")
      .regex(
        /[^A-Za-z0-9]/,
        "The password field must contain at least one symbol."
      ),

    password_confirmation: z.string().min(1, "ConfirmPassword is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
