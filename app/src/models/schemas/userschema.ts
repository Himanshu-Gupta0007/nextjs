import { z } from "zod";

// ================= REGISTER SCHEMA =================
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z
    .enum(["student", "admin"])
    .default("student"),
});

// ================= TYPE =================
export type RegisterInput = z.infer<typeof registerSchema>;
