"use client";

import { SubmitHandler, Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../formElements/Input";
import Button from "../buttons/Button";
import { useCurrencyStore } from "@/src/currencyStore";
import { Option } from "./CurrencyConvertorContainer";
import Select from "react-select";
import { convertorSchemaReactSelect } from "./schema/convertorSchemaReactSelect";

type CurrencyConvertorReactSelectProps = {
  options: Option[];
};

export type TConvertorValues = Yup.InferType<typeof convertorSchemaReactSelect>;

const CurrencyConvertorReactSelect = ({
  options,
}: CurrencyConvertorReactSelectProps) => {
  const { setSelectedCurrency, selectedCurrency } = useCurrencyStore();

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<TConvertorValues>({
    mode: "onChange",
    resolver: yupResolver(convertorSchemaReactSelect),
    defaultValues: {
      amount: 0,
      currencyOption: undefined,
    },
  });

  const handleFormSubmit: SubmitHandler<TConvertorValues> = (data) => {
    if (data.currencyOption) {
      setSelectedCurrency(data.currencyOption);
    }
  };

  const amount = getValues("amount");
  const currencyValue = options.find(
    (option) => option.label === selectedCurrency,
  )?.value;
  const selectedCurrencyToGbp = (
    Number(amount) / Number(currencyValue)
  ).toFixed(2);
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
                label="Enter your amount you want to calculate"
                register={register}
                errors={errors}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
            <div className="mb-5 flex flex-col gap-1">
              <Controller
                name="currencyOption"
                control={control}
                render={({ field: { name, ref, onChange, value } }) => {
                  return (
                    <Select
                      ref={ref}
                      name={name}
                      onChange={(option) => option && onChange(option.label)}
                      options={options}
                      value={options.find((option) => option.label === value)}
                      placeholder="Currency country"
                    />
                  );
                }}
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

export default CurrencyConvertorReactSelect;
