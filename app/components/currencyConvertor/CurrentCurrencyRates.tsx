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
    <div className="mx-auto mb-5 flex items-center justify-end rounded-md border-2 border-zinc-500 bg-zinc-100 px-4 py-1">
      <CurrencyComparisor currencyRates={currencyRate} />
    </div>
  );
};

export default CurrentCurrencyRates;
