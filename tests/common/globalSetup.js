const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async () => {
  globalThis.servers = await setupDevServer({
    command: "npm run start",
    port: process.env.PORT || 3002,
    launchTimeout: 35000,
  });
};
