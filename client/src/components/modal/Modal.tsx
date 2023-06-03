import React, { memo, ReactNode } from "react";

type ModalProps = {
  className?: string;
  children?: ReactNode;
};
export const Modal = memo(({ className, children }: ModalProps) => {
  return (
    <div className={`custom-form-wrapper ${className}`}>
      <div className="container"> {children}</div>
    </div>
  );
});
