import { index, serial, text, varchar } from 'drizzle-orm/pg-core';
import { numeric, pgTable } from 'drizzle-orm/pg-core';
export const expenses = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey().notNull(),
    userId: text('user_id').notNull(),
    title: text('title'),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  },
  (expenses) => ({
    userIdIndex: index('user_id_idx').on(expenses.userId),
  })
);
