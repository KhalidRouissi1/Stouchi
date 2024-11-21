import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expenses';
import { serveStatic } from 'hono/bun';
import { authRoute } from './routes/auth';
import { budgetRoute } from './routes/budget';

const app = new Hono();
/**
 * I used this fucntion it logs our requestes responses
 * It take the path  and the fucntion to impliment
 * return logging in the consol
 */

app.use('*', logger());

const apiRoutes = app
  .basePath('/api')
  .route('/expenses', expensesRoute)
  .route('/budget', budgetRoute)
  .route('/', authRoute);

app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));
export default app;
export type ApiRoute = typeof apiRoutes;
