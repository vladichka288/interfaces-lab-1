// Copyright 2021 Green Badger LLC

import React, { ReactNode } from "react";

type ModalHeadProps = {
  label: string;
};
export const ModalHead = ({ label }: ModalHeadProps) => {
  return <h2 className="mb-4">{label}</h2>;
};

type ModalBodyProps = {
  className?: string;
  children?: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
};
export const ModalBody = ({
  className,
  children,
  onSubmit,
  error,
}: ModalBodyProps) => {
 
  return (
    <div>
      <div className="custom-error">{error}</div>
      <form
        className={`custom-form ${error ? "red-background" : ""}`}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
};

type ModalFootProps = {
  children?: ReactNode;
  className?: string;
};
export const ModalFoot = ({ children, className }: ModalFootProps) => {
  return (
    <footer
      className={`modal-card-foot py-3 is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end ${className}`}
    >
      {children}
    </footer>
  );
};
