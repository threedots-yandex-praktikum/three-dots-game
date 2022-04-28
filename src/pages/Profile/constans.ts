import { EMPTY_STRING } from 'constants/generalConst'
import { VALIDATION } from "constants/validation";

export const PROFILE_FORM_SCHEMA = [
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
    key: "email",
    label: "Почта",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.EMAIL.pattern) == null) {
        return VALIDATION.EMAIL.message;
      }
    },
  },
  {
    key: "first_name",
    label: "Имя",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.FIRST_NAME.pattern) == null) {
        return VALIDATION.FIRST_NAME.message;
      }
    },
  },
  {
    key: "second_name",
    label: "Фамилия",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.SECOND_NAME.pattern) == null) {
        return VALIDATION.SECOND_NAME.message;
      }
    },
  },
  {
    key: "display_name",
    label: "Никнейм",
    placeholder: EMPTY_STRING,
    validate: () => undefined,
  },
  {
    key: "phone",
    label: "Телефон",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.PHONE.pattern) == null) {
        return VALIDATION.PHONE.message;
      }
    },
  },
];
