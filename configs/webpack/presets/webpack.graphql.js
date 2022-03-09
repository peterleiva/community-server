/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
	module: {
		rules: [
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader",
			},
		],
	},
};
