/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/src"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
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
    "^client/components(.*)$": "<rootDir>/src/client/components/$1",
    "^client/constants(.*)$": "<rootDir>/src/client/constants/$1",
    "^client/controllers(.*)$": "<rootDir>/src/client/controllers/$1",
    "^client/modules(.*)$": "<rootDir>/src/client/modules/$1",
    "^client/pages(.*)$": "<rootDir>/src/client/pages/$1",
    "^client/styles(.*)$": "<rootDir>/src/client/styles/$1",
    "^client/store(.*)$": "<rootDir>/src/client/store/$1",
    "^client/hooks(.*)$": "<rootDir>/src/client/hooks/$1",
    "^client/utils(.*)$": "<rootDir>/src/client/utils/$1",
    "^server/models(.*)$": "<rootDir>/src/server/models/$1",
  },
};
