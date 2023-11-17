"use client";

import { useCurrencyStore } from "@/src/currencyStore";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../formElements/Select";
import Button from "../buttons/Button";
import { CurrencyOption } from "@/app/types/Currencies";

type CurrencyFormValues = {
  currency: CurrencyOption;
};

const CurrencyConvertForm = () => {
  const { currencies, setSelectedCurrency } = useCurrencyStore();
  const { register, handleSubmit } = useForm<CurrencyFormValues>({
    mode: "onChange",
  });

  const handleCurrencySubmit: SubmitHandler<CurrencyFormValues> = (data) => {
    setSelectedCurrency(`${data.currency}`);
  };

  return (
    <form onSubmit={handleSubmit(handleCurrencySubmit)}>
      <div>
        <Select
          {...register("currency")}
          label="Select currency"
          name="currency"
          options={currencies}
        />
      </div>
      <div>
        <Button type="submit" label="Save" />
      </div>
    </form>
  );
};

export default CurrencyConvertForm;
