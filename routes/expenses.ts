import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

/**
 * This fucntion will recive a parameter and it will check if the values of em apply the validations or no
 * Input : {title: string, amount: number}
 * Output : {title: string, amount: number}
 */

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({ id: true });

const mockDb: Expense[] = [
  { id: 1, title: 'Hanout', amount: 321 },
  { id: 2, title: 'Kree', amount: 631 },
  { id: 3, title: 'Gym', amount: 51 },
];

/**
 * This router here handle all the expenses requests
 * Input: Request
 * Output: Response & Status code
 */
export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ expenses: [] });
  })

  .post('/', zValidator('json', createPostSchema), async (c) => {
    const data = await c.req.valid('json');
    const expenses = createPostSchema.parse(data);
    mockDb.push({ ...expenses, id: mockDb.length + 1 });
    c.status(201);
    return c.json(mockDb);
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = mockDb.find((expense) => expense.id === id);

    if (!expense) {
      return c.notFound();
    } else {
      return c.json({ expense });
    }
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = mockDb.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deleteExpense = mockDb.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
