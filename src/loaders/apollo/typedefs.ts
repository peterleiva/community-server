import { gql } from "apollo-server-core";

const typedef = gql`
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
		replies(page: ForwardPageInput): PostRepliesConnection!
		"amount of users who liked the post"
		likes: NonNegativeInt!
		"post' creation time"
		createdAt: DateTime!
		"post' last update time"
		updatedAt: DateTime!
	}

	"""
	**PostRepliesConnection** represents self relationship between posts
	indicading a reply. A post can be a reply of another posts
	"""
	type PostRepliesConnection implements Connection {
		"post's edges"
		edges: [PostReplyEdge!]!
		"page information"
		pageInfo: PageInfo!
	}

	"""
	**PostReplyEdge** implements Edge's connection pattern, representing an
	endpoint from a relationship in any direction
	"""
	type PostReplyEdge implements Edge {
		"node presents a simple post"
		node: Post!
		"post's cursor"
		cursor: Cursor!
	}
`;

export default typedef;
