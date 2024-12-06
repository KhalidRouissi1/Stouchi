import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

/***
 * This is the main and entrrypoint tanstack router componente that has all the links
 *
 * This component has the toggle button to toggle between dark mode or light mode
 */
const Root = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // a tanstack query to toggle between dark and light mode by acceed to the index.html root calss and add and delete dark from the className
  useQuery({
    queryKey: ['darkMode'],
    queryFn: () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
      return isDarkMode;
    },
    staleTime: Infinity,
  });

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
      <NavBar
        toggleDarkMode={toggleDarkMode}
        isDark={isDark}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <hr />
      <div className="mt-10 p-2 max-w-3xl m-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

// A NavBar function that render a ReactNode that has all the links to the other componenets
function NavBar({
  toggleDarkMode,
  isDark,
  isMenuOpen,
  setIsMenuOpen,
}: {
  toggleDarkMode: () => void;
  isDark: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) {
  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="[&.active]:font-bold"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/about"
        className="[&.active]:font-bold"
        onClick={() => setIsMenuOpen(false)}
      >
        About
      </Link>
      <Link
        to="/expenses"
        className="[&.active]:font-bold"
        onClick={() => setIsMenuOpen(false)}
      >
        Expenses
      </Link>
      <Link
        to="/create-expense"
        className="[&.active]:font-bold"
        onClick={() => setIsMenuOpen(false)}
      >
        Create Expense
      </Link>
      <Link
        to="/budget"
        className="[&.active]:font-bold"
        onClick={() => setIsMenuOpen(false)}
      >
        Budget
      </Link>
      <Link
        to="/coinGame"
        className="[&.active]:font-bold"
        onClick={() => setIsMenuOpen(false)}
      >
        Broke?
      </Link>
      <Link
        to="/profile"
        className="[&.active]:font-bold"
        onClick={() => setIsMenuOpen(false)}
      >
        Profile
      </Link>
    </>
  );

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 max-w-6xl m-auto">
        <Link to="/" className="[&.active]:font-bold">
          <h1 className="text-2xl font-bold">
            Stouch <span className="ml-[-3px] text-primary">i</span>
          </h1>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <NavLinks />
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDark ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDark ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Menu className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <NavLinks />
            </div>
          </div>
        )}

        <Toaster />
      </div>
    </div>
  );
}

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});
