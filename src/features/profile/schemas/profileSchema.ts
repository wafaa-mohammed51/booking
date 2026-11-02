import { z } from "zod";
import { days, months, years } from "../constants/constants";

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),
  phone: z
    .string()
    .regex(/^[0-9]{11}$/, "Phone number must be 11 digits")
    .nullable(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  birth_Day: z.enum(days),
  birth_Month: z.enum(months),
  birth_Year: z.enum(years.map((year) => year.toString())),
  address: z.string().nullable(),
});

export type EditProfileType = z.infer<typeof editProfileSchema>;
