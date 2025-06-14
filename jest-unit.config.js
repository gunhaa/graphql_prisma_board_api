module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/unitTests/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/prisma/mocks/prisma.mock.ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coverageDirectory: 'coverage-unit',
  coverageReporters: ['json', 'lcov', 'text'],
};
