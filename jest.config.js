const path = require('path');

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },

  testEnvironment: 'node',
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
