import { z } from "zod";

export const SignUpSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .trim(),
  email: z.email("Invalid email address").toLowerCase().trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});
