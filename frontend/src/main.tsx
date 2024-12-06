import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
