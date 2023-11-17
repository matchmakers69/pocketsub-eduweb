import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { CurrencyOption } from "@/app/types/Currencies";

type CurrencyStoreState = {
  currencies: CurrencyOption[];
  isLoading: boolean;
  error: string | null;
  setCurrencyOptions: (data: CurrencyOption[]) => void;
  setSelectedCurrency: (newCurrency: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useCurrencyStore = create<CurrencyStoreState>((set) => ({
  currencies: [],
  selectedCurrency: "",
  isLoading: false,
  error: null,
  setCurrencyOptions: (data) => set({ currencies: data }),
  setSelectedCurrency: (newCurrency) =>
    set((state) => ({ ...state, selectedCurrency: newCurrency })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useCurrencyStore);
}
