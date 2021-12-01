import { ThreadFactory } from "factory";
import { GraphQLResolveInfo } from "graphql";
import { databaseSetup } from "utils";
import { total, edges, pageInfo } from "../thread-connection";
import { ThreadDocument } from "modules/threads";

databaseSetup();

describe("thread connection resolver", () => {
	describe("total resolver", () => {
		test("total is 0 when no threads", async () => {
			await expect(
				total(null, null, null, {} as GraphQLResolveInfo)
			).resolves.toBe(0);
		});

		test("total is amount of threads stored", async () => {
			const length = 11;
			await ThreadFactory.createList(length);

			await expect(
				total(null, null, null, {} as GraphQLResolveInfo)
			).resolves.toBe(length);
		});
	});

	describe("edges resolver", () => {
		test("edges gives node and cursor for each thread", async () => {
			const threads = await ThreadFactory.createList(4);

			expect(
				edges(threads, null, null, {} as GraphQLResolveInfo)
			).toStrictEqual(threads.map(t => ({ cursor: t.createdAt, node: t })));
		});
	});

	describe("pageInfo resolver", () => {
		describe("threads collection is not empty", () => {
			let threads: ThreadDocument[];

			beforeEach(async () => {
				threads = (await ThreadFactory.createList(10)).sort(
					(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
				);
			});

			test("hasPreviousPage is false when first page", async () => {
				await expect(
					pageInfo(threads, null, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					hasPreviousPage: false,
				});
			});

			test("hasPreviousPage is true when has newest thread", async () => {
				await expect(
					pageInfo(threads.slice(4), null, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					hasPreviousPage: true,
				});
			});

			test("hasNextPage is false when oldest thread", async () => {
				await expect(
					pageInfo(threads, null, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					hasNextPage: false,
				});
			});

			test("hasNextPage is true when has next page", async () => {
				await expect(
					pageInfo(threads.slice(0, 4), null, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					hasNextPage: true,
				});
			});

			test("cursors is first and last thread from collection", async () => {
				await expect(
					pageInfo(threads, null, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					startCursor: threads[0].createdAt,
					endCursor: threads[threads.length - 1].createdAt,
				});
			});
		});

		describe("threads collection is empty", () => {
			test("hasPreviousPage and hasNextPage is false", async () => {
				await expect(
					pageInfo([], null, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					hasPreviousPage: false,
					hasNextPage: false,
				});
			});

			test.todo("startCursor is");
		});
	});
});
