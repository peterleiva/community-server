import { ThreadFactory } from "factory";
import { GraphQLResolveInfo } from "graphql";
import { PageArgs } from "lib/connection/types";
import { databaseSetup } from "utils";
import threads from "../threads";

databaseSetup();

describe("threads resolver", () => {
	const args = {};
	const threadsArgs: [null, PageArgs, null, GraphQLResolveInfo] = [
		null,
		args,
		null,
		{} as GraphQLResolveInfo,
	];

	test("empty array when no thread is stored", async () => {
		const result = await threads(...threadsArgs);

		expect(result).toBeEmpty();
	});

	test("threads are ordered by creation date", async () => {
		const docs = await ThreadFactory.createList(5);
		const result = await threads(...threadsArgs);

		expect(result.map(r => r._id)).toEqual(
			docs
				.sort((a, b) => {
					return b.createdAt.getTime() - a.createdAt.getTime();
				})
				.map(doc => doc._id)
		);
	});

	describe("Pagination", () => {
		describe("no args", () => {
			test("latest 20 threads", async () => {
				await ThreadFactory.createList(21);
				const result = await threads(...threadsArgs);

				expect(result).toHaveLength(20);
			});

			test("all threads when less than 20 threads is stored", async () => {
				await ThreadFactory.createList(10);

				const result = await threads(...threadsArgs);
				expect(result).toHaveLength(10);
			});
		});

		describe("with args", () => {
			test.todo("last page returns remaining threads");
			test.todo("limit threads by first argument");
			test.todo("slice threads by after argument");
			test.todo("gets empty page when no threads left after argument");
		});
	});
});
