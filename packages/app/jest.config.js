const makeJestConfig = require('../../utils/makeJestConfig');

module.exports = makeJestConfig({
  displayName: {
    color: 'yellow'
  },
  moduleFileExtensions: ['svelte'],
  moduleNameMapper: {
    '.*(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '.*svelte$': './utils/svelteJest.js'
  }
});
