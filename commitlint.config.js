const angularTypes = require("@commitlint/config-angular-type-enum");

const types = [
    angularTypes.value(),
    'chore'
];


module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
        'type-enum': [2, 'always', types]
    }
};
