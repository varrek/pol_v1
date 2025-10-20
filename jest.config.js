module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'voting-system.ts',
    '!**/*.test.ts',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 83,
      functions: 90,
      lines: 89,
      statements: 89
    }
  }
};

