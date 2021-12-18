const { resolve } = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = Object.assign(
	{},
	require("../test/jest-common"),
	require("../test/jest-typescript")(),
	{
		roots: ["<rootDir>/e2e", "<rootDir>/test"],
		name: "e2e",
		displayName: {
			name: "E2E",
			color: "blue",
		},

		testMatch: [
			"**/__tests__/**/*.[jt]s?(x)",
			"**/?(*.)+(spec|test).[jt]s?(x)",
			resolve(__dirname, "**/*.ts"),
		],
	}
);
