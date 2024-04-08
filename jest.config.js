/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  verbose: true,
  testTimeout: 60000,
  globalSetup: "./tests/common/globalSetup.js",
  globalTeardown: "./tests/common/globalTeardown.js",
};

module.exports = config;
