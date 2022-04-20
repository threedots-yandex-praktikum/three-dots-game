import {ChangeEventHandler} from "react";

export type TRegisterProps = Record<string, unknown>;

export type TInputProps = {
  id: string | undefined,
  label: string,
  error?: string,
  placeholder?: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  type?: string,
};
