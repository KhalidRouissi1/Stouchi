import app from './app';

/**
 * This function it define the Server wich is bun
 * It takes void
 * It returns all the responses from the server in that fetch function the attrbuite of the function parameters
 */

const Server = Bun.serve({
  port: process.env.PORT || 3000,
  fetch: app.fetch,
});

console.log('server running', Server.port);
