import { Post, PostModel, PostDocument } from "modules/post";
import casual from "casual";
import { Factory } from "fishery";
import UserFactory from "./user";

type PostData = Partial<Post>;

interface PostTransientParams {
	withLikes: number;
}

class PostFactory extends Factory<PostData, PostTransientParams, PostDocument> {
	async withLikes(likes: number): Promise<PostDocument> {
		return await this.transient({ withLikes: likes }).create();
	}
}

export default PostFactory.define(
	({ onCreate, associations, transientParams: { withLikes } }) => {
		onCreate(async post => {
			const postDoc = new PostModel(post);
			const user = associations?.author ?? (await UserFactory.create())._id;

			if (withLikes) {
				const users = await UserFactory.createList(Math.max(0, withLikes));
				postDoc.likedBy = users.map(user => user._id);
			}

			postDoc.children.push(...(associations.children ?? []));
			postDoc.author = user;

			await postDoc.save();

			return postDoc;
		});

		const post: PostData = {
			message: casual.text,
			children: [],
		};

		if (associations?.author) {
			post.author = associations.author;
		}

		return post;
	}
);
