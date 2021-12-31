import { shouldBehavesLike } from "..";
import { Resolver, Factory } from "./types";

export default function shouldBehavesLikeSliceable(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("sliceable", () => {
		// describe("Slicing pages", () => {
		// 	test("slice threads with after argument", async () => {
		// 		const threadDocs = (await ThreadFactory.createList(2)).sort(
		// 			(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
		// 		);
		// 		args.page = {
		// 			after: threadDocs[0].createdAt,
		// 		};
		// 		const result = await threads(...threadsArgs);
		// 		expect(result).toMatchNodes([threadDocs[1]._id]);
		// 	});
		// 	test("skip first page", async () => {
		// 		const threadDocs = (await ThreadFactory.createList(21)).sort(
		// 			(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
		// 		);
		// 		args.page = {
		// 			after: threadDocs[19].createdAt,
		// 		};
		// 		const result = await threads(...threadsArgs);
		// 		expect(result.edges.map(edge => edge.node._id)).toStrictEqual([
		// 			threadDocs[20]._id,
		// 		]);
		// 	});
		// 	test("skip until last page", async () => {
		// 		const edges = await factory(6);
		// 		await expect(resolver({ page: { first: 4 } })).toBeEdgesOfSize(4);
		// 		await expect(
		// 			resolver({ page: { after: edges[3].cursor } })
		// 		).resolves.toBeEdgesOfSize(2);
		// 	});
		// 	test("empty result after last thread", async () => {
		// 		const after = Math.min(
		// 			...(await ThreadFactory.createList(4)).map(t =>
		// 				t.createdAt.getTime()
		// 			)
		// 		);
		// 		args.page = {
		// 			after: new Date(after),
		// 		};
		// 		await expect(threads(...threadsArgs)).resolves.toHaveEmptyEdges();
		// 	});
		// 	test("first page when after cursor is now date", async () => {
		// 		await ThreadFactory.create();
		// 		args.page = {
		// 			after: new Date(),
		// 		};
		// 		await expect(threads(...threadsArgs)).resolves.toBeEdgesOfSize(1);
		// 	});
		// });
	});
}
