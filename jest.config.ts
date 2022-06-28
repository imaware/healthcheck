import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  // Test File Settings
  modulePathIgnorePatterns: ['dist'],
  testMatch: ['**/*.(unit|spec).(j|t)s'],

  // Code Coverage Settings
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',

    // Ignore Coverage For these Files
    '!src/host.ts',
    '!src/**/index.ts',
    '!src/__tests__/express/Express.util.ts',
  ],
  coverageReporters: ['html', 'json', 'text'],
  reporters: ['default'],
};
export default config;
