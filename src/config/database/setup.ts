/**
 * Uses mongoose to open a database connection with mongodb
 */

import mongoose, { Mongoose } from 'mongoose';
import loglevel from 'loglevel';
import type DatabaseConfig from './database-config.interface';
import config from './database.json';
import package from '../../../package.json';

type ConfigurationFile = Record<string, Partial<DatabaseConfig>>;

// TODO: Colocar um nome genérico que remete ao nome da aplicação
const DEFAULTS: DatabaseConfig = {
  database: package.name,
  host: 'localhost',
  port: '27017',
  password: '',
  username: '',
};

const ENVIRONMENT: string = process.env.NODE_ENV ?? 'development';

// Uses dev db config if no env is configured
const options: DatabaseConfig = {
  ...DEFAULTS,
  ...((<ConfigurationFile>config)[ENVIRONMENT] ?? {}),
};

/**
 * Database username and password from config object
 */
const credentials =
  options.username && options.database
    ? `${options.username}:${options.password}@`
    : '';

/**
 * Database URI use for connect function to open a mongodb connection. Using
 * env DATABASE_URI as a default if existis
 */
const DATABASE_URI: string =
  process.env.DATABASE_URI ??
  'mongodb://' +
    `${credentials}${options.host}:${options.port}/${options.database}`;

/**
 * Connects asynchronous to MongoDB using mongoose
 *
 * Use mongoose to open a connection using the underlying mondodb driver, sets
 * up the connection using DATABASE_URL and logging the connection events
 *
 * @returns mongoose connection
 */
export async function connect(databaseUri = DATABASE_URI): Promise<Mongoose> {
  mongoose.connection.on('open', () => {
    loglevel.info(`🔗 MongoDB connected to ${databaseUri}`);
  });

  mongoose.connection.on('error', error => {
    loglevel.error(`⛔️ MongoDB couldn't connect to ${databaseUri}`);
    loglevel.error(error);
  });

  mongoose.connection.on('close', () => {
    loglevel.info(`🔌 MongoDB disconnected from ${databaseUri}`);
  });

  return mongoose
    .connect(databaseUri, { useNewUrlParser: true })
    .catch(error => {
      loglevel.error(
        `⛔️ MongoDB failed in connect to ${databaseUri}. Given the following` +
          `error: `
      );
      throw error;
    });
}

/**
 * Close database connection
 *
 * Uses mongoose connection object to disconnect from mongodb. Also logs a error
 * message if there's any
 *
 * @throws logs and rethrows the error sent by mongoose close connection
 */
export async function disconnect(): Promise<void> {
  try {
    return mongoose.connection.close();
  } catch (error) {
    loglevel.error(`❌ MongoDB couldn't close connection`);
    loglevel.error(error);

    throw error;
  }
}

process.on('SIGTERM', async () => {
  await disconnect();
  console.log('Heroku app shuted down');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\nServer Interrupting...');

  await disconnect();
  console.log('⛔️ Server Shutted Down');
  process.exit(0);
});

process.once('SIGUSR2', async () => {
  console.log('\nServer Terminating...');

  await disconnect();
  console.log('❗️Nodemon restarted\n');
  process.kill(process.pid, 'SIGUSR2');
});

export { connect as setup };
