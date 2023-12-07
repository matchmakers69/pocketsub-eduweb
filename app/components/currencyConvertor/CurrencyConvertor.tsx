"use client";

import { SubmitHandler, useController, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../formElements/Input";
import Button from "../buttons/Button";

import { convertorSchema } from "./schema/convertorSchema";
import SelectField, { Option } from "../formElements/Select";
import { useCurrencyStoreCustomSelect } from "@/src/currencyStoreCustomSelect";
import { collectFormErrors } from "@/app/utils/collectFormErrors";
import FormErrors from "../formElements/FormErrors";

type CurrencyConvertorProps = {
  options: Option[];
};

export type TConvertorValues = Yup.InferType<typeof convertorSchema>;

const CurrencyConvertor = ({ options }: CurrencyConvertorProps) => {
  const { totalInGBP, setTotalInGBP } = useCurrencyStoreCustomSelect();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<TConvertorValues>({
    mode: "onChange",
    resolver: yupResolver(convertorSchema),
  });

  const { field: currencyRateField } = useController({
    name: "currencyOption",
    control,
  });

  const handleFormSubmit: SubmitHandler<TConvertorValues> = (data) => {
    const totalInGBP = Number(data.amount) / Number(data.currencyOption);
    setTotalInGBP(totalInGBP);
  };

  const formErrorsMessage = collectFormErrors(errors);

  return (
    <div className="rounded-xl bg-zinc-50 p-3">
      <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-5/6 lg:h-auto lg:w-4/6 ">
        <div className="max-w-2x1 w-full rounded-md border bg-white p-6">
          <h2 className="mb-6 text-center text-xl font-semibold">
            Currncy counter
          </h2>

          <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
            <FormErrors errors={formErrorsMessage as string[]} />
            <div className="mb-5 flex flex-col gap-1">
              <Input<Omit<TConvertorValues, "currencyOption">>
                name="amount"
                id="amount"
                label="Enter your amount you want to calculate"
                register={register}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
            <div className="mb-5 flex flex-col gap-1">
              <SelectField
                fullWidth
                value={currencyRateField.value ?? ""}
                onChange={(option: Option) =>
                  currencyRateField.onChange(option)
                }
                label="Select currency"
                id="currencyOption"
                name="currencyOption"
                placeholder="Choose country currency"
                options={options}
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
          {totalInGBP && <div>Total in GBP: {totalInGBP.toFixed(2)}</div>}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConvertor;
