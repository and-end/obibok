const convict = require('convict');
const colors = require('colors');
const util = require('util');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  }
});

const env = config.get('env');
const configPath = `./config/${env}.json5`;

try {
  config.loadFile(configPath);
} catch (error) {
  console.error(`
  ${colors.bgRed.bold(` Error `)} in ${colors.bgBlack.red.bold(` ${configPath} `)}
  
    ${util.inspect(error, { colors: true })}
  
  See ${colors.cyan.bold('https://github.com/and-end/obibok/blob/master/README.md')} for more info.
  `);

  process.exit(1);
}

config.validate({ allowed: 'strict' });

module.exports = config;
