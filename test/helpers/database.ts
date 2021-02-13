/**
 * This files describe a database setup, to connect and disconnect
 * from database between tests
 */

import mongoose from 'mongoose';
import logger from 'loglevel';
import { connect, disconnect } from '@/config/database/setup';

/**
 * Startup database process using app setup which uses mongoose
 *
 * Setup connects to the database and catchs a error and finish the process
 * if there's any error. Also return a promise with mongoose object
 *
 */
export async function setup(): Promise<typeof mongoose> {
  try {
    return await connect(false);
  } catch (error) {
    logger.error('Error trying setup test database', error);
    process.exit(0);
  }
}

/**
 * Cleanup the database removing all collections
 *
 */
async function dropAll(): Promise<void> {
  try {
    for (const collectionName of Object.getOwnPropertyNames(
      mongoose.connection.collections
    )) {
      const collection = mongoose.connection.collection(collectionName);
      await collection.deleteMany({});
    }
  } catch (error) {
    logger.error('Error trying dropping the test database', error);
  }
}

/**
 * Closes and drop database
 *
 * Use the underlying application connection which uses mongoose to drop all the
 * entire database. This function is used for test teardown tests after each
 * request
 *
 */
export async function teardown(): Promise<void> {
  try {
    return await disconnect(false);
  } catch (error) {
    logger.error('Error trying cleanup test database', error);
    process.exit(0);
  }
}

/**
 * Setup and teardown for database connection using test environment
 *
 * Before and after each test the database open the connection and closes it
 * dropping the entire database in the process
 *
 **/
export default function databaseSetup(): void {
  beforeAll(setup);
  afterEach(dropAll);
  afterAll(teardown);
}
