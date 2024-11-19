import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { getUser } from '../kind';
import { db } from '../db';
import { expenses as expensesTable } from '../db/schema';
import { desc, eq } from 'drizzle-orm';
import { $ } from 'bun';
/**
 * This fucntion will recive a parameter and it will check if the values of em apply the validations or no
 * Input : {title: string, amount: number}
 * Output : {title: string, amount: number}
 */

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(100),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({ id: true });

/**
 * This router here handle all the expenses requests
 * Input: Request
 * Output: Response & Status code
 */
export const expensesRoute = new Hono()
  .get('/', getUser, (c) => {
    const user = c.var.user;
    const expenses = db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(200)
      .orderBy(desc(expensesTable));
    return c.json({ expenses: expenses });
  })
  .get('/total-spent', getUser, async (c) => {
    const total = mockDb.reduce((acc, expense) => acc + +expense.amount, 0);
    return c.json({ total });
  })
  .post('/', getUser, zValidator('json', createPostSchema), async (c) => {
    const user = c.var.user;
    const expense = await c.req.valid('json');
    const res = await db
      .insert(expensesTable)
      .values({
        ...expense,
        userId: user.id,
      })
      .returning();

    const cleanResponse = res.map((row) => ({
      id: row.id,
      title: row.title,
      amount: row.amount,
      userId: row.userId,
    }));

    c.status(201);
    return c.json(cleanResponse);
  })
  .get('/:id{[0-9]+}', getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = mockDb.find((expense) => expense.id === id);

    if (!expense) {
      return c.notFound();
    } else {
      return c.json({ expense });
    }
  })
  .delete('/:id{[0-9]+}', getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = mockDb.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deleteExpense = mockDb.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
