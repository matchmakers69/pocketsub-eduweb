export type CurrencyOption = {
  label: string;
  value: number;
};

export type ExchangeRate = {
  [currency: string]: string;
};

export type ExchangeRates = {
  data: {
    [currencyCode: string]: string;
  };
};
