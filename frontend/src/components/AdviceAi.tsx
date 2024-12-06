import { useMutation } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { callOpenai } from '../lib/api';
import KhalidProSpinner from './KhalidProSpinner';
import { Button } from './ui/button';
import { AdviceAIProps } from '../lib/utils';

/**
 * Renders a from that takes a prompt and pass it to the OpenAi to generate a ai response
 * @param {AdviceAIProps}  financialData It has the data of the user budget spent remainingBudget spent by category
 * @return {ReactNode}  A React element that renders a form and a text that has ai response
 */

export default function AdviceAI({ financialData }: AdviceAIProps) {
  /**
   * We used tanstack useMutation to make an API call to get AI advice based on data and prompt
   */

  const {
    mutate,
    data: response,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (prompt: string) => {
      // Call the api and pass params context and prompt
      const result = await callOpenai({
        prompt,
        context: {
          totalBudget: financialData.budget,
          totalSpent: financialData.totalSpent,
          remainingBudget: financialData.remainingBudget,
          expensesByCategory: financialData.expensesByCategory,
        },
      });
      return result || 'No advice generated';
    },
  });
  // init the form that will containe the data "Prompt"

  const form = useForm({
    defaultValues: {
      prompt: '',
    },
    onSubmit: ({ value }) => {
      mutate(value.prompt);
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
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g., Should I make a major purchase given my current budget?"
              />
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          className="text-white p-2 rounded"
          disabled={isPending}
        >
          {isPending ? <KhalidProSpinner h={'4'} /> : 'Ask AI'}
        </Button>
      </form>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded">
          {(error as Error).message || 'Failed to fetch advice'}
        </div>
      )}

      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="whitespace-pre-wrap text-black">{response}</p>
        </div>
      )}
    </div>
  );
}
