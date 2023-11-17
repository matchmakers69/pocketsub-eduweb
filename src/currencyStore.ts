import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type CurrencyStoreState = {
  setSelectedCurrency: (newCurrency: string) => void;
};

export const useCurrencyStore = create<CurrencyStoreState>((set) => ({
  selectedCurrency: "",
  setSelectedCurrency: (newCurrency) =>
    set((state) => ({ ...state, selectedCurrency: newCurrency })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useCurrencyStore);
}
