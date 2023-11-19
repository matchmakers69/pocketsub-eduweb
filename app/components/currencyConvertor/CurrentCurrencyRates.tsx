"use client";

import React from "react";
import { useFetchCurrenciesQuery } from "./hooks/useCurrenciesRQ";
import CurrencyComparisor from "./CurrencyComparisor";

const CurrentCurrencyRates = () => {
  const { isLoading, currencyRate } = useFetchCurrenciesQuery();
  if (isLoading || !currencyRate) {
    return <div>Loading current rates...</div>;
  }
  return (
    <div className="mb-10">
      <CurrencyComparisor currencyRates={currencyRate} />
    </div>
  );
};

export default CurrentCurrencyRates;
