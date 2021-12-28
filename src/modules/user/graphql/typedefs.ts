import { gql } from "apollo-server-core";
import type { Node } from "modules/connection";
import type { User } from "../schema";

export interface UserType extends Omit<User, "avatar">, Node {
	avatar: string;
}

export const typeDefs = gql`
	"""
	An __Avatar__ (also known as a profile picture or userpic) is a graphical
	representation of a user or the user's character or persona.
	"""
	scalar Avatar

	"""
	Refers to utilizers of the system. At first people can initiate an
	*original post (OP)*, beginning a topic or just join a conversation through
	posting in the threads. Users in this system are used to provide customized
	experience in the application. They aren't tracked in any form
	"""
	type User implements Node & Timestamps {
		"user identifier"
		id: ID!
		"user names"
		name: Naming!
		"user avatar, a image representing its persona"
		avatar: Avatar
		"creation date and time"
		createdAt: DateTime!
		"last update date and time"
		updatedAt: DateTime!
	}

	"""
	Naming is a way to calling users. Community users must have a nickname but
	not necessary it has first or last names specified
	"""
	type Naming {
		"user first name"
		first: String
		"user last name"
		last: String
		"user nickname"
		nick: String!
	}
`;
