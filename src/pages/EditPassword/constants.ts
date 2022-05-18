import { VALIDATION } from 'constants/validation';
import { EMPTY_STRING } from 'constants/generalConst';


export const EDIT_PASSWORD_INITIAL_STATE = {
  old_password: EMPTY_STRING,
  new_password: EMPTY_STRING,
  password_repeat: EMPTY_STRING,
};

export const EDIT_PASSWORD_FORM_SCHEMA = [
  {
    typeField: 'old_password',
    label: 'Старый пароль',
    type: 'password',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.PASSWORD.pattern) == null) {
        return VALIDATION.PASSWORD.message;
      }
    },
  },
  {
    typeField: 'new_password',
    label: 'Новый пароль',
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
    label: 'Новый пароль (ещё раз)',
    type: 'password',
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if(value.match(VALIDATION.PASSWORD.pattern) == null) {
        return VALIDATION.PASSWORD.message;
      }
    },
  },
];
