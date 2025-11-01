import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create((set, get) => ({
  user: {},
  setUser: (user) => {
    set((state) => ({
      user: user,
    }));
  },
}));

// export const usePermissionStore = create((set) => ({
//   permissions: [],
//   setPermissions: (permissions) => set({ permissions }),
// }));
export const usePermissionStore = create(
  persist(
    (set) => ({
      permissions: [],
      setPermissions: (permissions) => set({ permissions }),
      clearPermissions: () => set({ permissions: [] }),
    }),
    {
      name: "permission-storage",
    }
  )
);
export const useRoleStore = create((set) => ({
  role: [],
  setRole: (role) => set({ role }),
}));

export const useCurrentPage = create((set) => ({
  page: null,
  setPage: (page) => set({ page }),
}));
