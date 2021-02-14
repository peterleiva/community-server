import { IResolvers } from 'apollo-server-express';

const SortResolver: IResolvers = {
  Sort: {
    ASC: 1,
    DESC: -1,
  },
};

export default SortResolver;
