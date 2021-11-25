import { gql } from "apollo-server-core";

const typedefs = gql`
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
`;

export default typedefs;
