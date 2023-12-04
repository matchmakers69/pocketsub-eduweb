/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { InputHTMLAttributes } from "react";
import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
  DeepMap,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormErrorMessage from "../FormErrorMessage";
import { DetailedHTMLProps } from "react";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "image"
  | "file"
  | "checkbox"
  | "date";

type InputProps = {
  id: string;
  name: string;
  label?: string;
  type?: InputType;
  className?: string;
  iconName?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  register: any;
  errors?: Partial<DeepMap<T, FieldError>>;
  disabled?: boolean;
  hasCurrencyPrefix?: boolean;
  required?: boolean;
  checkbox?: boolean;
  min?: string;
  placeholder?: string;
  step?: string;
  mask?: boolean;
  maskText?: string;
} & Omit<InputProps, "name">;

const Input = <T extends Record<string, unknown>>({
  id,
  label,
  name,
  type,
  disabled,
  hasCurrencyPrefix = false,
  mask = false,
  maskText = "",
  required,
  register,
  errors,
  iconName,
  min = "",
  placeholder = "Enter something",
  step = "",
}: FormInputProps<T>): JSX.Element => {
  const isCheckbox = type === "checkbox";

  const inputOptions: any = {
    required,
  };

  if (hasCurrencyPrefix) {
    inputOptions.valueAsNumber = true;
    inputOptions.pattern = /^[1-9]\d*$/;
  }

  return (
    <>
      {hasCurrencyPrefix && !isCheckbox && (
        <i
          className={`ri-${iconName} absolute left-2 top-3 z-10 origin-[0] font-light text-slate-400`}
        />
      )}
      {label && (
        <label
          htmlFor={name}
          className={`mb-1 block text-left text-sm font-light text-zinc-600 dark:text-white ${
            hasCurrencyPrefix ? "absolute" : "static"
          } z-10 ${hasCurrencyPrefix ? "left-9" : "left-0"}`}
        >
          {label}
        </label>
      )}
      {isCheckbox ? (
        <input
          className={`peer h-5 w-5 cursor-pointer rounded-md border border-gray-300 bg-gray-50 outline-none transition ${
            disabled ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={disabled}
          type={type}
          id={id}
          {...register(name, { required })}
        />
      ) : (
        <div className={mask ? "relative" : "static"}>
          <input
            className={`w-full  rounded-md border border-zinc-400 bg-zinc-100 p-2 text-sm font-light text-zinc-800 outline-none placeholder:text-zinc-400  focus:ring-1 focus:ring-inset focus:ring-zinc-800 ${
              disabled ? "cursor-not-allowed opacity-70" : ""
            } ${hasCurrencyPrefix ? "pl-9" : "pl-2"} ${
              mask ? "pl-20" : "pl-2"
            }`}
            disabled={disabled}
            type={type}
            id={id}
            min={min}
            {...register(name, inputOptions)}
            step={step}
            placeholder={placeholder}
          />
          {mask && (
            <div className="absolute inset-y-0 left-0 flex items-center rounded-md rounded-r-none bg-zinc-400 p-2">
              {maskText}
            </div>
          )}
        </div>
      )}

      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </>
  );
};

export default Input;
