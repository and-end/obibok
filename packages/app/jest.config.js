const base = require("../../jest.config.base.js");
const packName = require("./package").name.replace('obibok-', '');
const packageDir = `<rootDir>/packages/${packName}`;

module.exports = {
  ...base,
  displayName: {
    name: `${packName.toUpperCase()}`,
    color: 'purple'
  },
  rootDir: "../..",
  coverageDirectory: `<rootDir>/coverage/${packName}`,
  testMatch: [
    `${packageDir}/src/*.test.ts`,
    `${packageDir}/__tests__/*.test.ts`
  ],
};