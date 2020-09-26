import { gql } from 'apollo-server-express';
import { UserDocument } from '../users';
import { CategoryDocument } from './category.model';
import { ReplyDocument } from './reply.model';
import TopicModel, { TopicDocument } from './topic.model';

export const typeDefs = gql`
  """
  Topic represents a single point which a user would like to discuss with
  others
  """
  type Topic {
    "topic identifier"
    id: ID!
    "Topic title, a unique string with at most 255 characters, representing a
		subject to be discussed"
    title: String!
		"Topic's author, the person who created the topic"
    # author: User!
		"Represents a topic, optional, classifier to categorize topics"
    category: Category
		"Comments sent by other users on this topic"
    # replies: [Reply!]!
		"All topics participants, which includes all people who comments the topic
		and the author itself"
		# participants: [User!]!
		"Indicate if topic must be fixed at the top when retriveing a ordered list"
    fixed: Boolean
		"Quantity of comments the topic have. Any, comment is count, in the depeest
		level"
    numReplies: UnsignedInt!
		"Create date"
    createdAt: DateTime!
		"Last update date"
    updatedAt: DateTime!
  }

	extend type Mutation {
		topics(): [Topic!]!
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

  Mutation: {
    async topics(): Promise<TopicDocument[]> {
      return TopicModel.find({}).exec();
    },
  },
};
