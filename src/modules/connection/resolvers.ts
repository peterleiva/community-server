import { GraphQLScalarType, type ValueNode, Kind } from "graphql";
import type { Cursor as ICursor } from "./types";
import { SerializableError } from "./errors";

const parseValue = (value: string): ICursor =>
	new Date(+Buffer.from(value, "base64"));

const Cursor = new GraphQLScalarType({
	name: "Cursor",
	description:
		"The Cursor is an opaque string in base64 encoding used by " +
		"connection pattern to navigate between pages",

	serialize(value: ICursor) {
		try {
			const serialized = JSON.stringify(value.getTime());
			return Buffer.from(serialized).toString("base64");
		} catch {
			throw new SerializableError();
		}
	},

	parseValue,

	parseLiteral(ast: ValueNode) {
		if (ast.kind === Kind.STRING) {
			return parseValue(ast.value);
		}

		return null;
	},
});

export const resolvers = {
	Cursor,
};
