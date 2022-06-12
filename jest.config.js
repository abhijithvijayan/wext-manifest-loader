/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
	// All imported modules in your tests should be mocked automatically
	automock: false,

	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',

	// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
	modulePathIgnorePatterns: ['lib'],

	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest',

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// The glob patterns Jest uses to detect test files
	testMatch: ['**/tests/**/*.test.[jt]s?(x)'],
};
