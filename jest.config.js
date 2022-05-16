/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    "^.+\\.(css|scss|png|jpg)$": "identity-obj-proxy",
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
