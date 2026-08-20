export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;

  setAuth: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
}
