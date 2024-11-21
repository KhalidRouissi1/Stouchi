import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  createBudget as createBudgetToSend,
  getAllBudgetQueryOption,
  loadingCreateBudgetQueryOptions,
} from '../../lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';

import { zodValidator } from '@tanstack/zod-form-adapter';
import { useQueryClient } from '@tanstack/react-query';
import { createBudget } from '../../../../server/routes/sharedValidation';
import { toast } from 'sonner';
export const Route = createFileRoute('/_authenticated/budget')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      userId: user!.id,
      amount: '',
    },

    onSubmit: async ({ value }) => {
      queryClient.setQueryData(loadingCreateBudgetQueryOptions.queryKey, {
        budget: value,
      });
      try {
        const newBudget = await createBudgetToSend({ value });
        toast('Expense created', {
          description: `Successfully Added to your budget`,
        });
        navigate({ to: '/' });
      } catch (e) {
        toast('Error', {
          description: 'Failed to create new expense ',
        });
      } finally {
        queryClient.setQueryData(loadingCreateBudgetQueryOptions.queryKey, {});
      }
    },
  });
  return (
    <form
      className="flex flex-col gap-y-4 max-w-xl m-auto"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="amount"
        validators={{
          onChange: createBudget.shape.amount,
        }}
        children={(field) => (
          <div>
            <Label htmlFor={field.name}>Amount</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              type="number"
              onChange={(e: any) => field.handleChange(e.target.value)}
            />
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
              <em>{field.state.meta.errors.join(', ')}</em>
            ) : null}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" className="mt-4 z-2" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Add to your budget'}
          </Button>
        )}
      />
    </form>
  );
}
