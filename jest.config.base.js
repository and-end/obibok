module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  projects: [
    "<rootDir>"
  ],
  transform: {
    ".*(ts|tsx)$": "ts-jest"
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
      "(.*.mock).(jsx?|tsx?)$"
  ]
};