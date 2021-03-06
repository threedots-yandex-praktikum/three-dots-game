import { EMPTY_STRING } from 'client/constants/generalConst';
import { VALIDATION } from 'client/constants/validation';


export const LOGIN_FORM_SCHEMA = [
  {
    typeField: 'login',
    label: 'Логин',
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
    typeField: 'password',
    label: 'Пароль',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.PASSWORD.pattern) == null) {
        return VALIDATION.PASSWORD.message;
      }
    },
  },
];

export const INITIAL_STATE = {
  login: '',
  password: '',
};
