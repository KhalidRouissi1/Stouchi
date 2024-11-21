import { insertBudgetSchema, insertExpensesSchema } from '../db/schema';
import { z } from 'zod';

export const createPostSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
  id: true,
});

export type CreateExpense = z.infer<typeof createPostSchema>;

export const createBudget = insertBudgetSchema.omit({
  id: true,
  updatedAt: true,
});

export type CreateBudget = z.infer<typeof createBudget>;
