import type { GraphQLResolveInfo } from "graphql";
import { ThreadFactory, PostFactory } from "factory";
import { post } from "../thread";
import { databaseSetup } from "utils";

databaseSetup();

describe("Thread Type resolvers", () => {
	describe("post", () => {
		test("return all thread's original post", async () => {
			const op = await PostFactory.create();
			const thread = await ThreadFactory.create(
				{},
				{ associations: { op: op._id } }
			);

			await expect(
				post(thread, null, null, {} as GraphQLResolveInfo)
			).resolves.toMatchObject(op);
		});

		test.todo("test B");
	});
});
