import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSchema, type LoginFormData } from "../features/auth/auth.schema";

import { loginUser } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("LOGIN STEP 1");

      const response = await loginUser(data);

      console.log("LOGIN STEP 2:", response);

      // We only store the user in Zustand
      setAuth(response.user);

      console.log("LOGIN STEP 3");

      navigate("/", { replace: true });

      console.log("LOGIN STEP 4");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("LOGIN ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
        console.error("MESSAGE:", error.message);
      } else {
        console.error("Unexpected LOGIN ERROR:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-navbar p-8 rounded-xl shadow-lg w-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-heading">Login</h2>

        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="mb-1 w-full rounded-xl border border-border-navbar bg-navbar-hover p-3 text-heading outline-none placeholder:text-heading/40 focus:border-border-strong focus:ring-2 focus:ring-ring"
        />

        {errors.email && (
          <p className="text-red-600 text-sm mb-3">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="mb-1 w-full rounded-xl border border-border-navbar bg-navbar-hover p-3 text-heading outline-none placeholder:text-heading/40 focus:border-border-strong focus:ring-2 focus:ring-ring"
        />

        {errors.password && (
          <p className="text-red-600 text-sm mb-3">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-btn p-3 mt-3 text-btn-text transition hover:bg-btn-hover disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
