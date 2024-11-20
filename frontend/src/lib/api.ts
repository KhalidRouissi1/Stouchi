import { CreateExpense } from './../../../server/routes/sharedValidation';
import { hc } from 'hono/client';
import { type ApiRoute } from '../../../server/app';
import { queryOptions } from '@tanstack/react-query';
const client = hc<ApiRoute>('/');

export const api = client.api;
async function getCurrentUser() {
  const result = await api.me.$get();
  if (!result.ok) {
    throw new Error('Error happend');
  }

  console.log(result);

  const data = await result.json();

  return data;
}

export const userQueyOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

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

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export async function createExpense({ value }: { value: CreateExpense }) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.expenses.$post({ json: value });
  console.log(res);
  if (!res.ok) {
    throw new Error('server error');
  }
  const newExpense = await res.json();
  return newExpense;
}

export async function getOftenExpenses() {
  const result = await api.expenses.oftenExpense.$get();
  if (!result.ok) {
    throw new Error('Failed to fetch often expenses');
  }
  return result.json();
}

export const oftenExpensesQueryOptions = queryOptions({
  queryKey: ['often-expense'],
  queryFn: getOftenExpenses,
  staleTime: 1000 * 60 * 5,
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ['loading-create-expesne'],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[':id{[0-9]+}'].$delete({
    param: { id: id.toString() },
  });
  if (!res.ok) {
    throw new Error('Server error');
  }
}
