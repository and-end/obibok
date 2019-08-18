const { pathsToModuleNameMapper } = require('ts-jest/utils');

const makeJestConfig = require('../../utils/makeJestConfig');
const { compilerOptions } = require('./tsconfig');

console.log(pathsToModuleNameMapper(compilerOptions.paths));

module.exports = makeJestConfig({
  displayName: {
    color: 'yellow'
  },
  moduleFileExtensions: ['svelte'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '.*(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '.*svelte$': './utils/svelteJest.js'
  }
});
