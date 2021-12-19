import type { IResolvers } from "@graphql-tools/utils";
import casual from "casual";
import { URL } from "url";
import { Connection } from "lib";

export const mocks: IResolvers = {
	Cursor: (): Connection.Cursor => new Date(),
	Avatar: (): Connection.Avatar =>
		"" + new URL(casual.url + casual.title + ".jpg"),
	User: () => ({
		name: () => ({
			first: casual.first_name,
			last: casual.last_name,
			nick: casual.username,
		}),
	}),

	Thread: () => ({
		title: () => casual.title,
	}),

	Post: () => ({
		message: () => casual.text,
	}),
};
