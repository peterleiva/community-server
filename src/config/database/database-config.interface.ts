/**
 * Database configuration interface
 */

export default interface DatabaseConfig {
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly port: string;
  readonly host: string;
}
