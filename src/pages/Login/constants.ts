import { EMPTY_STRING } from 'constants/generalConst'
import { VALIDATION } from "constants/validation";
export const LOGIN_FORM_SCHEMA = [
  {
    key: "login",
    label: "Логин",
    placeholder: EMPTY_STRING,
    gridProps: {
      colSpan: 2,
    },
    validate: (value: string) => {
      if (value.match(VALIDATION.LOGIN.pattern) == null) {
        return VALIDATION.LOGIN.message;
      }
    },
  },
  {
    key: "password",
    label: "Пароль",
    type: "password",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.PASSWORD.pattern) == null) {
        return VALIDATION.PASSWORD.message;
      }
    },
  },
];

export const INITIAL_STATE = {
  login: "",
  password: "",
};
