import { gql } from "apollo-server-core";

export const typeDefs = gql`
	"""
	The __Cursor__ is an opaque string used to navigate between pages,
	according to [__GraphQL Cursor Connections Specification__
	](https://relay.dev/graphql/connections.htm#sec-Cursor)
	"""
	scalar Cursor

	"Regular node which is returned by Edge type, it must have at least ID type"
	interface Node {
		id: ID!
	}

	"""
	The concept of an [*edge*
	](https://relay.dev/graphql/connections.htm#sec-Edge-Types) also proves
	useful if there is information that is specific to the edge, rather than to
	one node, which means information about a connection instance.
	"""
	interface Edge {
		"Opaque cursor used to navigate through pages"
		cursor: Cursor!
		"""
		This field must return either a Scalar, Enum, Object, Interface, Union, or
		a Non-Null wrapper around one of those types. Notably, this field cannot
		return a list.
		"""
		node: Node!
	}

	"""
	*Connection* is in compliance with
	[*GraphQL Cursor Connections Specification*
	](https://relay.dev/graphql/connections.htm#sec-Connection-Types)
	to consistenly handle pagination best practices with support for slicing
	and *metadata* about the
	connection itself
	"""
	interface Connection {
		"relationship between two node on the graph"
		edges: [Edge!]!
		"additional information about the connection itself"
		pageInfo: PageInfo!
	}

	"""
	[**PageInfo**
	](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo)
	is metadata information about **Connection** used to navigate providing
	intel about more previous or next pages. For example, *endCursor* can be used
	in to forwarding pagination argument
	"""
	type PageInfo {
		"""
		indicate whether more edges exist following the set defined by the clients
		arguments
		"""
		hasNextPage: Boolean!
		"""
		indicate whether more edges exist prior to the set defined by the clients
		arguments
		"""
		hasPreviousPage: Boolean!
		"corresponds the last node, also known as the first connection's edge"
		startCursor: Cursor!
		"corresponds the last node, also known as the last connection's edge"
		endCursor: Cursor!
	}

	"""
	Enable forward pagination, slicing can be done with *first*. The *after* is a
	opaque cursor returned by **pageInfo**'s **endCursor** node
	"""
	input ForwardPageInput {
		"at most first edges"
		first: NonNegativeInt
		"number of the page or edges after this cursor"
		after: Cursor
	}

	"""
	Enable backward pagination, slicing can be done with *last*. The *before* is a
	opaque cursor returned by *pageInfo*'s *startCursor* node
	"""
	input BackwardPageInput {
		"at most last edges"
		last: NonNegativeInt
		"number of the page or last edges before this cursor"
		before: Cursor
	}
	"""
	Enable forward and backward pagination, slicing can be done with *first*
	and *last*. Opaque cursor is defined by *after* and *before* returned by
	**pageInfo**'s **endCursor** and *startCursor* node respectively.
	"""
	input PageInput {
		"at most first edges"
		first: NonNegativeInt
		"number of the page or edges after this cursor"
		after: Cursor
		"at most last edges"
		last: NonNegativeInt
		"number of the page or last edges before this cursor"
		before: Cursor
	}
`;
