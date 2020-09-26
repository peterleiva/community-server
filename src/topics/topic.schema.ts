import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  """
  Topic represents a single point which a user would like to discuss with
  others
  """
  type Topic {
    id: ID!
    #tem mais coisas...
  }
`;

export const resolvers = {};
