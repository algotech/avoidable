const {defaults} = require('jest-config');

module.exports = async () => {
  return {
    verbose: true,
    preset: 'react-native',
    globals: {
      "__DEV__": true
    },
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest',
      "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ios', 'android', 'ios.js', 'android.js'],
    transformIgnorePatterns: [
      "/node_modules/(?!(@react-native|react-native)/).*/"
    ],
    modulePathIgnorePatterns: [
      "<rootDir>/lib/"
    ],
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"]
  };
};