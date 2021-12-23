import type { IResolvers } from "@graphql-tools/utils";
import casual from "casual";
import { URL } from "url";
import { Avatar } from "modules/types";
import { mocks as connectionMocks } from "modules/connection";

export const mocks: IResolvers = {
	...connectionMocks,
	Avatar: (): Avatar => "" + new URL(casual.url + casual.title + ".jpg"),
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
