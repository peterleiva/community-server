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
    if (!value) return null;

    value = Buffer.from(value, 'base64').toString('utf-8');

    if (!Types.ObjectId.isValid(value)) return null;

    return Types.ObjectId.createFromHexString(value);
  },

  parseLiteral(ast): string | null {
    return ast.kind === Kind.STRING ? ast.value : null;
  },
});

export const resolver = { Cursor: CursorType };

export default CursorType;
