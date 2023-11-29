import { ExchangeRate } from "@/app/types/Currencies";

export const convertCurrencyRateToCurrencies = (currencyRate: ExchangeRate) => {
  return Object.entries(currencyRate)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .filter((x) => x.label !== "GBP");
};
