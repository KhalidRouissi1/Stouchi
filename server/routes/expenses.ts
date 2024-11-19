import { expenses } from './../db/schema';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { getUser } from '../kind';
import { db } from '../db';
import { expenses as expensesTable, insertExpensesSchema } from '../db/schema';
import { and, desc, eq, sum } from 'drizzle-orm';
import { $ } from 'bun';
import { createPostSchema } from './sharedValidation';

/**
 * This router here handle all the expenses requests
 * Input: Request
 * Output: Response & Status code
 */
export const expensesRoute = new Hono()
  .get('/', getUser, async (c) => {
    const user = c.var.user;
    const expenses = db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(200)
      .orderBy(desc(expensesTable.createdAt));
    const cleanResponse = (await expenses).map((row) => ({
      id: row.id,
      title: row.title,
      amount: row.amount,
      userId: row.userId,
      date: row.date,
    }));
    return c.json({ expenses: cleanResponse });
  })
  .get('/total-spent', getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((res) => res[0]);
    return c.json(result);
  })
  .post('/', getUser, zValidator('json', createPostSchema), async (c) => {
    const user = c.var.user;
    const expense = c.req.valid('json');
    const validatedExpenseObj = insertExpensesSchema.parse({
      ...expense,
      userId: user.id,
    });

    const res = await db
      .insert(expensesTable)
      .values(validatedExpenseObj)
      .returning()
      .then((res) => res[0]);

    const cleanResponse = {
      id: res.id,
      title: res.title,
      amount: res.amount,
      userId: res.userId,
      date: res.date,
    };

    c.status(201);
    return c.json(cleanResponse);
  })
  .get('/:id{[0-9]+}', getUser, async (c) => {
    const id = +c.req.param('id');
    const user = c.var.user;
    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .limit(1)
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    const cleanResponse = {
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      userId: expense.userId,
      date: expense.date,
    };

    return c.json({ expense: cleanResponse });
  })
  .delete('/:id{[0-9]+}', getUser, async (c) => {
    const id = +c.req.param('id');
    const user = c.var.user;
    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    const cleanResponse = {
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      userId: expense.userId,
      date: expense.date,
    };

    return c.json({ expense: cleanResponse });
  });
