module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    // process js with `babel-jest`
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/components/*.{js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary'],
};
