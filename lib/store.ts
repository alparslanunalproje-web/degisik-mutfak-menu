"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_MENU } from "./default-menu";
import type { MenuItem } from "./types";

type MenuState = {
  items: MenuItem[];
  hydrated: boolean;
  setHydrated: () => void;
  addItem: (item: Omit<MenuItem, "id">) => void;
  updateItem: (id: string, item: Omit<MenuItem, "id">) => void;
  removeItem: (id: string) => void;
  resetToDefaults: () => void;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      items: DEFAULT_MENU,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
          ],
        })),
      updateItem: (id, item) =>
        set((state) => ({
          items: state.items.map((m) => (m.id === id ? { ...item, id } : m)),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((m) => m.id !== id) })),
      resetToDefaults: () => set({ items: DEFAULT_MENU }),
    }),
    {
      name: "degisik_mutfak_menu_v2",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
