/**
 * Define scalars to be used by the type system
 */

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  scalar Time

  scalar DateTime

  scalar Timestamp

  scalar Hexadecimal

  scalar IBAN

  scalar UtcOffset

  scalar EmailAddress

  scalar NegativeFloat

  scalar NegativeInt

  scalar NonNegativeFloat

  scalar NonNegativeInt

  scalar NonPositiveFloat

  scalar NonPositiveInt

  scalar PhoneNumber

  scalar PositiveFloat

  scalar PositiveInt

  scalar PostalCode

  scalar UnsignedFloat

  scalar UnsignedInt

  scalar URL

  scalar ObjectID

  scalar BigInt

  scalar Long

  scalar SafeInt

  scalar GUID

  scalar HexColorCode

  scalar HSL

  scalar HSLA

  scalar IPv4

  scalar IPv6

  scalar ISBN

  scalar MAC

  scalar Port

  scalar RGB

  scalar RGBA

  scalar USCurrency

  scalar Currency

  scalar JSON

  scalar JSONObject

  scalar Byte

  scalar Void
`;

export { resolvers } from 'graphql-scalars';
