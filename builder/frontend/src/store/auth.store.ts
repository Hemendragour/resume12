import { create } from "zustand";

import type { AuthState } from "../types/auth.types";

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    token: localStorage.getItem("token"),

    setAuth: (user, token) => {
      localStorage.setItem("token", token);

      set({
        user,
        token,
      });
    },

    logout: () => {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
      });
    },
  }));