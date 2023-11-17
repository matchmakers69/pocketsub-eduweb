import React, { forwardRef, SelectHTMLAttributes } from "react";

export type Value = string | number;
export type Option =
  | Value
  | { label: string; value: Value; disabled?: boolean };

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function SelectComponent(
    { onChange, name, label, onBlur, options, ...rest },
    ref,
  ) {
    return (
      <>
        <label>{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={typeof option === "object" ? option.value : option}
            >
              {typeof option === "object" ? option.label : option}
            </option>
          ))}
        </select>
      </>
    );
  },
);

export default Select;
