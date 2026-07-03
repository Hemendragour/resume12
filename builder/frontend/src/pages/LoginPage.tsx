import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  loginSchema,
  type LoginFormData,
} from "../features/auth/auth.schema";

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
      console.log("STEP 1");

      const response = await loginUser(data);

      console.log("STEP 2:", response);

      setAuth(response.user, response.token);

      console.log("STEP 3");

      navigate("/", { replace: true });

      console.log("STEP 4");
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);
      console.error("STATUS:", error?.response?.status);
      console.error("DATA:", error?.response?.data);
      console.error("MESSAGE:", error?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-1"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-3">
            {errors.email.message}
          </p>
        )}

        <input
          {...register("password")}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-1"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-3">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded mt-3"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}