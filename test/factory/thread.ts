import { Factory } from "fishery";
import casual from "casual";
import { ThreadDocument, Thread, ThreadModel } from "modules/threads";
import PostFactory from "./post";
import { PostDocument } from "modules/post";

interface ThreadTransientParams {
	replies: number;
}

export default Factory.define<
	Partial<Thread>,
	ThreadTransientParams,
	ThreadDocument
>(({ onCreate, transientParams, associations }) => {
	onCreate(async thread => {
		const op = associations?.op ?? (await PostFactory.create())?._id;
		const threadDoc = new ThreadModel({ ...thread, op });
		const withReplies = transientParams?.replies ?? 0;

		if (withReplies > 0) {
			const thread = await threadDoc.populate<{ op: PostDocument }>("op");
			const posts = await PostFactory.createList(withReplies);
			thread.op.children.push(...posts.map(p => p._id));
			await thread.op.save();
		}

		await threadDoc.save();

		return threadDoc;
	});

	const thread: Partial<Thread> = {
		title: casual.title,
	};

	if (associations?.op) {
		thread.op = associations.op;
	}

	return thread;
});
