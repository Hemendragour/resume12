import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/auth.store";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AdminProtectedRoute({ children }: Props) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/404" replace />;
  }

  return children;
}
