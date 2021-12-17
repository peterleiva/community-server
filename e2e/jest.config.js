const { resolve } = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = Object.assign(
	{},
	require("../test/jest-common"),
	require("../test/jest-typescript")(resolve(__dirname, "./tsconfig.json")),
	{
		roots: ["<rootDir>/e2e", "<rootDir>/test"],
		name: "e2e",
		displayName: {
			name: "E2E Tests",
			color: "blue",
		},

		testMatch: [
			"**/__tests__/**/*.[jt]s?(x)",
			"**/?(*.)+(spec|test).[jt]s?(x)",
			resolve(__dirname, "**/*.ts"),
		],

		moduleDirectories: [
			"node_modules",
			resolve(__dirname),
			resolve(__dirname, "../test"),
		],
	}
);
