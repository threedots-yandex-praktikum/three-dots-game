export type TLoginProps = Record<string, unknown>;
export type TInitialValues = {
  login: string,
  password: string
};
export type TOnSubmit = (values: TInitialValues) => void
