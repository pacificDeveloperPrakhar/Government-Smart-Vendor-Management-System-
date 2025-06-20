import { z } from "zod";
import { isEmail } from "validator";

export const profileSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: z
      .string({ required_error: "Email is required" })
      .refine((email) => isEmail(email), {
        message: "Email is not valid",
        path: ["email"],
      }),
    phone_number: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" })
      .max(20, { message: "Password must be less than 20 characters" }),
    confirmPassword: z.string().min(4, { message: "Password must be at least 4 characters" })
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
     return false
    }
  });

