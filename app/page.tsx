"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from ".//src/models/schemas/authschema";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupInput) => {
    console.log("VALID DATA ✅", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-xl shadow-md w-[400px] space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {/* NAME */}
        <div>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* EMAIL */}
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        {/* TERMS */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("acceptTerms")} />
          <label>I accept terms & conditions</label>
        </div>
        <p className="text-red-500 text-sm">{errors.acceptTerms?.message}</p>

        <button className="w-full bg-black text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
