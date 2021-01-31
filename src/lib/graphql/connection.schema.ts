/**
 * In the query, the connection model provides a standard mechanism for slicing
 * and paginating the result set.
 * In the response, the connection model provides a standard way of providing
 * cursors, and a way of telling the client when more results are available.
 *
 * @see https://relay.dev/graphql/connections.htm
 */

import { gql } from 'apollo-server-express';

export default gql`
  """
    Connection pattern define a way for slicing and paginate the results.
  Thereof first defines the slicing. After defines the pagination, passing a
  opaque cursor as a start point
  """
  input ConnectionInput {
    "Returns at most first edges"
    first: NonNegativeInt!
    "After is a start point to begin to look for nodes"
    after: Cursor
  }

  """
    Defines a way for paginating, slicing, providing metadata about the
   connection and page information about relationship between types. Every
  type which implements Connection, ends with Connection on its type
  """
  interface Connection {
    edges: [Edge!]!
    pageInfo: PageInfo!
    """
      Count of relationships to this particular connection. Consist of sliceing
    size, defined by first argument from ConnectionInput, but it can be less
    when the last page do not fit in this size
    """
    pageSize: PositiveInt!
    totalCount: PositiveInt!
  }

  """
   Each edge in the connection, we asked for a cursor. This cursor is an opaque
  string, and is precisely what we would pass to the after arg to paginate
  starting after this edge.
  """
  interface Edge {
    """
    This field must return either a Scalar, Enum, Object, Interface, Union, or
    a Non‐Null wrapper around one of those types. Notably, this field cannot
    return a list.
    """
    node: Node
    "Cursor is a start point for after arg for navigate through nodes"
    cursor: Cursor!
  }

  """
   This field return a type that serializes as a String; this may be a opaque
  String. It is used for navigate forwarding between nodes
  """
  scalar Cursor

  interface Node {
    id: ObjectID!
  }

  """
  Define information about the pagination status, a start and end cursor is
  defined. They provide cursor for first and last node. Also it informs if it
  has previous or next page
  """
  type PageInfo {
    "Cursor corresponding to the first node in edges"
    startCursor: Cursor
    "Cursor corresponding last node in edges"
    endCursor: Cursor
    """
    Tell us if there are more edges available, or if we’ve reached the end of
    this connection
    """
    hasNextPage: Boolean!
    """
      Indicate whether more edges exist prior to the set defined by the clients
    arguments
    """
    hasPreviousPage: Boolean!
  }
`;
