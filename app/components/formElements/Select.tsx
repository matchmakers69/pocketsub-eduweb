import { ChangeEvent } from "react";

export type Value = string | number;
export type Option =
  | Value
  | { label: string; value: Value; disabled?: boolean };

type SelectFieldProps<T> = {
  id: string | number;
  label: string;
  options: T[];
  name?: string;
  value: string | number;
  onChange: (option: T) => void;
  placeholder?: string;
};

const SELECT_FIELD_ITEM = "select-field-item-";

const SelectField = ({
  options,
  onChange,
  value,
  name,
  label,
  placeholder = "",
}: SelectFieldProps<Option>) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <>
      <label
        htmlFor={name}
        className="mb-0 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleSelectChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pt-3  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
    </>
  );
};

export default SelectField;
