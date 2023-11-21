import React, { forwardRef } from "react";
import Select, { ActionMeta } from "react-select";

export type Value = string | number;
export type Option =
  | Value
  | { label: string; value: Value; disabled?: boolean };

type SelectFieldProps = {
  label: string;
  options: Option[];
  value: Option;
  onChange: (value: Option | null, actionMeta: ActionMeta<Option>) => void;
};

const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(
  function SelectComponent({ onChange, label, value, options, ...rest }) {
    const handleChange = (
      selectedOption: Option | null,
      actionMeta: ActionMeta<Option>,
    ) => {
      onChange(selectedOption, actionMeta);
    };

    return (
      <>
        <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <Select
          value={value}
          placeholder={label}
          options={options}
          onChange={handleChange}
          isClearable
          {...rest}
        />
      </>
    );
  },
);

export default SelectField;
