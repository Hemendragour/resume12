export interface User {
  _id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  user: User | null;

  token: string | null;

  setAuth: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
}