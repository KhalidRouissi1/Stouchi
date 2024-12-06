import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';
import type { ApiRoute } from '../../../server/app';
import type {
  CreateBudget,
  CreateExpense,
} from './../../../server/routes/sharedValidation';
import type { FinancialData } from './utils';

// An instance from hono/client to active the RPC (A way to make requestes directly in monolothic projects with the backedn)
const client = hc<ApiRoute>('/');
export const api = client.api;
async function getCurrentUser() {
  const result = await api.me.$get();
  if (!result.ok) {
    throw new Error('Error happend');
  }

  const data = await result.json();

  return data;
}
/* Tanstack query to run the fetch fuction getCurrentUser and put it in a state 
  slateTime means cach and in thet case we will never refetch the user automaticly
*/
export const userQueyOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

/*
  A Function to fetch all expenses with a promise that make a 1/2 Second dealy to just see in case of low internet speed what 
  the behivor of the app will be
*/
export async function getAllExpenses() {
  await new Promise((r) => setTimeout(r, 500));
  const result = await api.expenses.$get();
  if (!result.ok) {
    throw new Error('Error happend');
  }

  console.log(result);

  const data = await result.json();

  return data;
}

/* Tanstack query to run the fetch fuction getAllExpenses and put it in a state 
  slateTime means cach and in that case it will refetch each 5 minutes 
*/
export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
  staleTime: 5 * 60 * 1000,
});

/*
  A Function to fetch all Budget  using the hono RPC
*/
export async function getBudget() {
  const result = await api.budget.$get();
  if (!result.ok) {
    throw new Error('Error happend');
  }
  const data = await result.json();
  return data;
}
/* Tanstack query to run fetch in the fuction getBudget and put it in a state
 */
export const getAllBudgetQueryOption = queryOptions({
  queryKey: ['get-all-budget'],
  queryFn: getBudget,
});

/*
  A Function that accept Value of type CreateExpensethat in face is type of our DB Schema and post it into the server
  With a delay of 3sec to see the adding without refetch the listing of all expenses 
*/

export async function createExpense({ value }: { value: CreateExpense }) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) {
    throw new Error('server error');
  }
  const newExpense = await res.json();
  return newExpense;
}

/*
  A Function that make a get request into the server to get the often expenses that  grouped by the server
*/

export async function getOftenExpenses() {
  const result = await api.expenses.oftenExpense.$get();
  if (!result.ok) {
    throw new Error('Failed to fetch often expenses');
  }
  return result.json();
}
/* Tanstack query to run fetch in the fuction getOftenExpenses and put it in a state
    with a 5 minute refetch time -> cache 
 */
export const oftenExpensesQueryOptions = queryOptions({
  queryKey: ['often-expense'],
  queryFn: getOftenExpenses,
  staleTime: 10 * 60 * 1000,
});
/* Tanstack query to run to make an empty state too let the create expense done and than it disaper
 */

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ['loading-create-expesne'],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});
/* Tanstack query to run to make an empty state too let the create budget done and than it disaper
 */
export const loadingCreateBudgetQueryOptions = queryOptions<{
  budget?: CreateBudget;
}>({
  queryKey: ['loading-create-expesne'],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

/*
  A Function that accept the id of an expense type of number to request delet from the server
*/

export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[':id{[0-9]+}'].$delete({
    param: { id: id.toString() },
  });
  if (!res.ok) {
    throw new Error('Server error');
  }
}

/*
  A Function that accept Value of type CreateBudget in face is type of our DB Schema and post it into the server
  With a delay of 3sec to see the change of calcul when it change the state
*/

export async function createBudget({ value }: { value: CreateBudget }) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.budget.$post({ json: value });
  if (!res.ok) {
    throw new Error('server error');
  }
  const newBudget = await res.json();
  return newBudget;
}

/*
  A Function that a get the total spent of a user 
*/
export async function getTotalSpent() {
  const result = await api.expenses['total-spent'].$get();
  if (!result.ok) {
    throw new Error('Failed to fetch total spent');
  }
  const data = await result.json();
  return data.total;
}
/*
  - A Function that a take as parametrs a prompt and data of the user and it pass it to the OpenAI model to fetch an 
  ai response that helps the user to make his goals 
  - The apiKey is the key from the enviromment variables that authorize us to use that service
*/
export async function callOpenai({
  prompt,
  context,
}: {
  prompt: string;
  context: FinancialData;
}) {
  const enhancedPrompt = `
Based on the following financial context:
- Total Budget: $${context.totalBudget}
- Total Spent: $${context.totalSpent}
- Remaining Budget: $${context.remainingBudget}
- Expenses by Category: ${JSON.stringify(context.expensesByCategory)}

User Question: ${prompt}

Please provide financial advice considering this context. make it short not a lot of words make it in bullet points`;
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a financial assistant.' },
        { role: 'user', content: enhancedPrompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || 'Failed to fetch OpenAI response');
  }

  const result = await response.json();
  console.log(result.choices[0].message.content);
  return result.choices[0].message.content;
}
