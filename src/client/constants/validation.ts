export const VALIDATION = {
  REQUIRED: {
    pattern: /(\S){1,}/,
    message: 'Поле является обязательным',
  },
  EMAIL: {
    pattern: /[a-z\d-]+@[a-z]+\.[a-z]+/,
    message: 'только латиница, цифры, символ "-"',
  },
  LOGIN: {
    pattern: /(?=.*[a-zA-Z\-_])[a-zA-Z\-_\d]{3,20}/,
    message: 'только латиница, цифры, символы "_" и "-", от 3 до 20 символов, начинается не с цифры',
  },
  FIRST_NAME: {
    pattern: /[A-ZА-Я][A-ZА-Яа-яa-z-]+/,
    message: 'только латиница, кириллица, символ "-"',
  },
  SECOND_NAME: {
    pattern: /[A-ZА-Я][A-ZА-Яа-яa-z-]+/,
    message: 'только латиница, кириллица, символ "-"',
  },
  PHONE: {
    pattern: /(\+?\d+){10,15}/,
    message: 'только цифры, от 10 до 15 символов, может начинаться с +',
  },
  PASSWORD: {
    pattern: /(?=.*[A-ZА-Яа-яa-z])(?=.*[0-9]).{8,40}/,
    message: 'только кириллица, латиница, цифры, от 8 до 40 символов',
  },
  REPEAT_PASSWORD: {
    message: 'пароли не совпадают',
  },
};

export const MESSAGE_REQUIRED = 'Поле не должно быть пустым';
