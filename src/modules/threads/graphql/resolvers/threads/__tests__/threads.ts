import type { GraphQLResolveInfo } from "graphql";
import type { PageArgs } from "modules/connection";
import { ThreadFactory } from "test/factory";
import { databaseSetup } from "test/utils";
import { NonNegativeArgument } from "lib";
import { threads } from "../threads";

databaseSetup();

describe("threads resolver", () => {
	const args: PageArgs = {};
	const threadsArgs: [null, PageArgs, null, GraphQLResolveInfo] = [
		null,
		args,
		null,
		{} as GraphQLResolveInfo,
	];

	test("empty array when no thread is stored", async () => {
		const result = await threads(...threadsArgs);

		expect(result).toHaveEmptyEdges();
	});

	test("threads are ordered by creation date", async () => {
		const docs = await ThreadFactory.createList(5);
		const result = await threads(...threadsArgs);

		expect(result.edges.map(edge => edge.node._id)).toEqual(
			docs
				.sort((a, b) => {
					return b.createdAt.getTime() - a.createdAt.getTime();
				})
				.map(doc => doc._id)
		);
	});

	describe("Paginating", () => {
		describe("no args", () => {
			test("first page with full 20 threads", async () => {
				await ThreadFactory.createList(21);
				await expect(threads(...threadsArgs)).resolves.toBeEdgesOfSize(20);
			});

			test("all threads when less than 20 threads", async () => {
				await ThreadFactory.createList(10);
				await expect(threads(...threadsArgs)).resolves.toBeEdgesOfSize(10);
			});
		});

		describe("with args", () => {
			describe("Slicing pages", () => {
				test("slice threads with after argument", async () => {
					const threadDocs = (await ThreadFactory.createList(2)).sort(
						(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
					);

					args.page = {
						after: threadDocs[0].createdAt,
					};

					const result = await threads(...threadsArgs);
					expect(result).toMatchNodes([threadDocs[1]._id]);
				});

				test("skip first page", async () => {
					const threadDocs = (await ThreadFactory.createList(21)).sort(
						(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
					);

					args.page = {
						after: threadDocs[19].createdAt,
					};

					const result = await threads(...threadsArgs);
					expect(result.edges.map(edge => edge.node._id)).toStrictEqual([
						threadDocs[20]._id,
					]);
				});

				test("skip until last page", async () => {
					await ThreadFactory.createList(6);

					args.page = {
						first: 4,
					};

					const result = await threads(...threadsArgs);

					expect(result).toBeEdgesOfSize(4);

					args.page = {
						after: result.edges[result.edges.length - 1].node.createdAt,
					};

					await expect(threads(...threadsArgs)).resolves.toBeEdgesOfSize(2);
				});

				test("empty result after last thread", async () => {
					const after = Math.min(
						...(await ThreadFactory.createList(4)).map(t =>
							t.createdAt.getTime()
						)
					);

					args.page = {
						after: new Date(after),
					};

					await expect(threads(...threadsArgs)).resolves.toHaveEmptyEdges();
				});

				test("first page when after cursor is now date", async () => {
					await ThreadFactory.create();

					args.page = {
						after: new Date(),
					};

					await expect(threads(...threadsArgs)).resolves.toBeEdgesOfSize(1);
				});
			});

			describe("Limiting Page size", () => {
				test("limit threads with first argument", async () => {
					args.page = {
						first: 4,
					};

					const threadDocs = (await ThreadFactory.createList(5)).sort(
						(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
					);

					const result = await threads(...threadsArgs);

					expect(result).toBeEdgesOfSize(4);
					expect(result).toMatchNodes(threadDocs.slice(0, 4).map(t => t._id));
				});

				test("negative limit throws NonNegativeArgument", async () => {
					args.page = {
						first: -1,
					};

					await expect(threads(...threadsArgs)).rejects.toThrowError(
						NonNegativeArgument
					);
				});

				test("zero limit returns empty page", async () => {
					args.page = {
						first: 0,
					};

					await expect(threads(...threadsArgs)).resolves.toHaveEmptyEdges();
				});

				test("limit page by avaliable threads", async () => {
					args.page = {
						first: 2,
					};

					await ThreadFactory.create();
					await expect(threads(...threadsArgs)).resolves.toBeEdgesOfSize(1);
				});

				test("limit last page by avaliable remaining threads", async () => {
					const threadDocs = (await ThreadFactory.createList(3)).sort(
						(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
					);

					args.page = {
						first: 2,
						after: threadDocs[1].createdAt,
					};

					const result = await threads(...threadsArgs);

					expect(result).toBeEdgesOfSize(1);
					expect(result).toMatchNodes([threadDocs[2]._id]);
				});
			});
		});
	});
});
