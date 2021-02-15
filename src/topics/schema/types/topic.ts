import { gql } from 'apollo-server-express';

const TopicTypeDefs = gql`
  """
   Topic represents a single point which users would like to discuss with others
  some specific subject. A topic represents this subject which can be comments
  by others, represented by a reply
  """
  type Topic implements Node {
    "Unique topic identifier"
    id: ObjectID!
    """
      Title of subject an author would like to discuss, body may have detailed
    information. A title is unique string with characters up to 255 long
    """
    title: String!
    "Topic creator, the person who start the conversation"
    author: User!
    "Topic, optional, classifier according to a group of subjects"
    category: Category
    "Indicates whether topic is fixed to the top when retrieved as a list"
    fixed: Boolean!
    "Get all topic participants, which means all people who left a reply"
    participants: [User!]!
    "Comments to the topics"
    replies: [Reply!]!
    "Number of replies to the topic, whatever how deep it was sent"
    numReplies: UnsignedInt!
    "Creation date"
    createdAt: DateTime!
    "Last update date"
    updatedAt: DateTime!
  }

  """
  Argumento usado pela consulta topics para ordenar os topicos por title e
  createdAt. Para slicing e paginar os tópicos retornados
  """
  input SortTopicsInput {
    title: Sort
    createdAt: Sort
  }

  """
   TopicsConnection has metadata about topics relationships, whenever want to
  paginate or have meta info about topics relationships has to use this node
  """
  type TopicsConnection implements Connection {
    "Connection metadata. Each edge represents a relationship"
    edges: [TopicEdge!]!
    "Pagination information"
    pageInfo: PageInfo!
    """
       Page size is the number of result set in edges. If is not the last page
    the number is the same first for ConnectionInput, else it is less
    """
    pageSize: UnsignedInt!
    "Número total de em todas de resultados em todas as páginas"
    totalCount: UnsignedInt!
  }

  """
   TopicEdge is a single relationship with topic node. Each topic edge has a
  a node which have topic date, and its cursor which can be used as a offset in
  further queries
  """
  type TopicEdge implements Edge {
    "Node is the actual result, it represents a node between relationships"
    node: Topic
    "Cursor pointing to edge in the result set"
    cursor: Cursor!
  }

  extend type Query {
    """
    Get all topics stored by users. The result is paginated by default, so that
    securely can use pagination on client side to retrieve subjects worth of
    discussion. Topics can be ordered according to certain fields
    """
    topics(
      sortBy: SortTopicsInput
      pagination: ConnectionInput = { first: 20 }
    ): TopicsConnection
  }
`;

export default TopicTypeDefs;
