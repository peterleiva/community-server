import type { Connection, Node } from "modules/connection";
import type { PostType } from "modules/resolvers";
import type { UserType } from "modules/user/graphql";
import type { Thread } from "../thread";

export interface ThreadConnection extends Connection<ThreadType> {
	total: number;
}
export interface ThreadType extends Node, Omit<Thread, "op"> {
	post: PostType;
	lastActivity: Date;
	replies: number;
	participants: ParticipantsConnection;
}

export interface ParticipantsConnection extends Connection<UserType> {
	interactions: number;
}
