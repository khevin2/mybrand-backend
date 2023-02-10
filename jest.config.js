export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-node',
    testMatch: ['**/**/*.test.js'],
    verbose: true,
    forceExit: true,
    transform: {},
    testTimeout: 60000,
    collectCoverage: true,
    // clearMocks: true


}