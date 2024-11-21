import {
  index,
  serial,
  text,
  numeric,
  pgTable,
  timestamp,
  date,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import {} from 'drizzle-orm/pg-core';
export const expenses = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey().notNull(),
    userId: text('user_id').notNull(),
    title: text('title'),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    category: text('category').notNull(),
  },
  (expenses) => ({
    userIdIndex: index('user_id_idx').on(expenses.userId),
  })
);

export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Amount must be postive' }),
  category: z.enum(['Food', 'Bills', 'Entertainment', 'Others']),
});
export const selectExpensesSchema = createSelectSchema(expenses);
export const budget = pgTable(
  'budget',
  {
    id: serial('id').primaryKey().notNull(),
    userId: text('user_id').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (budget) => ({
    userIdIndex: index('budget_user_id_idx').on(budget.userId),
  })
);

export const insertBudgetSchema = createInsertSchema(budget, {
  userId: z.string().min(1, { message: 'User ID is required' }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Amount must be a valid number' }),
});
export const selectBudgetSchema = createSelectSchema(budget);
