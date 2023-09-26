"use client";

import {
  UseFormRegister,
  FieldError,
  Path,
  DeepMap,
  FieldValues,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { ErrorMessage } from "@hookform/error-message";
import FormErrorMessage from "./FormErrorMessage";

type InputType = "text" | "email" | "password" | "number" | "image" | "file";

export type InputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  id: string;
  label: string;
  type: InputType;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
};

const Input = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps<TFormValues>): JSX.Element => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          className="absolute left-2 top-5 text-neutral-700"
          size={24}
        />
      )}
      <input
        className={`border-1
            peer
            w-full
            rounded-md
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
