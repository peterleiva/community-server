import { PostFactory, UserFactory } from "factory";
import { databaseSetup } from "utils";
import type { PostDocument } from "../post";
import { UserModel } from "modules/user";

databaseSetup();

describe("Post", () => {
	let post: PostDocument;

	beforeEach(async () => {
		post = await PostFactory.create();
	});

	it("can't change its author", async () => {
		const author = await UserFactory.create();
		post.author = author._id;

		await post.save();

		expect(post.author._id).not.toBe(author._id);
	});

	it("auto-populate author", async () => {
		const post = await PostFactory.create();

		expect(post.author).toBeInstanceOf(UserModel);
	});

	it("users can like once", async () => {
		const user = await UserFactory.create();

		post.likedBy.push(user._id);
		await post.save();

		post.likedBy.push(user._id);

		await expect(post.validate("likedBy")).rejects.toThrow(
			/array must have unique values/
		);
	});

	it("user can like different posts", async () => {
		const user = await UserFactory.create();
		post.likedBy.push(user.id);
		await post.save();

		const post2 = await PostFactory.create();
		post2.likedBy.push(user.id);

		await expect(post2.save()).not.toReject();
	});

	it.todo("children can't have cyclic dependency");

	describe("#likes", () => {
		it("gives 0 when no one liked", () => {
			expect(post.likes).toBe(0);
		});

		it("gives the number of users who liked", async () => {
			const likes = 10;
			const post = await PostFactory.withLikes(likes);

			expect(post.likes).toBe(likes);
		});
	});
});
