import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  registerSchema,
  type RegisterFormData,
} from "../features/auth/auth.schema";

import { registerUser } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export default function RegisterPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("REGISTER STEP 1");

      const response = await registerUser(data);

      console.log("REGISTER STEP 2:", response);

      // JWT is already stored in HTTP-only cookie
      // Store only the user in Zustand
      setAuth(response.user);

      console.log("REGISTER STEP 3");

      navigate("/", { replace: true });

      console.log("REGISTER STEP 4");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("REGISTER ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
        console.error("MESSAGE:", error.message);
      } else {
        console.error("Unexpected REGISTER ERROR:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-100"
      >
        <h2 className="text-3xl font-bold mb-6">Create Account</h2>

        <input
          {...register("fullName")}
          type="text"
          autoComplete="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-1"
        />

        {errors.fullName && (
          <p className="text-red-500 text-sm mb-3">{errors.fullName.message}</p>
        )}

        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-1"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-1"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded mt-3"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
}
