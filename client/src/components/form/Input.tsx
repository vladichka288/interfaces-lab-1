// Copyright 2021 Green Badger LLC

import React, { ChangeEventHandler, memo, useCallback } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type InputValueType = null | undefined | string | number;

export type InputMinProps<T> = {
  name: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  value?: T;
  checked?: boolean;
  readonly?: boolean;
  onChange: (name: string, value: T) => void;
};

export type InputProps<T> = {
  autoCompleteSuggestions?: string[];
  type: "text" | "number" | "email" | "password" | "search";
  autoComplete?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  popperPlacement?: string;
  linethrough?: boolean;
  error: string | undefined;
} & InputMinProps<T>;
export const Input = memo(<T extends InputType>(props: InputProps<T>) => {
  const {
    name,
    type,
    readonly,
    placeholder,
    autoCompleteSuggestions,
    disabled,
    popperPlacement,
    value,
    onChange,
    className,
    linethrough,
    error,
    ...rest
  } = props;
  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { target } = event;

      onChange(target.name, target.value as T);
    },
    [onChange]
  );

  return (
    <input
      className={`form-control custom-input ${error ? "red-background" : ""}`}
      style={{ textDecorationLine: linethrough ? "line-through" : "none" }}
      autoComplete="off"
      list={
        (autoCompleteSuggestions ?? []).length > 0 ? "data-list" : undefined
      }
      name={name}
      disabled={disabled}
      readOnly={readonly}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onInputChange}
      {...rest}
    />
  );
});

type InputDateProps = {
  placeholder?: string;
  min?: Date;
  max?: Date;
  popperPlacement?: string;
  error?: string | undefined;
} & InputMinProps<Date | undefined>;
export const InputDate = memo((props: InputDateProps) => {
  const {
    popperPlacement,
    name,
    disabled,
    readonly,
    value,
    placeholder,
    min,
    max,
    error,
    onChange,
  } = props;
  const onDateChange = useCallback(
    (date: unknown) => {
      if (date instanceof Date) {
        onChange(name, date);
      }
    },
    [name, onChange]
  );

  return (
    <DatePicker
      className={`form-control custom-input ${error ? "red-background" : ""}`}
      //@ts-ignore
      popperPlacement={popperPlacement ?? "auto"}
      readOnly={readonly}
      wrapperClassName="is-flex"
      placeholderText={placeholder}
      disabled={disabled}
      onChange={onDateChange}
      selected={value}
      minDate={min}
      maxDate={max}
    />
  );
});

export type InputType = number | string;
