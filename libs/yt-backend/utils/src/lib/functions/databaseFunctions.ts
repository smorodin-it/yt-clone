import mongoose from 'mongoose';
import { logger } from '../logger';
import { DB_CONNECTION_STRING } from '../database';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info('Connected to database');
  } catch (e) {
    logger.error(e, 'Failed to connect to database');
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  await mongoose.connection.close();
  logger.info('Disconnected from database');

  return;
};
