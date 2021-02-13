import { GraphQLScalarType, Kind } from 'graphql';
import { Types } from 'mongoose';

type Cursor = Types.ObjectId;

const CursorType = new GraphQLScalarType({
  name: 'Cursor',
  description: 'Cursor type used for connection pattern to paginate results',

  serialize(value: Cursor): string {
    const cursor = Buffer.from(value.toHexString());

    return cursor.toString('base64');
  },

  parseValue(value: string | null): Cursor | null {
    if (!value || !Types.ObjectId.isValid(value)) return null;

    return Types.ObjectId.createFromHexString(value);
  },

  parseLiteral(ast): string | null {
    return ast.kind === Kind.STRING
      ? Buffer.from(ast.value, 'base64').toString('utf-8')
      : null;
  },
});

export const resolver = { Cursor: CursorType };

export default CursorType;
