import dotenv from 'dotenv';

/**
 * Only loads for non-production environments
 */
if (process.env.NODE_ENV !== 'production') dotenv.config();
