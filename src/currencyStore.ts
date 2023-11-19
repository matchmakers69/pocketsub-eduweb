import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { ExchangeRate, ExchangeRates } from "@/app/types/Currencies";

type CurrencyStoreState = {
  exchangeRate: ExchangeRate | null;
  currencies: ExchangeRates[];
  setSelectedCurrency: (newCurrency: string) => void;
  setCurrencyOptions: (data: ExchangeRates[]) => void;
  setCurrencyRate: (currency: ExchangeRate) => void;
};

export const useCurrencyStore = create<CurrencyStoreState>((set) => ({
  currencies: [],
  exchangeRate: null,
  selectedCurrency: "",
  setCurrencyRate: (currency) => set({ exchangeRate: currency }),
  setCurrencyOptions: (data) => set({ currencies: data }),
  setSelectedCurrency: (newCurrency) =>
    set((state) => ({ ...state, selectedCurrency: newCurrency })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useCurrencyStore);
}
