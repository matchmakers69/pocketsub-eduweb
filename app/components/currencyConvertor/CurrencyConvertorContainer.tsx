"use client";
import { useState } from "react";
import Button from "../buttons/Button";
import CurrencyConvertorReactSelect from "./CurrencyConvertorReactSelect";
import CurrencyConvertor from "./CurrencyConvertor";
import { useFetchCurrenciesQuery } from "./hooks/useCurrenciesRQ";
import { convertCurrencyRateToCurrencies } from "./service/convertCurrencyRateToCurrencies";

export type Option = {
  label: string;
  value: string;
};

const CurrencyConvertorContainer = () => {
  const [
    currencyConvertorWithReactSelectInView,
    setCurrencyConvertorWithReactSelectInView,
  ] = useState(false);

  const handleToggleConvertor = () => {
    setCurrencyConvertorWithReactSelectInView((prevState) => !prevState);
  };

  const { isLoading, currencyRate } = useFetchCurrenciesQuery();
  if (isLoading || !currencyRate) {
    return <div>Loading current rates...</div>;
  }

  const options = convertCurrencyRateToCurrencies(currencyRate);
  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={handleToggleConvertor}
          type="button"
          label={
            currencyConvertorWithReactSelectInView
              ? "Go back"
              : "View with react-select"
          }
        />
      </div>
      {!currencyConvertorWithReactSelectInView ? (
        <CurrencyConvertor options={options} />
      ) : (
        <CurrencyConvertorReactSelect options={options} />
      )}
    </>
  );
};

export default CurrencyConvertorContainer;
