import React, { Children, memo, PropsWithChildren, ReactNode } from "react";
import { CheckBox } from "./checkbox";
import { Input, InputType } from "./Input";

export type FieldVerticalProps = {
  label?: string;

  error: string | undefined;
  children: any;
};
export const FieldVertical = ({
  label,

  error,
  children,
}: FieldVerticalProps) => (
  <div className="form-group mb-2 full-width">
    {label && <label>{label}</label>}
    <div className="field-vertical">{children}</div>

    {error ? <div className="custom-error">{error}</div> : null}
  </div>
);
