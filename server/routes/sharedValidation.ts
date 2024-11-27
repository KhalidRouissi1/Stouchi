import type { z } from 'zod'
import { insertBudgetSchema, insertExpensesSchema } from '../db/schema'

export const createPostSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
  id: true,
})

export type CreateExpense = z.infer<typeof createPostSchema>;

export const createBudget = insertBudgetSchema.omit({
  id: true,
  updatedAt: true,
})

export type CreateBudget = z.infer<typeof createBudget>;
