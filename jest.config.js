/** @type {import("jest").Config} **/
export default {
	// The test environment that will be used for testing
	testEnvironment: "node",

	// The glob patterns Jest uses to detect test files
	testMatch: ["**/tests/**/*.test.[jt]s?(x)"],

	moduleFileExtensions: ["js", "ts"],

	// Fixes the js extension imports
	// https://github.com/swc-project/jest/issues/64#issuecomment-1029753225
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},

	transform: {
		"^.+\\.[jt]sx?$": "@swc/jest", // targets files ending with .js, .jsx, .ts or .tsx
	},

	extensionsToTreatAsEsm: [".ts", ".tsx"],

	// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
	modulePathIgnorePatterns: ["lib"],
};
