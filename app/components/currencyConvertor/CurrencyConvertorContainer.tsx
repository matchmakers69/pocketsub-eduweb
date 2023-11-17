"use client";

import CurrencyConvertForm from "./CurrencyConvertForm";
import { useFetchCurrenciesQuery } from "./hooks/useCurrenciesRQ";

const CurrencyConvertorContainer = () => {
  const { isLoading } = useFetchCurrenciesQuery();

  if (isLoading) {
    return <div>Data is loading...</div>;
  }

  return (
    <div>
      <CurrencyConvertForm />
    </div>
  );
};

export default CurrencyConvertorContainer;
