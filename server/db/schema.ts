import {
  index,
  serial,
  text,
  timestamp,
  numeric,
  pgTable,
  date,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const expenses = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey().notNull(),
    userId: text('user_id').notNull(),
    title: text('title'),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
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
});
export const selectExpensesSchema = createSelectSchema(expenses);
