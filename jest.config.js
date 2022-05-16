/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {

    /*
    * используем здесь для обработки файлов картинок кастомный модуль, т.к. identity-obj-proxy не может корректно
    * работать с дефолтными импортами es6.
    * Данное решение взято из комментариев к до сих пор открытому issue (https://github.com/keyz/identity-obj-proxy/issues/8)
    * Файл /.jest/identity-obj-proxy-esm.js - тоже часть этого решения
    * */
    '^.+\\.(png|jpg)$': '<rootDir>/.jest/identity-obj-proxy-esm.js',
    "^.+\\.(css|scss)$": "identity-obj-proxy",
    "^static(.*)$": "<rootDir>/static/$1",
    "^components(.*)$": "<rootDir>/src/components/$1",
    "^constants/(.*)$": "<rootDir>/src/constants/$1",
    "^controllers(.*)$": "<rootDir>/src/controllers/$1",
    "^modules(.*)$": "<rootDir>/src/modules/$1",
    "^pages(.*)$": "<rootDir>/src/pages/$1",
    "^styles(.*)$": "<rootDir>/src/styles/$1",
    "^store(.*)$": "<rootDir>/src/store/$1",
    "^hooks(.*)$": "<rootDir>/src/hooks/$1",
    "^utils(.*)$": "<rootDir>/src/utils/$1",
  },
};
