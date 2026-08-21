import { create } from "zustand";

import type { AuthState } from "../types/auth.types";
import { getMe } from "../services/auth.service";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  isLoading: true,

  setAuth: (user) => {
    set({
      user,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isLoading: false,
    });
  },

  setLoading: (loading) => {
    set({
      isLoading: loading,
    });
  },

  initializeAuth: async () => {
    try {
      const response = await getMe();

      set({
        user: response.user,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isLoading: false,
      });
    }
  },
}));
