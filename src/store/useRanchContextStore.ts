import { create } from "zustand";

interface RanchContextState {
  activeRanchId: string | null;
  setActiveRanchId: (ranchId: string | null) => void;
}

export const useRanchContextStore = create<RanchContextState>((set) => ({
  activeRanchId: null,
  setActiveRanchId: (ranchId) => set({ activeRanchId: ranchId }),
}));
