import { gql } from 'apollo-server-express';
import { UserDocument } from '../users';
import { CategoryDocument } from './category.model';
import { ReplyDocument } from './reply.model';
import TopicModel, { TopicDocument } from './topic.model';

export const typeDefs = gql`
  """
   Topic represents a single point which users would like to discuss with others
  some specific subject. A topic represents this subject which can be comments
  by others, represented by a reply
  """
  type Topic {
    "Unique topic identifier"
    id: ID!
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
    "Number of replies to the topic, whetever how deep it was sent"
    numReplies: UnsignedInt!
    "Creation date"
    createdAt: DateTime!
    "Last update date"
    updatedAt: DateTime!
  }

  extend type Query {
    """
    Get all topics stored by users. The result is paginated by default, so that
    securely can use pagination on client side to retrieve subjects worth of
    discussion. Topics can be ordered according to certain fields
    """
    topics: [Topic!]!
  }
`;

export const resolvers = {
  Topic: {
    async numReplies(topic: TopicDocument): Promise<number> {
      await topic.populate('numReplies').execPopulate();
      return topic.numReplies;
    },

    async participants(topic: TopicDocument): Promise<UserDocument[]> {
      return topic.participants.exec();
    },

    async replies(topic: TopicDocument): Promise<ReplyDocument[]> {
      await topic.populate('replies').execPopulate();
      return topic.replies ?? [];
    },

    async category(
      topic: TopicDocument
    ): Promise<CategoryDocument | undefined> {
      await topic.populate('category').execPopulate();
      return topic.category;
    },
  },

  Query: {
    async topics(): Promise<TopicDocument[]> {
      return TopicModel.find({}).exec();
    },
  },
};
