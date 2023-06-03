// Copyright 2021 Green Badger LLC

import React, { memo, useCallback } from "react";

type SubmitButtonProps = {
  title: string;
  loading?: boolean;
  value?: string;
  className?: string;
  disabled?: boolean;
};
export const SubmitButton = memo<SubmitButtonProps>((props) => {
  const { title } = props;

  return (
    <button type="submit" className="btn custom-button">
      {title}
    </button>
  );
});
