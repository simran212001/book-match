// ensures that all necessary environment variables are defined after reading from .env
import dotenv from 'dotenv-safe';
dotenv.config({ allowEmptyValues: true });
// Express
import express from 'express';
// Cors
import cors from 'cors';
// Routes
import studentRoutes from './routes/studentRoutes';
// Constants, Helpers & Types
import { mongoConnect } from './utils';
import { API_VERSION, SERVER_PORT, SERVER_HOST, serverReady } from './constants';

// server startup
const initializeApp = () => {
  const app = express();

  // enable this if you run behind a proxy (e.g. nginx) for example, rate limiting
  app.enable('trust proxy');

  // setup cors
  app.use(
    cors({
      credentials: true,
      origin: [`http://${SERVER_HOST}:${SERVER_PORT}`, 'http://localhost:3000'],
    }),
  );

  // middleware that parses json request
  app.use(express.json());

  // student related routes
  app.use(`${API_VERSION}/student`, studentRoutes);

  // main route server status
  app.get(API_VERSION, (_, res) => res.send(serverReady));

  return app;
};

const startServer = async () => {
  // start database server
  await mongoConnect();

  const app = initializeApp();

  // Modified server startup
  await new Promise<void>((resolve) => app.listen(SERVER_PORT, resolve));

  console.log(serverReady);
};

startServer();
