import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import React from 'react';
import { toast } from 'sonner';
import { createBudget as createBudgetFunc } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { loadingCreateBudgetQueryOptions } from '../../lib/api';
import { createBudget } from '../../../../server/routes/sharedValidation';

/**
 * It link this component to the tanstack router
 */
export const Route = createFileRoute('/_authenticated/budget')({
  component: BudgetComponent,
});

/**
 * this component it contain a form that Creat a new budget each time you submit
 */
function BudgetComponent() {
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
      /**
       * Set the state to loading
       */
      queryClient.setQueryData(loadingCreateBudgetQueryOptions.queryKey, {
        budget: value,
      });
      try {
        /**
         * Call the create function when submit
         */
        await createBudgetFunc({ value });
        toast('Expense created', {
          description: 'Successfully Added to your budget',
        });
        navigate({ to: '/' });
      } catch (e) {
        console.log(e);
        toast('Error', {
          description: 'Failed to create new Budget ',
        });
      } finally {
        /**
         * stop the loading state
         */
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
        validators={{ onChange: createBudget.shape.amount }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Your new Budget</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
            />
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
              <em>{field.state.meta.errors.join(', ')}</em>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" className="mt-4 z-2" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Add to your budget'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
