import { gql } from "apollo-server-core";

const typedef = gql`
	"""
	An __Avatar__ (also known as a profile picture or userpic) is a graphical
	representation of a user or the user's character or persona.
	"""
	scalar Avatar

	"""
	The __Cursor__ is an opaque string used to navigate between pages,
	according to [__GraphQL Cursor Connections Specification__
	](https://relay.dev/graphql/connections.htm#sec-Cursor)
	"""
	scalar Cursor

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
	The concept of an [*edge*
	](https://relay.dev/graphql/connections.htm#sec-Edge-Types) also proves
	useful if there is information that is specific to the edge, rather than to
	one node, which means information about a connection instance.
	"""
	interface Edge {
		"Opaque cursor used to navigate through pages"
		cursor: Cursor
		"""
		This field must return either a Scalar, Enum, Object, Interface, Union, or
		a Non-Null wrapper around one of those types. Notably, this field cannot
		return a list.
		"""
		node: Node
	}

	"Regular node which is returned by Edge type, it must have at least ID type"
	interface Node {
		id: ID!
	}

	"""
	Enable forward pagination, slicing can be done with *first*. The *after* is a
	opaque cursor returned by **pageInfo**'s **endCursor** node
	"""
	input ForwardPaginationInput {
		"at most first edges"
		first: NonNegativeInt
		"number of the page or edges after this cursor"
		after: Cursor
	}

	"""
	Enable backward pagination, slicing can be done with *last*. The *before* is a
	opaque cursor returned by *pageInfo*'s *startCursor* node
	"""
	input BackwardPaginationInput {
		"at most last edges"
		last: NonNegativeInt!
		"number of the page or last edges before this cursor"
		before: Cursor
	}

	"""
	The **Timestamps** is metadata information about a particular object. It
	tells when it was created and last updated. Notice: updatedAt doesn't store
	historical data only the last update date
	"""
	interface Timestamps {
		"create date and time"
		createdAt: DateTime!
		"last update date and time"
		updatedAt: DateTime!
	}

	"""
	The **UserConnection** represents an endpoint of an edge. It defines
	**totalCount** metadata to count the number of distinct users
	"""
	type UserConnection implements Connection {
		"user' edges"
		edges: [UserEdge!]!
		"page information"
		pageInfo: PageInfo!
		"total number of connection using User type as a endpoint"
		totalCount: NonNegativeInt!
	}

	"""
	The **UserEdge** is a connection between two nodes, each user edge endpoint
	doens't have any metadata and returns simple User node
	"""
	type UserEdge implements Edge {
		"node is a plain User type"
		node: User!
		"user's edge cursor"
		cursor: Cursor!
	}

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

	"""
	An *Post* is an user-submitted message enclosed into a block containing the
	user's details and the date and time it was submitted. Posts are contained in
	threads, where they appear as blocks one after another. The first post starts
	the thread; this may be called the OP (original post). Posts that follow in
	the thread are meant to continue discussion about that post, or respond to
	other replies; it is not uncommon for discussions to be derailed.
	"""
	type Post implements Node & Timestamps {
		"post identifier"
		id: ID!
		"summarize the discussion proposed, detailed information about a topic"
		message: String
		"post's author"
		author: User!
		"posts which replies to this one"
		replies(page: ForwardPaginationInput): PostConnection!
		"users who liked the post"
		likedBy(page: ForwardPaginationInput): UserConnection!
		"post' creation time"
		createdAt: DateTime!
		"post' last update time"
		updatedAt: DateTime!
	}

	"Implements Connection pattern defining an post edge's endpoint"
	type PostConnection implements Connection {
		"post's edges"
		edges: [PostEdge!]!
		"page information"
		pageInfo: PageInfo!
		"number of all posts related to this posts"
		totalCount: NonNegativeInt!
		"""
		number of replies, under the post, which means the number of nodes in the
		whole reply subtree
		"""
		iteractions: NonNegativeInt!
	}

	"""
	**PostEdge** implements Edge' connection pattern, representing a endpoint
	from a relationship
	"""
	type PostEdge implements Edge {
		"node presents a simple post"
		node: Post!
		"post's cursor"
		cursor: Cursor!
	}

	"""
	A thread (sometimes called a topic) is a collection of posts, although this
	is typically configurable: Options for newest to oldest and for a threaded
	view (a tree-like view applying logical reply structure before chronological
	order) can be available. A thread is defined by a title and an opening post
	(common abbreviation OP, which can also be used to refer to the original
	poster), which opens whatever dialogue or makes whatever announcement the
	poster wished. A thread can contain any number of posts, including multiple
	posts from the same members, even if they are one after the other.
	"""
	type Thread implements Node & Timestamps {
		id: ID!
		"""
		A brief introduction to the discussion, it intends to engage people around
		a conversation
		"""
		title: String!
		"Original post of the thread, also known as thread starter"
		post: Post!
		"""
		all unique participants of the thread, which means all its op's replies
		and its entire subtree
		"""
		participants(page: ForwardPaginationInput): UserConnection!
		"creation time"
		createdAt: DateTime!
		"last update time"
		updatedAt: DateTime!
	}

	"""
	Thread connection implements Connection defining edges, pageInfo and has the
	total number of threads in the community. The total number of threads refers
	to the quantity of raised topics, or beginning of an conversation
	"""
	type ThreadConnection implements Connection {
		"connections between thread and posts"
		edges: [ThreadEdge!]!
		"additional information about the pagination"
		pageInfo: PageInfo!
		"number of threads in total"
		total: NonNegativeInt!
	}

	"""
	Thread edge implements Edge defining node and cursor but has specific metadata
	"""
	type ThreadEdge implements Edge {
		"node is a simple thread"
		node: Thread!
		"opaque cursor"
		cursor: Cursor!
	}

	extend type Query {
		"""
		Get a list of all threads (also known as original posts), that's a thread
		starter which originates a conversation. That list represents all top-level
		posts which can be paginated by the user
		"""
		threads(page: ForwardPaginationInput): ThreadConnection!
	}

	fragment threadListView on ThreadConnection {
		edges {
			node {
				id
				title
				participants(page: { first: $participants }) {
					edges {
						node {
							id
							name {
								nick
							}
							avatar
						}
					}
					totalCount
				}

				originalPost {
					id
					message
					likedBy {
						totalCount
					}

					author {
						id
						name {
							nick
						}
						avatar
					}
				}
			}
		}

		pageInfo {
			endCursor
			hasNextPage
		}

		total
	}
`;

export default typedef;
