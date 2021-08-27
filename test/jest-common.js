const { resolve } = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	rootDir: "../",
	preset: "@shelf/jest-mongodb",
	roots: ["<rootDir>/test", "<rootDir>/src"],
	moduleDirectories: [
		"node_modules",
		resolve(__dirname),
		resolve(__dirname, "../src"),
	],
	setupFilesAfterEnv: ["jest-extended"],
};
