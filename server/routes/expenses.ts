import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { getUser } from '../kind';
import { db } from '../db';
import { expenses as expensesTable, insertExpensesSchema } from '../db/schema';
import { and, desc, eq, sum } from 'drizzle-orm';
import { createPostSchema } from './sharedValidation';

/**
 * This Controller here handle all the api requestes and return a value
 * Input: Request
 * Output: Response : {JSON} & Status code
 */
export const expensesRoute = new Hono()

  /**
   * This Get Request retruns all expenses and the user id all orderd by the create timefrom the getUser middelwear
   * Input: request from the c = context
   * Output: Response : {JSON} & Status code
   */
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
      category: row.category,
    }));
    return c.json({ expenses: cleanResponse });
  })

  /**
   * This Get Request retruns all the total expenses of each user by getting it userId from the getUser middelwear
   * Input: request from the c = context
   * Output: Response : {JSON} & Status code
   */
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
  /**
   * This Post Request add an expense for the user by its id by the getUser middelwear and validate the user inputs
   * Input: Bodycontent ()
   * Output: Response : {JSON} & Status code
   */

  .get('/getbycat/:cat', getUser, async (c) => {
    const user = c.var.user;
    const category = c.req.param('cat');

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(
        and(
          eq(expensesTable.userId, user.id),
          eq(expensesTable.category, category)
        )
      )
      .orderBy(desc(expensesTable.createdAt));

    const cleanResponse = expenses.map((row) => ({
      id: row.id,
      title: row.title,
      amount: row.amount,
      date: row.date,
      category: row.category,
    }));

    return c.json({ expenses: cleanResponse });
  })

  /**
   * This Post Request add an expense for the user by its id by the getUser middelwear and validate the user inputs
   * Input: Bodycontent ()
   * Output: Response : {JSON} & Status code
   */

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
      category: res.category,
    };

    c.status(201);
    return c.json(cleanResponse);
  })

  /**
   * This Get Request aget an expense by its id and check the userId is right and return if valid
   * Input: request from the c = context
   * Output: Response : {JSON} & Status code
   */

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
    await new Promise((r) => setTimeout(r, 5000));
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
  })
  .get('/oftenExpense', getUser, async (c) => {
    const user = c.var.user;
    const expenses = db
      .select({
        title: expensesTable.title,

        totalAmount: sum(expensesTable.amount),
      })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .groupBy(expensesTable.title)
      .limit(6);
    const cleanResponse = (await expenses).map((row) => ({
      title: row.title,
      amount: row.totalAmount,
    }));
    return c.json({ expenses: cleanResponse });
  });
