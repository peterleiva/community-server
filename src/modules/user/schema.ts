import { Schema } from "mongoose";
import type { Timestamps } from "modules/types";

interface Naming {
	first?: string;
	last?: string;
	nick: string;
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

interface Avatar {
	digest: string;
	binImage: Buffer;
}

const avatarSchema = new Schema({
	digest: {
		type: String,
		required: true,
		unique: true,
	},

	binImage: {
		type: Buffer,
		required: true,
	},
});

export interface User extends Timestamps {
	name: Naming;
	avatar: Avatar;
}

export const schema = new Schema<User>(
	{
		name: {
			type: namingSchema,
			required: true,
		},

		avatar: {
			type: avatarSchema,
			required: true,
		},
	},

	{ timestamps: true }
);
