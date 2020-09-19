import mongoose from 'mongoose';

export class ColorOutOfRange extends mongoose.Error.CastError {
  constructor(value: any, path: string) {
    super('Color', value, path);

    this.reason = new Error(
      `Color: is outside the range of valid color hex ${Color.COLOR_MIN}` +
        ` and ${Color.COLOR_MAX}`
    );
  }
}

/**
 * Color type representing Color hex value
 *
 * A color type is represented by a hexadecimal number composing its
 * R(ed)G(reen)B(lue). Each color is a byte with 2^8 possible values. So, the
 * type is represented by a number between 0 and 0xffffff
 *
 */
export default class Color extends mongoose.SchemaType {
  static COLOR_MAX = 0xffffff;
  static COLOR_MIN = 0x0;

  constructor(private path: string, options?: [k: string]) {
    super(path, options, 'Color');
  }

  /**
   * Cast a color value consisting of color hex value
   *
   * @param val - value to be cast
   */
  cast(val: any): number {
    let color = Number(val);

    if (isNaN(color) && isNaN((color = this.transformHexColor(val)))) {
      throw new TypeError('Value must be a number');
    }

    if (color < Color.COLOR_MIN || val > Color.COLOR_MAX) {
      throw new ColorOutOfRange(val, this.path);
    }

    return color;
  }

  /**
   * Transform a color hexadecimal string to a number
   *
   * Get a color value, and transforms to number. Using regex pattern, test two
   * possible color hex format, with 3 values (#)
   * @param hex - color hex string
   */
  private transformHexColor(hex: string): number {
    const hexColorPattern = /^#([0-9A-F]{6}|[0-9A-F]{3})$/i;
    let color = NaN;
    const match = hexColorPattern.exec(hex);

    if (match?.[1]) {
      const rawHex = match[1];
      const formatted =
        rawHex.length === 3
          ? [...rawHex].map((d) => d.repeat(3)).join('')
          : rawHex;

      color = Number('0x' + formatted);
    }

    return color;
  }
}

mongoose.Schema.Types.Color = Color;
mongoose.SchemaTypes.Color = Color;
