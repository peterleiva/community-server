import { HydratedDocument, model, Schema, Types } from "mongoose";
import type { Timestamps } from "../types";

/**
 * Represents an post starter
 */
export interface Thread extends Timestamps {
	title: string;
	op: Types.ObjectId;
}

export type ThreadDocument = HydratedDocument<Thread>;

const threadSchema = new Schema<Thread>(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			minLength: 2,
			maxLength: 150,
			immutable: true,
		},
		op: {
			type: "ObjectId",
			ref: "Post",
			required: true,
			unique: true,
			immutable: true,
		},
	},
	{ timestamps: true }
);

threadSchema.index({ createdAt: -1 });

export const ThreadModel = model("Thread", threadSchema);
