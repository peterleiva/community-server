import _ from 'lodash';
import casual from 'casual';
import topic from '../../../topics/__mocks__/query';

const query = _.merge(topic);

export default {
  ...query,
  PositiveInt: (): number => casual.integer(0),
  UnsignedInt: (): number => casual.integer(0),
  DateTime: (): string => new Date().toISOString(),
};
