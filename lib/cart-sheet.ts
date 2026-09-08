import { create } from "zustand";

interface CartSheetState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/** Whether the cart Sheet is open. Shared so the header and the checkout page can both open it. */
export const useCartSheet = create<CartSheetState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
