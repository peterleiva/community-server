import { Post, PostModel } from "modules/post";
import casual from "casual";
import { Factory } from "fishery";
import UserFactory from "./user";

type PostData = Partial<Post>;

export default Factory.define<PostData, never, Post>(
	({ onCreate, associations }) => {
		onCreate(async post => {
			const postDoc = new PostModel(post);
			const user = associations?.author ?? (await UserFactory.create())._id;

			postDoc.author = user;
			await postDoc.save();

			return postDoc;
		});

		const post = {
			author: associations?.author,
			message: casual.text,
		};

		return post;
	}
);
