import {ChangeEventHandler} from "react";

export type TInputProps = {
  key: string,
  label: string,
  error?: string,
  validate: (value: string) => string | undefined,
  touched: boolean | undefined,
  placeholder?: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  type?: string,
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled',
  isReadOnly?: boolean 
};
