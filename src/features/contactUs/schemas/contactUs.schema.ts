import { z } from "zod";

export const contactUsSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z
    .string()
    .min(1, "Please enter your email")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"),
  message: z.string().min(1, "Please enter your message"),
});

export type ContactUsFormValues = z.infer<typeof contactUsSchema>;
