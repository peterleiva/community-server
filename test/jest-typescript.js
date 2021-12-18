const { resolve } = require("path");
const { defaults: tsjPreset } = require("ts-jest/presets");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = function (tsconfig = resolve(__dirname, "../tsconfig.json")) {
	return {
		transform: {
			...tsjPreset.transform,
		},
		globals: {
			"ts-jest": {
				tsconfig,
			},
		},

		moduleDirectories: [
			"node_modules",
			resolve(__dirname, ".."),
			resolve(__dirname, "../src"),
		],
	};
};
