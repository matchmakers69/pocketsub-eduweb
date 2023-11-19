export type CurrencyOption = {
  label: string;
  value: number | string;
};

export type ExchangeRate = {
  [currency: string]: number;
};

export type ExchangeRates = {
  data: {
    [currencyCode: string]: number;
  };
};
