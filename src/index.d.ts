declare module 'mongoose' {
  namespace Schema {
    namespace Types {
      /**
       * Color type representing Color hex value
       *
       * A color type is represented by a hexadecimal number composing its
       * R(ed)G(reen)B(lue). Each color is a byte with 2^8 possible values. So,
       * the type is represented by a number between 0 and 0xffffff
       *
       */
      class Color extends SchemaType {
        static COLOR_MAX = 0xffffff;
        static COLOR_MIN = 0xf;

        constructor(path: string, options?: [k: string]);

        /**
         * Cast a color value consisting of color hex value
         *
         * @param val - value to be cast
         */
        cast(val: string | number): number;
      }
    }
  }
}
