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
  moduleNameMapper: {
    '^test/(.*)$': ['<rootDir>/test/$1'],
    '^@factories/(.*)$': ['<rootDir>/test/factories/$1'],
    '^@helpers/(.*)$': ['<rootDir>/test/helpers/$1'],
  },
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/test/helpers/matchers/index.ts',
  ],
};
