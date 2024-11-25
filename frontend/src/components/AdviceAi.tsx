import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { callOpenai } from '../lib/api';
import KhalidProSpinner from './KhalidProSpinner';
import { Button } from './ui/button';

type FinancialData = {
  budget: number;
  totalSpent: number;
  remainingBudget: number;
  expensesByCategory: Record<string, number>;
};

interface AdviceAIProps {
  financialData: FinancialData;
}

export default function AdviceAI({ financialData }: AdviceAIProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      prompt: '',
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await callOpenai({
          prompt: value.prompt,
          context: {
            totalBudget: financialData.budget,
            totalSpent: financialData.totalSpent,
            remainingBudget: financialData.remainingBudget,
            expensesByCategory: financialData.expensesByCategory,
          },
        });
        setResponse(result || 'No advice generated');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch advice');
        } else {
          setError('Failed to fetch advice');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Current Budget:{' '}
        <span className="font-bold">${financialData.budget.toFixed(2)}</span> |
        Spent:
        <span className="font-bold">
          ${financialData.totalSpent.toFixed(2)}{' '}
        </span>
        | Remaining:
        <span className="font-bold">
          ${financialData.remainingBudget.toFixed(2)}
        </span>
      </div>

      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="prompt">
          {(field) => (
            <div className="flex flex-col gap-4">
              <Label
                htmlFor={field.name}
                className="mt-4 text-black dark:text-white"
              >
                Ask for financial advice based on your current spending...
              </Label>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.target.value)
                }
                placeholder="e.g., Should I make a major purchase given my current budget?"
              />
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          className="text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? <KhalidProSpinner h={'4'} /> : 'Ask AI'}
        </Button>
      </form>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded">{error}</div>
      )}

      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="whitespace-pre-wrap text-black">{response}</p>
        </div>
      )}
    </div>
  );
}
