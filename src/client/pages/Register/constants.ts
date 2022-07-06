import { VALIDATION, MESSAGE_REQUIRED } from 'client/constants/validation';
import { EMPTY_STRING } from 'client/constants/generalConst';
import * as yup from 'yup';

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
  },
  {
    typeField: 'email',
    type: 'email',
    label: 'Почта',
    placeholder: EMPTY_STRING,
  },
  {
    typeField: 'first_name',
    label: 'Имя',
    placeholder: EMPTY_STRING,
  },
  {
    typeField: 'second_name',
    label: 'Фамилия',
    placeholder: EMPTY_STRING,
  },
  {
    typeField: 'phone',
    label: 'Телефон',
    type: 'number',
    placeholder: EMPTY_STRING,
  },
  {
    typeField: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: EMPTY_STRING,
  },
  {
    typeField: 'password_repeat',
    label: 'Пароль (ещё раз)',
    type: 'password',
    placeholder: EMPTY_STRING,
  },
];

export const validationSchema = yup.object({
  login: yup
    .string()
    .matches(VALIDATION.LOGIN.pattern, VALIDATION.LOGIN.message)
    .required(MESSAGE_REQUIRED),
  email: yup
    .string()
    .email(VALIDATION.EMAIL.message)
    .required(MESSAGE_REQUIRED),
  first_name: yup
    .string()
    .matches(VALIDATION.FIRST_NAME.pattern, VALIDATION.FIRST_NAME.message)
    .required(MESSAGE_REQUIRED),
  second_name: yup
    .string()
    .matches(VALIDATION.SECOND_NAME.pattern, VALIDATION.SECOND_NAME.message)
    .required(MESSAGE_REQUIRED),
  phone: yup
    .string()
    .required(MESSAGE_REQUIRED)
    .matches(VALIDATION.PHONE.pattern, VALIDATION.PHONE.message),
  password: yup
    .string()
    .matches(VALIDATION.PASSWORD.pattern, VALIDATION.PASSWORD.message)
    .required(MESSAGE_REQUIRED),
  password_repeat: yup
    .string()
    .required(MESSAGE_REQUIRED).oneOf([yup.ref('password'), null], VALIDATION.REPEAT_PASSWORD.message),
});
