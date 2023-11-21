"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SubmitHandler, useController, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../formElements/Input";
import Button from "../buttons/Button";
import { useFetchCurrenciesQuery } from "./hooks/useCurrenciesRQ";
import { convertCurrencyRateToCurrencies } from "./service/convertCurrencyRateToCurrencies";
import { convertorSchema } from "./schema/convertorSchema";
import { CurrencyCode, useCurrencyStore } from "@/src/currencyStore";
import Select from "react-select";
import SelectField from "../formElements/Select";
import { useMemo } from "react";

// type TSelectedOption = {
//   value: string | number;
//   label: string;
// };

// type TConvertorValues = {
//   amount: number;
//   currencyOption?: CurrencyCode | undefined
// };

export type TConvertorValues = Yup.InferType<typeof convertorSchema>;

const CurrencyConvertor = () => {
  const { setSelectedCurrency, selectedCurrency } = useCurrencyStore();

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<TConvertorValues>({
    mode: "onChange",
    resolver: yupResolver(convertorSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { field: currencyRateField } = useController({
    name: "currencyOption",
    control,
  });

  const handleFormSubmit: SubmitHandler<TConvertorValues> = (data) => {
    console.log(data);
    if (data.currencyOption) {
      setSelectedCurrency(data.currencyOption);
    }
  };

  // const selectedCurrencyToGbp = useMemo(() => {

  // },[])

  const { isLoading, currencyRate } = useFetchCurrenciesQuery();
  if (isLoading || !currencyRate) {
    return <div>Loading current rates...</div>;
  }

  const options = convertCurrencyRateToCurrencies(currencyRate);

  const amount = getValues("amount").toFixed(2);
  const currencyValue = options.find(
    (option) => option.label === selectedCurrency,
  )?.value;
  const selectedCurrencyToGbp = Math.floor(
    Number(amount) / Number(currencyValue),
  );
  return (
    <div className="rounded-xl bg-zinc-50 p-3">
      <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-5/6 lg:h-auto lg:w-4/6 ">
        <div className="max-w-2x1 w-full rounded-md border bg-white p-6">
          <h2 className="mb-6 text-center text-xl font-semibold">
            Currncy counter
          </h2>

          <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-5 flex flex-col gap-1">
              <Input<Omit<TConvertorValues, "currencyOption">>
                name="amount"
                id="amount"
                label="Amount"
                register={register}
                errors={errors}
                type="number"
                hasCurrencyPrefix
                required
                iconName="money-pound-circle-line"
              />
            </div>
            <div className="mb-5 flex flex-col gap-1">
              <Select
                options={options}
                value={
                  currencyRateField.value
                    ? options.find(
                        (x) =>
                          String(x.value) === String(currencyRateField.value),
                      )?.value
                    : currencyRateField.value
                }
                onChange={(option) => currencyRateField.onChange(option?.label)}
                placeholder="Currency country"
              />
            </div>
            <div className="mb-4 flex justify-center gap-2">
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                label="Calculate"
              />
            </div>
          </form>
          {currencyValue && <div>{selectedCurrencyToGbp} GBP</div>}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConvertor;
