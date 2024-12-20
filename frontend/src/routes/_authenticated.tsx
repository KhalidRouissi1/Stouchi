import { createFileRoute, Outlet } from '@tanstack/react-router';

import ShinyButton from '../components/magicui/shiny-button';
import { userQueyOptions } from '../lib/api';

const Login = () => (
  <>
    <div className="m-10 text-2xl">You have to login or register</div>
    <div className="flex flex-col gap-y-2">
      <ShinyButton href="/api/login">Login</ShinyButton>
      <ShinyButton href="/api/register">register</ShinyButton>
    </div>
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
      console.log(e);
      return { user: null };
    }
  },
  component: Component,
});
