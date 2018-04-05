// Imports
import 'babel-polyfill';
import config from 'config';
import express from 'express';
import http from 'http';
const app = express();

// For logging and util functions
import { log, normalizePort } from './utils';
import middleware from './middleware';

// Start the server
app.start = async () => {
  log.info('Server Start');
  let port = config.get('port');
  // Some error checking
  portConverted = parseInt(port, 10);
  if (!Number.isNaN(portConverted)) port = portConverted;
  app.set('port', port);
  middleware(app);
  const server = http.createServer(app);

  // If server fails to start
  server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;
    log.error(`Failed to start server: ${error}`);
    process.exit(1);
  });

  // Launch server
  server.on('listening', () => {
    const address = server.address();
    log.info(`Server listening ${address.address}:${address.port}`);
  });

  server.listen(port);
};

app.start().catch((err) => {
  log.error(err);
});

export default app;
