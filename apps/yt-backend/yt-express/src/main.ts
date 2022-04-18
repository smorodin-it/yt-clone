import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import {
  connectToDatabase,
  CORS_ORIGIN,
  gracefulShutdown,
  logger,
  signals,
} from '@youtube-clone/yt-backend/utils';

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to yt-express!' });
});

const port = process.env.port || 3333;

const server = app.listen(port, async () => {
  await connectToDatabase();
  logger.info(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i], server);
}
