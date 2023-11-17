export const CURRENCY_API_KEY =
  "fca_live_UOSh8DXlgzIaJgqEdYI1hVCoFwHghhqi402VdjbB";

const BASE_CURRENCY = "GBP";
const CURRENCIES = ["PLN", "USD", "EUR", "GBP"];

const currenciesString = CURRENCIES.join("%2C");
const timestamp = new Date().getTime();

export const CURRENCIES_API = `
https://api.freecurrencyapi.com/v1/latest?
apikey=${CURRENCY_API_KEY}
&currencies=${currenciesString}
&base_currency=${BASE_CURRENCY}
&_=${timestamp}
`;
