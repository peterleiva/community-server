const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.test.json');

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },

  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src', 'test'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/(.*).d.ts/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/test/helpers/matchers/index.ts',
  ],
};
