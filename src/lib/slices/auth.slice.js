import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: {},
  setUser: (user) => {
    set((state) => ({
      user: user,
    }));
  },
}));

export const usePermissionStore = create((set) => ({
  permissions: [],
  setPermissions: (permissions) => set({ permissions }),
}));

export const useRoleStore = create((set) => ({
  role: [],
  setRole: (role) => set({ role }),
}));
