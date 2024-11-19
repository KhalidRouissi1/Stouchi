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
