import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../../../store/auth.store";

// import { useAuthStore } from "../store/auth.store";

interface Props {
  children: ReactNode;
}

export default function AuthInitializer({ children }: Props) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}
