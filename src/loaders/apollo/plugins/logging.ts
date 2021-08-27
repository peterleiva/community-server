import { ApolloServerPlugin } from "apollo-server-plugin-base";

const loggingPlugin: ApolloServerPlugin = {
	// Fires whenever a GraphQL request is received from a client.
	async requestDidStart({ logger, request }) {
		logger.info("Request started! Query:\n" + request.query);

		return {
			// Fires whenever Apollo Server will parse a GraphQL
			// request to create its associated document AST.
			async parsingDidStart(requestContext) {
				logger.info("Parsing started!");
			},

			// Fires whenever Apollo Server will validate a
			// request's document AST against your GraphQL schema.
			async validationDidStart(requestContext) {
				logger.info("Validation started!");
			},

			async didEncounterErrors({ errors }) {
				let message = "GraphQL received the following error(s):\n";

				for (const error of errors) {
					message += `${error}\n`;
				}

				logger.error(message);
			},
		};
	},
};

export default loggingPlugin;
