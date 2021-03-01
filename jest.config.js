const path = require('path');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: '@shelf/jest-mongodb',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },

  transform: {
    ...tsjPreset.transform,
  },

  watchPathIgnorePatterns: ['globalConfig'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  collectCoverage: true,
  coverageReporters: ['text', 'clover', 'text-summary', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/__tests__/',
    '/(.*).d.ts/',
  ],
  coverageDirectory: path.resolve(__dirname, 'coverage'),
  moduleNameMapper: {
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/test/helpers/matchers/index.ts',
  ],
};
