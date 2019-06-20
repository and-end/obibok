const _ = require("lodash");
const paths = require("./paths");

function getPackageName() {
  const packageName = require(`${process.cwd()}/package`).name;
  const packagesDelimiter = "obibok-";
  
  return packageName.includes(packagesDelimiter)
    ? packageName.replace(packagesDelimiter, '')
    : packageName;
}

function mergeConcatArr(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

function makeJestConfig(
  config = {},
  baseConfigFile = paths['jest.config.base.js']
) {
  const baseConfig = require(baseConfigFile);
  const packageName = getPackageName();
  const packageDirectory = `<rootDir>/packages/${packageName}`;
  const defaultConfig = {
    ...baseConfig,
    displayName: {
      name: packageName.toUpperCase(),
      color: 'white'
    },
    rootDir: "../..",
    coverageDirectory: `<rootDir>/coverage/${packageName}`,
    testMatch: [
      `${packageDirectory}/src/**/*.test.ts`,
      `${packageDirectory}/__tests__/**/*.ts`
    ],
  };

  return _.mergeWith(defaultConfig, config, mergeConcatArr);
}

module.exports = makeJestConfig;
