import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  extend type Query {
    stats: Stats
  }

  type Stats {
    """
      Solutions is the total undistinguished replies obtained by a topic.
    Thereof given a topic with a reply and those reply have been replied. All
    of them is considered in the calculation
    """
    solutions: PositiveInt!
    "Members is the total number of registered users"
    members: PositiveInt!
  }
`;
