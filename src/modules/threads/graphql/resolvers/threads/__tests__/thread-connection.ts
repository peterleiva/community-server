import { GraphQLResolveInfo } from "graphql";
import { ThreadFactory } from "test/factory";
import { databaseSetup } from "test/utils";
import { total, threads as resolver } from "../threads";
import { ThreadDocument } from "modules/threads";

databaseSetup();

describe("thread connection resolver", () => {
	describe("total resolver", () => {
		test("total is 0 when no threads", async () => {
			await expect(
				total(null, {}, null, {} as GraphQLResolveInfo)
			).resolves.toBe(0);
		});

		test("total is amount of threads stored", async () => {
			const length = 11;
			await ThreadFactory.createList(length);

			await expect(
				total(null, {}, null, {} as GraphQLResolveInfo)
			).resolves.toBe(length);
		});
	});

	describe("edges resolver", () => {
		test("edges gives node and cursor for each thread", async () => {
			const threads = await ThreadFactory.createList(4);
			const sortedThreads = threads.sort(
				(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
			);

			await expect(
				resolver(null, {}, null, {} as GraphQLResolveInfo)
			).resolves.toMatchObject({
				edges: sortedThreads.map(t => ({ cursor: t.createdAt, node: t._id })),
			});
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
					resolver(null, {}, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					pageInfo: {
						hasPreviousPage: false,
					},
				});
			});

			test("hasPreviousPage is true when has newest thread", async () => {
				await expect(
					resolver(
						null,
						{ page: { after: threads[2].createdAt } },
						null,
						{} as GraphQLResolveInfo
					)
				).resolves.toMatchObject({
					pageInfo: {
						hasPreviousPage: true,
					},
				});
			});

			test("hasNextPage is false when oldest thread", async () => {
				await expect(
					resolver(null, {}, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					pageInfo: {
						hasNextPage: false,
					},
				});
			});

			test("hasNextPage is true when has next page", async () => {
				await expect(
					resolver(null, { page: { first: 4 } }, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					pageInfo: {
						hasNextPage: true,
					},
				});
			});

			test("cursors is first and last thread from collection", async () => {
				await expect(
					resolver(null, {}, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					pageInfo: {
						startCursor: threads[0].createdAt,
						endCursor: threads[threads.length - 1].createdAt,
					},
				});
			});
		});

		describe("threads collection is empty", () => {
			test("hasPreviousPage and hasNextPage is false", async () => {
				await expect(
					resolver(null, {}, null, {} as GraphQLResolveInfo)
				).resolves.toMatchObject({
					pageInfo: {
						hasPreviousPage: false,
						hasNextPage: false,
					},
				});
			});

			test.todo("startCursor is");
		});
	});
});
