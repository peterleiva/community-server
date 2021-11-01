import { model, Schema, Types } from "mongoose";
import { Timestamps } from "./types";

export interface Thread extends Timestamps {
	title: string;
	op: Types.ObjectId;
}

const ThreadSchema = new Schema<Thread>(
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

export const ThreadModel = model("Thread", ThreadSchema);
