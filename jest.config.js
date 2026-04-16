module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/_test_/**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/application/use-cases/**/*.ts",
    "src/controllers/**/*.ts",
    "src/infrastructure/database/models/**/*.ts",

    "!src/**/_test_/**",
    "!src/server.ts",
    "!src/config/**"
  ],
  coverageDirectory: "coverage"
};