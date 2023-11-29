import { create } from "zustand";
import { ExchangeRate } from "@/app/types/Currencies";

type TSelectedCurrency = string | number;

type CurrencyStoreState = {
  exchangeRate: ExchangeRate | null;
  selectedCurrencyRate: TSelectedCurrency;
  totalInGBP: number | null;
  setCurrencyRate: (currency: ExchangeRate) => void;
  setSelectedCurrencyRate: (newCurrency: TSelectedCurrency) => void;
  setTotalInGBP: (total: number) => void;
};

export const useCurrencyStoreCustomSelect = create<CurrencyStoreState>(
  (set) => ({
    selectedCurrencyRate: 0,
    totalInGBP: null,
    exchangeRate: null,
    setCurrencyRate: (currency) => set({ exchangeRate: currency }),
    setSelectedCurrencyRate: (newCurrency) =>
      set((state) => ({ ...state, selectedCurrencyRate: newCurrency })),
    setTotalInGBP: (total) => set({ totalInGBP: total }),
  }),
);
