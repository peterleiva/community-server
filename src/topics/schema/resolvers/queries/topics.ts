import { IFieldResolver } from 'apollo-server-express';
import { TopicDocument, TopicModel, Topic } from '../../..';
import type PaginationArgs from '../../../../lib/graphql/pagination-args.interface';
import { Connection, PageInfo, Edge } from '../../../../lib/graphql/connection';

const topics: IFieldResolver<
  never,
  never,
  PaginationArgs<TopicDocument>
> = async (_: never, { sortBy, pagination }): Promise<Connection<Topic>> => {
  const topicsCursor = await TopicModel.find({
    _id: { $lt: pagination?.after?.toHexString() },
  })
    .sort(sortBy)
    .limit(pagination.first)
    .cursor();

  return {
    pageSize: topicsCursor.count(),
  };
};

export default topics;
