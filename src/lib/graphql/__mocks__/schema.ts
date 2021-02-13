import _ from 'lodash';
import casual from 'casual';
import topic from '../../../topics/__mocks__/query';
import { Types } from 'mongoose';

const Query = _.merge(topic);

export default {
  ...Query,
  PositiveInt: (): number => casual.integer(0),
  UnsignedInt: (): number => casual.integer(0),
  DateTime: (): string => new Date().toISOString(),
  ObjectID: (): Types.ObjectId => new Types.ObjectId(),
  Cursor: (): Types.ObjectId => new Types.ObjectId(),
};
