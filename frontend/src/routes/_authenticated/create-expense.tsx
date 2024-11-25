import React from 'react';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useForm } from '@tanstack/react-form';

import { toast } from 'sonner';
import {
  createExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
  oftenExpensesQueryOptions,
} from '../../lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type CreateExpense } from '../../../../server/routes/sharedValidation';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { createPostSchema } from '../../../../server/routes/sharedValidation';

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
});
const categories = ['Food', 'Bills', 'Entertainment', 'Others'];

function CreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: oftenExpenses } = useQuery(oftenExpensesQueryOptions);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: '',
      amount: '',
      date: new Date().toISOString(),
      category: 'Others',
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions
      );

      navigate({ to: '/expenses' });
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });
      try {
        const newExpense = await createExpense({ value });
        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, () => ({
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        }));

        console.log('Gisss');

        toast('Expense created', {
          description: `Successfully created new expense: ${newExpense.id}`,
        });
      } catch (e) {
        console.log(e);
        toast('Error', {
          description: 'Failed to create new expense ',
        });
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });

  const handleOftenExpenseClick = (title: string) => {
    form.setFieldValue('title', title);
  };

  return (
    <div className="  p-2">
      <div>
        <h2 className="text-[16px] font-bold&">Most expenses you buy</h2>

        <div className="flex justify-center items-center gap-6 my-3">
          {oftenExpenses?.expenses?.map((expense, index) =>
            expense.title && expense.amount ? (
              <Button
                key={index}
                onClick={() => handleOftenExpenseClick(expense.title!)}
              >
                {expense.title}
              </Button>
            ) : null
          )}
        </div>
      </div>
      <h2 className="text-[30px] font-bold&">Create Expense</h2>
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
            onChange: createPostSchema.shape.title,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
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

        <form.Field
          name="amount"
          validators={{
            onChange: createPostSchema.shape.amount,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Amount</Label>
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

        <form.Field name="category">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Category</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories?.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(', ')}</em>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field
          name="date"
          validators={{
            onChange: createPostSchema.shape.date,
          }}
        >
          {(field) => (
            <div className="self-center">
              <Calendar
                mode="single"
                selected={
                  field.state.value ? new Date(field.state.value) : undefined
                }
                onSelect={(date: Date) =>
                  field.handleChange(
                    date ? date.toISOString() : new Date().toISOString()
                  )
                }
                className="rounded-md border shadow"
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
              {isSubmitting ? '...' : 'Create Expense'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
