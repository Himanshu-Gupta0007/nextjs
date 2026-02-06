import { z } from "zod";

const passwordRule = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must be less than 20 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.string().email("Please enter a valid email address").toLowerCase(),

    password: passwordRule,

    confirmPassword: z.string(),

    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms & conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupInput = z.infer<typeof signupSchema>;
