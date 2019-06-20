const pathResolve = require("path").resolve;

// relative to ./packages/*
const root = pathResolve("../..");

module.exports = {
  root,
  "jest.config.base.js": `${root}/jest.config.base.js`,
  "packages/app": `${root}/packages/app`,
  "packages/server": `${root}/packages/server`
};
