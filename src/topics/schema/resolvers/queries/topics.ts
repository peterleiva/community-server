import { IFieldResolver } from 'apollo-server-express';
import { TopicDocument, TopicModel, Topic } from '../../..';
import type PaginationArgs from '../../../../lib/graphql/pagination-args.interface';
import { Connection, PageInfo, Edge } from '../../../../lib/graphql/connection';

// TODO  Melhorar performance do cálculo de hasPrevious e hasNext
const topics: IFieldResolver<
  never,
  never,
  PaginationArgs<TopicDocument>
> = async (_: never, { pagination }): Promise<Connection<Topic>> => {
  const filter = pagination.after
    ? { _id: { $lt: pagination.after.toHexString() } }
    : {};

  const query = TopicModel.find(filter)
    .sort({ _id: -1 })
    .limit(pagination.first);

  const topicEdges = await query
    .map<Edge<TopicDocument>[]>((doc: TopicDocument[] | TopicDocument) => {
      const topicDocs = doc instanceof Array ? [...doc] : [doc];
      return topicDocs.map((topic) => new Edge(topic, topic._id));
    })
    .exec();

  const pageSize = await query.estimatedDocumentCount().exec();
  const resultsCount = await TopicModel.estimatedDocumentCount();

  const startCursor = topicEdges?.[0]?.cursor;
  const endCursor = topicEdges?.[topicEdges.length - 1]?.cursor;
  const hasNext =
    endCursor &&
    !!(await TopicModel.findOne({ _id: { $lt: endCursor } })
      .sort({ _id: -1 })
      .exec());

  const hasPrevious =
    startCursor &&
    !!(await TopicModel.findOne({
      _id: { $gt: startCursor },
    })
      .sort({ _id: -1 })
      .exec());

  const pageInfo = new PageInfo(startCursor, endCursor, hasNext, hasPrevious);

  const topicConnection = new Connection(
    topicEdges,
    pageInfo,
    pageSize,
    resultsCount
  );

  return topicConnection;
};

export default topics;
