import Color, { ColorOutOfRange } from '../../src/lib/mongoose/types/color';

describe('Color Type', () => {
  let type: Color;

  beforeAll(() => {
    type = new Color('hexColor');
  });

  describe('With number', () => {
    it('Returned the same number as a val', () => {
      expect(type.cast(0xff)).toBe(0xff);
    });

    it('Throws when color is negative', () => {
      expect(() => type.cast(-10)).toThrow(ColorOutOfRange);
    });

    it('Throw out of range error when color is 0x1000000', () => {
      expect(() => type.cast(0x1000000)).toThrow(ColorOutOfRange);
    });
  });

  describe('With string', () => {
    describe('Throws TypeError when', () => {
      it('hexadecimal contains letter bigger than F', () => {
        expect(() => type.cast('#GAAAAA')).toThrow(TypeError);
      });

      it('Contains 4 hex numbers', () => {
        expect(() => type.cast('#1234')).toThrow(TypeError);
      });

      it('Contains 7 hex numbers', () => {
        expect(() => type.cast('#1234567')).toThrow(TypeError);
      });

      it('Contains 2 hex numbers', () => {
        expect(() => type.cast('#12')).toThrow(TypeError);
      });

      it('Hex number is bigger = 0x1000000', () => {
        expect(() => type.cast('0x1000000')).toThrow(ColorOutOfRange);
      });

      it('decimal number is 2^24', () => {
        expect(() => type.cast((2 ** 24).toString())).toThrow(ColorOutOfRange);
      });

      it('decimal number is negative', () => {
        expect(() => type.cast('-10')).toThrow(ColorOutOfRange);
      });
    });

    describe('Get color number When', () => {
      it('Correct decimal number', () => {
        expect(type.cast('1234')).toBe(1234);
      });

      it('Correct hex number', () => {
        expect(type.cast('0x123')).toBe(0x123);
      });

      it('6 number hex color', () => {
        expect(type.cast('#ABCDEF')).toBe(0xabcdef);
      });

      it('3 values number hex color', () => {
        expect(type.cast('#ABC')).toBe(0xaaabbbccc);
      });
    });
  });
});
