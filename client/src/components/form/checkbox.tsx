import { ChangeEventHandler, memo, useCallback } from "react";
import { InputMinProps } from "./Input";

export type CheckBoxOption = { label: string; value: string };
export type CheckBoxProps = {
  values: CheckBoxOption[];
  value: string | undefined;
  name: string;
  error: string | undefined;
  onChange: (name: string, value: string | undefined) => void;
};
export const CheckBox = memo((props: CheckBoxProps) => {
  const { name, value, values, onChange, error } = props;

  const onSelectedChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      const { target } = event;

      if (target.value == "") {
        onChange(target.name, undefined);
      }

      onChange(target.name, target.value);
    },
    [onChange]
  );

  return (
    <select
      name={name}
      onChange={onSelectedChange}
      className={`form-control custom-input ${error ? "red-background" : ""} ${
        value ? "" : "select-placeholder"
      }`}
    >
      <option value={""}>Select Option</option>
      {values.map((inputValue) => {
        return (
          <option
            selected={inputValue.value == value ? true : false}
            value={inputValue.value}
          >
            {inputValue.label}
          </option>
        );
      })}
    </select>
  );
});
