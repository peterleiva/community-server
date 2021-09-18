import { VariableValues } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { format } from "util";

function formatVariablesMessage(variables: VariableValues | undefined) {
	if (!variables) return "";

	let message = "\nvariables:\n{\n";

	for (const variable in variables) {
		message += `  ${variable}: "${variables[variable]}"\n`;
	}

	message += "}";

	return message;
}

const loggingPlugin: ApolloServerPlugin = {
	async serverWillStart({ logger }) {
		logger.debug("Apollo is starting");
	},

	async requestDidStart({ logger }) {
		// logger.info(
		// 	`Received ${operation?.operation ?? "Operation"}:\n${
		// 		request.query
		// 	}${formatVariablesMessage(request.variables)}`
		// );

		return {
			// Fires whenever Apollo Server will parse a GraphQL
			// request to create its associated document AST.
			// async parsingDidStart(requestContext) {
			// 	logger.info("Parsing started!");
			// },

			// Fires whenever Apollo Server will validate a
			// request's document AST against your GraphQL schema.
			// async validationDidStart(requestContext) {
			// 	logger.info("Validation started!");
			// },

			async didEncounterErrors({ errors }) {
				let message = "GraphQL received the following error(s):\n";

				for (const error of errors) {
					message += `${error}\n`;
				}

				logger.error(message);
			},

			async willSendResponse({ response }) {
				response.http;
			},

			async didResolveOperation({
				request,
				operationName,
				operation: { operation },
			}) {
				const op = format("%s %s", operation, operationName);

				logger.info(
					`Received ${op}:\n${request.query}${formatVariablesMessage(
						request.variables
					)}`
				);
			},
		};
	},
};

export default loggingPlugin;
