import { Factory } from "fishery";
import casual from "casual";
import { ThreadDocument, Thread, ThreadModel } from "modules/threads";
import PostFactory from "./post";

export default Factory.define<Partial<Thread>, never, ThreadDocument>(
	({ onCreate, associations }) => {
		onCreate(async thread => {
			const op = associations?.op ?? (await PostFactory.create())?._id;
			const threadDoc = new ThreadModel({ ...thread, op });

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
	}
);
