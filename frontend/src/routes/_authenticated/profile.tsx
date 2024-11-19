import { createFileRoute } from '@tanstack/react-router';
import { userQueyOptions } from '../../lib/api';
export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/ui/button';
import ShinyButton from '@/components/magicui/shiny-button';
function Profile() {
  const { isPending, error, data } = useQuery(userQueyOptions);
  if (isPending) return 'loading';
  if (error) return 'Not logged in: ' + error.message;

  return (
    <div className="p-2">
      <div className="flex items-center gap-4 my-4">
        <Avatar>
          {data.user.picture && (
            <AvatarImage src={data.user.picture} alt={data.user.given_name} />
          )}
          <AvatarFallback>{data.user.given_name}</AvatarFallback>
        </Avatar>

        <p>
          {data.user.given_name} {data.user.family_name}
        </p>
      </div>
      <ShinyButton href="api/logout">Login</ShinyButton>
    </div>
  );
}
