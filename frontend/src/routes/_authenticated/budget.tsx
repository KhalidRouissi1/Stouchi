import { useForm } from '@tanstack/react-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import {
  createExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
  oftenExpensesQueryOptions,
} from '../../lib/api';
import { toast } from 'sonner';
import { createPostSchema } from '../../../../server/routes/sharedValidation';
import { Button } from 'react-day-picker';
import { Input } from '../../components/ui/input';
import { Label } from 'recharts';

export const Route = createFileRoute('/_authenticated/budget')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: oftenExpenses } = useQuery(oftenExpensesQueryOptions);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      budget: '',
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions,
      );

      navigate({ to: '/expenses' });
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });
      try {
        const newExpense = await createExpense({ value });
        queryClient.setQueryData(
          getAllExpensesQueryOptions.queryKey,
          (oldData) => ({
            ...existingExpenses,
            expenses: [newExpense, ...existingExpenses.expenses],
          }),
        );
        toast('Expense created', {
          description: `Successfully created new expense: ${newExpense.id}`,
        });
      } catch (e) {
        toast('Error', {
          description: 'Failed to create new expense ',
        });
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });

  return (
    <div className="  p-2">
      <h2 className="text-[30px] font-bold&">Add to your budget</h2>
      <form
        className="flex flex-col gap-y-4 max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createPostSchema.shape.budget,
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.budget}>Title</Label>
              <Input
                id={field.budget}
                name={field.budget}
                value={field.state.value}
                onBlur={field.handleBlur}
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
              {isSubmitting ? '...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
