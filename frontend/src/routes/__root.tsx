import { type QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
const Root = () => {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2  max-w-3xl m-auto">
        <Outlet />
      </div>
    </>
  );
};

function NavBar() {
  return (
    <div className="flex justify-between max-w-2xl m-auto items-baseline">
      <Link to="/" className="[&.active]:font-bold]">
        <h1 className="text-2xl font-bold">Stouchi</h1>
      </Link>

      <div className="p-2 flex gap-2 ">
        <Link to="/about" className="[&.active]:font-bold]">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold]">
          expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold]">
          Create-expense
        </Link>
        <Link to="/profile" className="[&.active]:font-bold]">
          Profile
        </Link>
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
