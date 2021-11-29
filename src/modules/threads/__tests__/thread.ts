import { PostFactory, ThreadFactory } from "factory";
import { databaseSetup } from "utils";
import { ThreadDocument } from "../thread";

databaseSetup();

describe("Thread", () => {
	let thread: ThreadDocument;

	beforeEach(async () => {
		thread = await ThreadFactory.create();
	});

	test("title is immutable", async () => {
		const title = "another title";
		thread.title = title;
		await thread.save();

		expect(thread.title).not.toEqual(title);
	});

	test.todo("title is unique");

	test("original post is immutable", async () => {
		const post = await PostFactory.create();

		thread.op = post._id;

		await thread.save();
		expect(thread.op).not.toEqual(post._id);
	});
});
