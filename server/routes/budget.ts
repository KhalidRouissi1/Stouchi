import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db';
import { budget as budgetTable, insertBudgetSchema } from '../db/schema';
import { getUser } from '../kind';
import { eq } from 'drizzle-orm';

export const budgetRoute = new Hono()

  /**
   * Get the budget for the user
   */
  .get('/', getUser, async (c) => {
    const user = c.var.user;
    const budgets = await db
      .select()
      .from(budgetTable)
      .where(eq(budgetTable.userId, user.id));

    if (budgets.length === 0) {
      return c.json({ budget: null });
    }

    return c.json({ budget: budgets[0] });
  })

  /**
   * Create a new budget for the user or replace the old budget
   */
  .post('/', getUser, zValidator('json', insertBudgetSchema), async (c) => {
    const user = c.var.user;
    const existingBudget = await db
      .select()
      .from(budgetTable)
      .where(eq(budgetTable.userId, user.id))
      .limit(1);
    if (existingBudget.length > 0) {
      await db.delete(budgetTable).where(eq(budgetTable.userId, user.id));
    }

    const budget = c.req.valid('json');
    const newBudget = await db
      .insert(budgetTable)
      .values({ ...budget, userId: user.id })
      .returning();

    return c.json(newBudget[0], 201);
  });
