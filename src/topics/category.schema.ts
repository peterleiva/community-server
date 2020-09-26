import { gql } from 'apollo-server-express';
import { CategoryDocument } from './category.model';
import TopicModel, { TopicDocument } from './topic.model';

export const typeDefs = gql`
  """
  Category is a topic classifier. Topics, optionally, can be grouped by
  categories. Each category define a unique name and a backgroundColor to be
  used for UI
  """
  type Category {
    "Category identifier"
    id: ID!
    "Unique name, with a maximum of 144 caracters"
    name: String!
    "Category background color to be used by UI returns as a hex color: #ffffff"
    backgroundColor: String!
    "List of all topics under the category"
    topics: [Topic!]!
  }
`;

export const resolvers = {
  Category: {
    topics: async (category: CategoryDocument): Promise<TopicDocument[]> => {
      return TopicModel.find({ category: category._id }).exec();
    },
  },
};
