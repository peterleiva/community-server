import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Reply {
    id: ID!
  }
`;

export const resolvers = {};
