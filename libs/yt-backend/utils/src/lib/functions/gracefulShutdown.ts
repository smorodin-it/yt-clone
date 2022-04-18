import { Server } from 'http';
import { logger } from '../logger';
import { disconnectFromDatabase } from './databaseFunctions';

export const signals = ['SIGTERM', 'SIGINT'];

export function gracefulShutdown(signal: string, server: Server) {
  process.on(signal, async () => {
    logger.info('Get signal: ', signal);
    server.close();

    await disconnectFromDatabase();

    logger.info('Server shut down');
    process.exit(0);
  });
}
