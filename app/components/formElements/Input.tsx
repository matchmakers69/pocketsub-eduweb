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
  | "checkbox";

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
} & Omit<InputProps, "name">;

const Input = <T extends Record<string, unknown>>({
  id,
  label,
  name,
  type,
  disabled,
  hasCurrencyPrefix = false,
  required,
  register,
  errors,
  iconName,
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
    <div className={`relative w-full ${isCheckbox ? "flex items-center" : ""}`}>
      {hasCurrencyPrefix && !isCheckbox && (
        <i
          className={`ri-${iconName} absolute left-2 top-3 z-10 origin-[0] font-light text-slate-400`}
        />
      )}
      {isCheckbox ? (
        <input
          className={`peer h-5 w-5 cursor-pointer rounded-md border bg-white outline-none transition ${
            disabled ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={disabled}
          type={type}
          id={id}
          {...register(name, { required })}
        />
      ) : (
        <input
          className={`peer w-full rounded-md border bg-white p-3 pt-3 font-light outline-none transition ${
            disabled ? "cursor-not-allowed opacity-70" : ""
          } ${hasCurrencyPrefix ? "pl-9" : "pl-4"}`}
          disabled={disabled}
          type={type}
          id={id}
          {...register(name, inputOptions)}
          placeholder=""
        />
      )}
      <label
        htmlFor={name}
        className={`text-md absolute top-3 z-10 origin-[0] -translate-y-3 transform duration-150 ${
          hasCurrencyPrefix ? "left-9" : "left-4"
        } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75`}
      >
        {label}
      </label>

      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};

export default Input;
