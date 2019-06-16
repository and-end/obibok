const angularTypes = require('@commitlint/config-angular-type-enum').value();

const types = [
  ...angularTypes,
  'chore'
];

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [2, 'always', types]
  }
};
