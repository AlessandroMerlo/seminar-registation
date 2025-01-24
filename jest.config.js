/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.module\\.scss$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts"
  ]
};