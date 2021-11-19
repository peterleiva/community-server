import { model, Schema, Types } from "mongoose";
import type { Timestamps } from "../types";

/**
 * Represents an post starter
 */
export interface Thread extends Timestamps {
	id: string;
	title: string;
	op: Types.ObjectId;
}

const threadSchema = new Schema<Thread>(
	{
		title: {
			type: String,
			required: true,
			unique: true,
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

export const ThreadModel = model("Thread", threadSchema);
