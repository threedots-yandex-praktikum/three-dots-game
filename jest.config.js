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
    "^components(.*)$": "<rootDir>/src/client/components/$1",
    "^constants/(.*)$": "<rootDir>/src/client/constants/$1",
    "^controllers(.*)$": "<rootDir>/src/client/controllers/$1",
    "^modules(.*)$": "<rootDir>/src/client/modules/$1",
    "^pages(.*)$": "<rootDir>/src/client/pages/$1",
    "^styles(.*)$": "<rootDir>/src/client/styles/$1",
    "^store(.*)$": "<rootDir>/src/client/store/$1",
    "^hooks(.*)$": "<rootDir>/src/client/hooks/$1",
    "^utils(.*)$": "<rootDir>/src/client/utils/$1",
  },
};
