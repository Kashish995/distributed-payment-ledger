/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  testMatch: ["**/__tests__/integration/**/*.test.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,

  setupFiles: ["<rootDir>/src/__tests__/setup.ts"],

  setupFilesAfterEnv: [
    "<rootDir>/src/__tests__/integration/setupIntegration.ts",
  ],

  maxWorkers: 1,
  
  collectCoverage: false,
};
