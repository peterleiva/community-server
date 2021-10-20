import casual from "casual";
import { Types } from "mongoose";
import { URL } from "url";
import { log, Connection } from "lib";
import type { IMockStore, Ref } from "@graphql-tools/mock";

export const mocks = {
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

export const resolvers = (store: IMockStore) => {
	return {
		Thread: {
			participants(
				threadRef: Ref,
				{ page: { first, after } }: { page: Connection.ForwardPagination }
			) {
				const userConnectionRef = store.get(threadRef, "participants", "edges");

				log.info("first: %d; after: %s", first, after);
				log.info("connection: %O", userConnectionRef);

				return userConnectionRef;
			},
		},
	};
};
