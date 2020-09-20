module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },

  testEnvironment: 'node',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src', 'test'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/(.*).d.ts/'],
  moduleNameMapper: {
    '^src/(.*)$': ['<rootDir>/src/$1'],
    '^test/(.*)$': ['<rootDir>/test/$1'],
    '^factories/(.*)$': ['<rootDir>/test/factories/$1']
  },
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/test/utils/matchers/index.ts',
  ],
};
