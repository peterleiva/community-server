import { gql } from 'apollo-server-express';

export default gql`
  """
   Sort enumerates all possible ways to sort a attribute type. Any field can be
  ordered in ascending or descending orders.
  """
  enum Sort {
    ASC
    DESC
  }
`;
