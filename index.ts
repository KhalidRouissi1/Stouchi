import app from './app';

/**
 * This function it define the Server wich is bun
 * It takes void
 * It returns all the responses from the server in that fetch function the attrbuite of the function parameters
 */

Bun.serve({
  fetch: app.fetch,
});

console.log('server running');
