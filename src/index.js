// Imports
import 'babel-polyfill';
import config from 'config';
import express from 'express';
import http from 'http';
const app = express();


// Start the server
app.start = async () => {
  console.log('Server Start');
  const port = config.get('port');
  app.set('port', port);
  const server = http.createServer(app);

  // If server fails to start
  server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;
    console.log(`Failed to start server: ${error}`);
    process.exit(1);
  });

  // Launch server
  server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
  });

  server.listen(port);
};

app.start().catch((err) => {
  console.log(err);
});

export default app;
