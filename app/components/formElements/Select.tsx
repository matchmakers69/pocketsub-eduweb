import { ChangeEvent } from "react";

export type Value = string | number;
export type Option =
  | Value
  | { label: string; value: Value; disabled?: boolean };

type SelectFieldProps<T> = {
  id: string | number;
  label?: string;
  options: T[];
  name?: string;
  value: string | number;
  onChange: (option: T) => void;
  placeholder?: string;
  hideDropDown?: boolean;
  fullWidth?: boolean;
  bgSelect?: boolean;
};

const SELECT_FIELD_ITEM = "select-field-item-";

const SelectField = ({
  options,
  onChange,
  value,
  name,
  label,
  placeholder = "",
  hideDropDown = false,
  bgSelect = false,
  fullWidth = false,
}: SelectFieldProps<Option>) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-light text-zinc-600 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className={!hideDropDown ? "relative" : "static"}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleSelectChange}
          className={`${
            fullWidth && "w-full"
          } cursor-pointer rounded-md border border-zinc-400 bg-zinc-100 p-2 text-sm font-light text-zinc-800 outline-none placeholder:text-zinc-400  focus:ring-1 focus:ring-inset focus:ring-zinc-800 ${"appearance-none"}
        ${bgSelect && "rounded-md rounded-l-none bg-zinc-400 p-2"}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option
              key={index}
              value={typeof option === "object" ? option.value : option}
              id={`${SELECT_FIELD_ITEM}${index.toString()}`}
            >
              {typeof option === "object" ? option.label : option}
            </option>
          ))}
        </select>
        {!hideDropDown && (
          <i className="ri-arrow-down-s-line absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400" />
        )}
      </div>
    </>
  );
};

export default SelectField;
