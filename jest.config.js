module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  verbose: true,
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
  ],
  "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/test/__mocks__/fileMock.js",
      "\\.(css|scss)$": "identity-obj-proxy"
    },
    "testURL": "http://localhost:4000/beta/ansible/ansible-dashboard"
};
