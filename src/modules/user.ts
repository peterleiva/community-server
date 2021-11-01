import { Schema, model } from "mongoose";
import type { Timestamps } from "./types";

interface Naming {
	first?: string;
	last?: string;
	nick: string;
}

export interface User extends Timestamps {
	name: Naming;
	avatar?: Buffer;
}

const namingSchema = new Schema<Naming>({
	first: {
		type: String,
		trim: true,
		minLength: 2,
		maxLength: 30,
	},
	last: {
		type: String,
		trim: true,
		minLength: 2,
		maxLength: 30,
	},
	nick: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minLength: 2,
		maxLength: 25,
		lowercase: true,
	},
});

const schema = new Schema<User>(
	{
		name: {
			type: namingSchema,
			required: true,
		},
		avatar: Buffer,
	},
	{ timestamps: true }
);

export const UserModel = model<User>("User", schema);
