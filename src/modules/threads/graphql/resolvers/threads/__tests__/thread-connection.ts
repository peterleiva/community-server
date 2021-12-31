import { GraphQLResolveInfo } from "graphql";
import { ThreadFactory } from "test/factory";
import { databaseSetup } from "test/utils";
import {
	shouldBehavesLikeConnection,
	shouldBehavesLikePaginable,
} from "test/shared";
import { total, threads as resolver } from "../resolvers";
import { ThreadDocument } from "modules/threads";

databaseSetup();

describe("thread connection resolver", () => {
	shouldBehavesLikeConnection(() =>
		resolver(null, {}, null, {} as GraphQLResolveInfo)
	);

	shouldBehavesLikePaginable(
		async size =>
			(await ThreadFactory.createList(size))
				.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
				.map(t => ({ node: t, cursor: t.createdAt })),

		async page => {
			const result = await resolver(
				null,
				page ?? {},
				null,
				{} as GraphQLResolveInfo
			);

			return result;
		}
	);

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

	test.todo("edges are sorted by creation time desc");

	describe("edges resolver", () => {
		test("edges gives node and cursor for each thread", async () => {
			const threads = await ThreadFactory.createList(4);
			const sortedThreads = threads.sort(
				(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
			);

			await expect(
				resolver(null, {}, null, {} as GraphQLResolveInfo)
			).resolves.toMatchEdges(
				sortedThreads.map(t => ({ cursor: t.createdAt, node: t._id }))
			);
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

			test("cursors is first and last thread from collection", async () => {
				await expect(
					resolver(null, {}, null, {} as GraphQLResolveInfo)
				).resolves.toMatchPageInfo({
					startCursor: threads[0].createdAt,
					endCursor: threads[threads.length - 1].createdAt,
				});
			});
		});
	});
});
