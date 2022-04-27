import {VALIDATION} from "../../constants/validation";
import {EMPTY_STRING} from 'constants/generalConst'


export const EDIT_PASSWORD_FORM_SCHEMA = [
  {
    key: 'old_password',
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
    key: 'new_password',
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
    key: 'password_repeat',
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
