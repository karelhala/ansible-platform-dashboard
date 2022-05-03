module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/stories/*'
  ],
  coverageDirectory: './coverage/',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  roots: [
    '<rootDir>/src/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/config/setupTests.js'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!@redhat-cloud-services)',
    '/node_modules/(?!@patternfly)'
  ]
};
