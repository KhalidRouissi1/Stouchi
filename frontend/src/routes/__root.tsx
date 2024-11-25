import { useState, useEffect } from 'react';
import { type QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const Root = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDark(!isDark);
  };

  return (
    <>
      <NavBar toggleDarkMode={toggleDarkMode} isDark={isDark} />
      <hr />
      <div className="mt-10 p-2 max-w-3xl m-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

function NavBar({
  toggleDarkMode,
  isDark,
}: {
  toggleDarkMode: () => void;
  isDark: boolean;
}) {
  return (
    <div className="flex justify-between items-center p-4 max-w-6xl m-auto">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className="text-2xl font-bold">
          Stouch <span className="ml-[-3px]  text-primary">i</span>
        </h1>
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expense
        </Link>

        <Link to="/budget" className="[&.active]:font-bold">
          Budget
        </Link>

        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDark ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </div>

      <Toaster />
    </div>
  );
}

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});
