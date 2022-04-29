import { ChangeEventHandler, ReactNode } from "react";

export type TInputProps = {
  key: string;
  label: string;
  error?: string;
  validate: (value: string) => string | undefined;
  touched: boolean | undefined;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  as?: ReactNode;
  className?: string;
};
