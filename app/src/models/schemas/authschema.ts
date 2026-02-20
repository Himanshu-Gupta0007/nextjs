import { z } from "zod";

// ================= PASSWORD RULE =================
const passwordRule = z
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must be less than 20 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// ================= SIGNUP SCHEMA =================
export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .regex(/^[A-Za-z ]+$/, "Name can only contain letters"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .transform((val) => val.toLowerCase()),

    password: passwordRule,

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Please confirm your password"),

    // ✅ Correct checkbox validation
    acceptTerms: ( {
      errorMap: () => ({
        message: "You must accept the terms & conditions",
      }),
    }),
  })



















  
  
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });




// ================= TYPE =================
export type SignupInput = z.infer<typeof signupSchema>;
