const pathResolve = require('path').resolve;

// relative to ./packages/*
const root = pathResolve('../..');
const app = `${root}/packages/app`;
const server = `${root}/packages/server`;

module.exports = {
  root,
  node_modules: `${root}/node_modules`,
  'jest.config.base.js': `${root}/jest.config.base.js`,
  'tsconfig.base.json': `${root}/tsconfig.base.json`,
  utils: `${root}/utils`,
  config: `${root}/config`,
  assets: `${root}/assets`,
  app: app,
  'app/public': `${app}/public`,
  'app/styles': `${app}/styles`,
  'app/webpack': `${app}/webpack`,
  'app/components': `${app}/components`,
  'app/node_modules': `${app}/node_modules`,
  server: server
};
