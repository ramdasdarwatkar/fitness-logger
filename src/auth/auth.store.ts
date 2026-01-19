import { create } from "zustand";
import { LS_KEYS } from "../storage/localStorage.keys";

interface AuthState {
  token: string | null;
  userId: string | null;
  setAuth: (token: string | null, userId: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(LS_KEYS.TOKEN),
  userId: localStorage.getItem("user_id"),

  setAuth: (token, userId) => {
    if (token && userId) {
      localStorage.setItem(LS_KEYS.TOKEN, token);
      localStorage.setItem("user_id", userId);
    } else {
      localStorage.removeItem(LS_KEYS.TOKEN);
      localStorage.removeItem("user_id");
    }

    set({ token, userId });
  },
}));
