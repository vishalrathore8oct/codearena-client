import { z } from "zod";

export const LogInSchema = z.object({
  email: z.email("Invalid email address").toLowerCase().trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});
