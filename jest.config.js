globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^.+\\.(ts|html)$': 'jest-preset-angular', // Use jest-preset-angular for TypeScript and templates
    '\\.(scss|css|sass)$': 'identity-obj-proxy', // Mock styles
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  fakeTimers: {
    enableGlobally: true,
  },
};
