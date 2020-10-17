/**
 * Define connection pattern for paginating and send metadata information about
 * a relationship between nodes
 * @see https://relay.dev/graphql/connections.htm
 */

import { gql } from 'apollo-server-express';

export default gql`
	"""
	Connection pattern input, the values to slicing and paginating the result set
	"""
  input ConnectionInput {
    first: Int!
    after: Base64!
  }

  """
  Defines a way for paginating, slicing, providing metadata about the
	connection and page information about relationship between types
  """
  interface Connection {
    edges: [Edge!]!
    pageInfo: PageInfo!
		"""
		Total count of relations to this particular page. Normally it is the size
		of slicing, defined by first argument from ConnectionInput, but it can be
		less when the last page do not fit in this size
		"""
    totalCount: Int! #ver esse aqu
  }

	"""
	Information about the relationships. It defines any metadata only related to
	to eonnection between two nodes. Also, defines the opaque cursor
	"""
  interface Edge {
    node: Node
		"Opaque cursor passed to after argument to paginating the resource"
    cursor: Base64!
    friendshipTime: DateTime! #ver esse aqu
  }

	"""
	Specifies the Node itself, which means the information about the type that is
	connected to
	"""
  interface Node {

  }

  interface PageInfo {
    endCursor: Base64!
    startCursor: Base64!
		"Tells if there's more nodes or it reached the end"
    hasNextPage: Boolean!
  }
`;
