import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { api } from '../../lib/api';
export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: '',
      amount: '',
    },
    onSubmit: async ({ value }) => {
      // await new Promise((c) => setTimeout(c, 3000));
      const res = await api.expenses.$post({ json: value });
      console.log(res);
      if (!res.ok) {
        throw new Error('server error');
      }
      navigate({ to: '/expenses' });
    },
  });
  return (
    <div className="p-2 m-auto max-w-xl ">
      <h2>Hello sqdsqdsq About!</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: any) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(', ')}</em>
              ) : null}
            </>
          )}
        />

        <form.Field
          name="amount"
          children={(field) => (
            <>
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
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="mt-4" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
