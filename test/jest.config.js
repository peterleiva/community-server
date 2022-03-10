/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = Object.assign(
	{},
	require("./jest-common"),
	require("./jest-typescript")(),
	{
		name: "app",
		displayName: {
			name: "Unit & Integration",
			color: "magenta",
		},
	}
);
