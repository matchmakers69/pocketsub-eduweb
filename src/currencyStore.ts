import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { ExchangeRate } from "@/app/types/Currencies";

export type CurrencyCode = "PLN" | "USD" | "EUR" | "GBP";

type CurrencyStoreState = {
  exchangeRate: ExchangeRate | null;
  selectedCurrency: CurrencyCode | null;
  setSelectedCurrency: (newCurrency: CurrencyCode) => void;
  setCurrencyRate: (currency: ExchangeRate) => void;
};

export const useCurrencyStore = create<CurrencyStoreState>((set) => ({
  exchangeRate: null,
  selectedCurrency: null,
  setCurrencyRate: (currency) => set({ exchangeRate: currency }),
  setSelectedCurrency: (newCurrency) =>
    set((state) => ({ ...state, selectedCurrency: newCurrency })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useCurrencyStore);
}
