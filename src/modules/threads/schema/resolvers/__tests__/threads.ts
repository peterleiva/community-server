import type { GraphQLResolveInfo } from "graphql";
import type { PageArgs } from "lib/connection/types";
import { ThreadFactory } from "factory";
import { NonNegativeArgument } from "lib";
import { databaseSetup } from "utils";
import threads from "../threads";

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

	describe("Paginating", () => {
		describe("no args", () => {
			test("first page with full 20 threads", async () => {
				await ThreadFactory.createList(21);
				await expect(threads(...threadsArgs)).resolves.toHaveLength(20);
			});

			test("all threads when less than 20 threads", async () => {
				await ThreadFactory.createList(10);
				await expect(threads(...threadsArgs)).resolves.toHaveLength(10);
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
					expect(result.map(t => t._id)).toStrictEqual([threadDocs[1]._id]);
				});

				test("skip first page", async () => {
					const threadDocs = (await ThreadFactory.createList(21)).sort(
						(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
					);

					args.page = {
						after: threadDocs[19].createdAt,
					};

					const result = await threads(...threadsArgs);
					expect(result.map(t => t._id)).toStrictEqual([threadDocs[20]._id]);
				});

				test("skip until last page", async () => {
					await ThreadFactory.createList(6);

					args.page = {
						first: 4,
					};

					const result = await threads(...threadsArgs);

					expect(result).toHaveLength(4);

					args.page = {
						after: result[result.length - 1].createdAt,
					};

					await expect(threads(...threadsArgs)).resolves.toHaveLength(2);
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

					await expect(threads(...threadsArgs)).resolves.toHaveLength(0);
				});

				test("first page when after cursor is now date", async () => {
					await ThreadFactory.create();

					args.page = {
						after: new Date(),
					};

					await expect(threads(...threadsArgs)).resolves.toHaveLength(1);
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

					expect(result).toHaveLength(4);
					expect(result.map(t => t._id)).toStrictEqual(
						threadDocs.slice(0, 4).map(t => t._id)
					);
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

					await expect(threads(...threadsArgs)).resolves.toBeEmpty();
				});

				test("limit page by avaliable threads", async () => {
					args.page = {
						first: 2,
					};

					await ThreadFactory.create();
					await expect(threads(...threadsArgs)).resolves.toHaveLength(1);
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

					expect(result).toHaveLength(1);
					expect(result.map(t => t._id)).toStrictEqual([threadDocs[2]._id]);
				});
			});
		});
	});
});
