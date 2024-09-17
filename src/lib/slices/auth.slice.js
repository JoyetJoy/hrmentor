import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: {},
  setUser: (user) => {
    set((state) => ({
      user: user,
    }));
  },
}));
