import { createFileRoute, Outlet } from '@tanstack/react-router';
import { userQueyOptions } from '../lib/api';

const Login = () => (
  <>
    <div>You have to login</div>
    <a href="/api/login">Login!</a>
  </>
);

const Component = () => {
  const { user } = Route.useRouteContext();
  console.log(user);
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueyOptions);
      return data;
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
