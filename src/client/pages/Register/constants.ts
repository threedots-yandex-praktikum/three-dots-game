import { VALIDATION } from 'client/constants/validation';
import { EMPTY_STRING } from 'client/constants/generalConst';


export const REGISTER_INITIAL_STATE = {
  login: EMPTY_STRING,
  email: EMPTY_STRING,
  first_name: EMPTY_STRING,
  second_name: EMPTY_STRING,
  phone: EMPTY_STRING,
  password: EMPTY_STRING,
  password_repeat: EMPTY_STRING,
};

export const REGISTER_FORM_SCHEMA = [
  {
    typeField: 'login',
    label: 'Логин',
    placeholder: EMPTY_STRING,
    gridProps: {
      colSpan: 2,
    },
    validate: (value: string) => {
      if(value.match(VALIDATION.LOGIN.pattern) == null) {
        return VALIDATION.LOGIN.message;
      }
    },
  },
  {
    typeField: 'email',
    label: 'Почта',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.EMAIL.pattern) == null) {
        return VALIDATION.EMAIL.message;
      }
    },
  },
  {
    typeField: 'first_name',
    label: 'Имя',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.FIRST_NAME.pattern) == null) {
        return VALIDATION.FIRST_NAME.message;
      }
    },
  },
  {
    typeField: 'second_name',
    label: 'Фамилия',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.SECOND_NAME.pattern) == null) {
        return VALIDATION.SECOND_NAME.message;
      }
    },
  },
  {
    typeField: 'phone',
    label: 'Телефон',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.PHONE.pattern) == null) {
        return VALIDATION.PHONE.message;
      }
    },
  },
  {
    typeField: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.PASSWORD.pattern) == null) {
        return VALIDATION.PASSWORD.message;
      }
    },
  },
  {
    typeField: 'password_repeat',
    label: 'Пароль (ещё раз)',
    type: 'password',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.PASSWORD.pattern) == null) {
        return VALIDATION.PASSWORD.message;
      }
    },
  },
];
