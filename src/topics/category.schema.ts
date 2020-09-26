import { gql } from 'apollo-server-express';
import { CategoryDocument } from './category.model';
import TopicModel, { TopicDocument } from './topic.model';

export const typeDefs = '';

// export const resolvers = {
//   Category: {
//     topics: async (category: CategoryDocument): Promise<TopicDocument[]> => {
//       return TopicModel.find({ category: category._id }).exec();
//     },
//   },
// };
