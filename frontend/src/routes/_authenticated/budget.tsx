import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/budget')({
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
