import { Factory } from "fishery";
import casual from "casual";
import { ThreadDocument, Thread, ThreadModel } from "modules/threads";
import PostFactory from "./post";
import { PostDocument } from "modules/post";
import type { UserDocument } from "modules/user";

interface ThreadTransientParams {
	replies: number;
	replyAuthor: UserDocument;
	author: UserDocument;
}

type ThreadData = Partial<Thread>;

export default Factory.define<
	ThreadData,
	ThreadTransientParams,
	ThreadDocument
>(({ onCreate, transientParams, associations }) => {
	onCreate(async thread => {
		const { replies = 0, author, replyAuthor } = transientParams;
		const op =
			thread?.op ??
			(
				await PostFactory.create(
					{},
					{
						associations: { author: author?._id },
					}
				)
			)?._id;

		const doc = new ThreadModel({ ...thread, op });

		if (replies > 0) {
			const [thread, posts] = await Promise.all([
				doc.populate<{ op: PostDocument }>("op"),
				PostFactory.createList(
					replies,
					{},
					{ associations: { author: replyAuthor?._id } }
				),
			]);

			thread.op.children.push(...posts.map(post => post._id));
			await thread.op.save();
		}

		await doc.save();

		return doc;
	});

	const thread: Partial<Thread> = {
		title: casual.title,
		op: associations?.op,
	};

	return thread;
});
