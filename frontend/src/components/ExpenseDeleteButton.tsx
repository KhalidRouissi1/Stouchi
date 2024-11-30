import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { deleteExpense, getAllExpensesQueryOptions } from '../lib/api';
import { Button } from './ui/button';

const ExpenseDeleteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  /**
   * Renders a button that allows the user to delete a specific expense by its ID.
   * @param {number} id The ID of the expense to be deleted.
   * @return {ReactNode}  A React element that renders a Trash icon to delete an element
   */
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      // Display an error toast message when it fails
      toast('Error', {
        description: `Failed to delete expense ${id}`,
      });
    },
    onSuccess: () => {
      // Display an success toast message when it success

      toast('Expense Deleted', {
        description: `Successfully  deleted expense ${id}`,
      });
      // Update the cached data
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        })
      );
    },
  });

  return (
    <div>
      <Button
        disabled={mutation.isPending}
        variant="outline"
        size="icon"
        onClick={() => {
          mutation.mutate({ id });
        }}
      >
        {mutation.isPending ? '...' : <Trash className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default ExpenseDeleteButton;
