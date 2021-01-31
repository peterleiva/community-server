import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
`;

export const resolvers = {};
