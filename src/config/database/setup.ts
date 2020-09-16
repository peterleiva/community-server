/**
 * Uses mongoose to open a database connection with mongodb
 */

import mongoose from 'mongoose';
import DatabaseConfig from './database-config.interface';
import config from './database.json';

type ConfigurationFile = Record<string, Partial<DatabaseConfig>>;

const DEFAULTS: DatabaseConfig = {
  database: 'my-project-database',
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
export async function connect(): Promise<typeof mongoose> {
  mongoose.connection.on('open', () => {
    console.info('✅ MondoDB connected to', DATABASE_URI);
  });

  mongoose.connection.on('error', (error) => {
    console.error(error);
  });

  mongoose.connection.on('close', () => {
    console.info('❗️MongoDB disconnected');
  });

  return mongoose
    .connect(DATABASE_URI, { useNewUrlParser: true })
    .catch((error) => {
      console.error('❌ MongoDB failed in connect to ', DATABASE_URI);
      console.error('Given the following error ', error);
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
    console.error('❌ Mongoose close connection error: ', error);
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
