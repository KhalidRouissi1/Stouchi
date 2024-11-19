import { createFileRoute } from '@tanstack/react-router';
import { userQueyOptions } from '../../lib/api';
export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/ui/button';

function Profile() {
  const { isPending, error, data } = useQuery(userQueyOptions);
  if (isPending) return 'loading';
  if (error) return 'Not logged in: ' + error.message;

  return (
    <div className="p-2">
      Hello from Profile!
      <p>Hello {data.user.family_name}</p>
      <Button>
        <a href="/api/logout">Logout!</a>
      </Button>
    </div>
  );
}
