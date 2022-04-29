import { ChangeEventHandler, ReactNode } from 'react';

export type TInputProps = {
  id: string,
  label: string,
  error?: string,
  validate: (value: string) => string | undefined,
  touched: boolean | undefined,
  placeholder?: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  type?: string,
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled',
  as?: ReactNode,
  className?: string,
};
