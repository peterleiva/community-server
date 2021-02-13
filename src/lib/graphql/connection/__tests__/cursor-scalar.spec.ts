import { StringValueNode, Kind } from 'graphql';
import CursorType from '../cursor-scalar';
import { Types } from 'mongoose';

describe('Cursor Scalar', () => {
  const objectId = new Types.ObjectId();
  const serializedId = Buffer.from(objectId.toHexString()).toString('base64');

  describe('.serialize', () => {
    it('Serialize to correct base64 form', () => {
      expect(CursorType.serialize(objectId)).toBe(serializedId);
    });
  });

  describe('.parseValue', () => {
    it('Return null when given null', () => {
      expect(CursorType.parseValue(null)).toBeNull();
    });

    it('Return null when value is not a valid objectid', () => {
      expect(CursorType.parseValue('asdasd')).toBeNull();
    });

    it('Return ObjectId from a valid ObjectId', () => {
      const hexStringObjectId = objectId.toHexString();

      expect(CursorType.parseValue(hexStringObjectId).toHexString()).toBe(
        hexStringObjectId
      );
    });
  });

  describe('.parseLiteral', () => {
    const rawValue = 'anything is fine';
    const ast = {
      kind: Kind.STRING,
      value: '',
    };

    it('Returns base64 string representation when ast is string', () => {
      const value = Buffer.from(rawValue).toString('base64');

      ast.value = value;
      expect(CursorType.parseLiteral(ast, {})).toBe(rawValue);
    });

    it('Return null when kind is not string', () => {
      const astIntKind = Object.assign(ast, { kind: Kind.INT });

      expect(CursorType.parseLiteral(astIntKind, {})).toBeNull();
    });
  });
});
