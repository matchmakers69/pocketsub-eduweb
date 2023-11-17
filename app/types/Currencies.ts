export type CurrencyOption = {
  label: string;
  value: number | string;
};

export type ExchangeRates = {
  data: {
    [currencyCode: string]: number;
  };
};
