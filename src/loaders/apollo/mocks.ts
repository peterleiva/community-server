import casual from "casual";
import { Types } from "mongoose";
import { URL } from "url";
import { Connection } from "lib";
import type { IResolvers } from "@graphql-tools/utils";

export const mocks: IResolvers = {
	Cursor: (): Connection.Cursor => new Types.ObjectId().id.toString("base64"),
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
