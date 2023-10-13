"use client";

import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
  DeepMap,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { ErrorMessage } from "@hookform/error-message";
import FormErrorMessage from "./FormErrorMessage";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputType = "text" | "email" | "password" | "number" | "image" | "file";

type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
} & Omit<InputProps, "name">;

const Input = <T extends Record<string, unknown>>({
  id,
  label,
  name,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: FormInputProps<T>): JSX.Element => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          className="absolute left-2 top-5 text-neutral-700"
          size={24}
        />
      )}
      <input
        className={`peer
            w-full
            rounded-md
            border
            bg-white
            p-4
           pt-5
           font-light
           outline-none
            transition
           disabled:cursor-not-allowed disabled:opacity-70
           ${formatPrice ? "pl-9" : "pl-4"}
         
      `}
        disabled={disabled}
        type={type}
        id={id}
        {...register(name, { required })}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`
      text-md
      absolute
      top-5
      z-10
      origin-[0]
      -translate-y-3
      transform
      duration-150
      ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:translate-y-0
        peer-placeholder-shown:scale-100
        peer-focus:-translate-y-4
        peer-focus:scale-75
       
      `}
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
