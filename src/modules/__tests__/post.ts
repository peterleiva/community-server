import { PostFactory } from "factory";
import { databaseSetup } from "utils";

databaseSetup();

describe("Post", () => {
	it("creates post", async () => {
		await expect(PostFactory.create()).toResolve();
	});

	it.todo("can't change its author");
	it.todo("auto-populate author");
	it.todo("users can like once");
	it.todo("message can have at most 10.000 characters");
	it.todo("message can have at least 10 characters");

	it.todo("children can't have cyclic dependency");

	describe("#likes", () => {
		it.todo("gives 0 when no one liked");
		it.todo("gives the number of users who liked");
	});
});
