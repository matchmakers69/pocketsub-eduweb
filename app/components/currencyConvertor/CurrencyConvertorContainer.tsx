"use client";

import CurrencyConvertForm from "./CurrencyConvertForm";
import { useFetchCurrenciesQuery } from "./hooks/useCurrenciesRQ";

const CurrencyConvertorContainer = () => {
  const { isLoading, currencies } = useFetchCurrenciesQuery();

  if (isLoading) {
    return <div>Data is loading...</div>;
  }

  return (
    <div>
      <CurrencyConvertForm options={currencies ?? []} />
    </div>
  );
};

export default CurrencyConvertorContainer;
