import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { deleteExpense, getAllExpensesQueryOptions } from '../lib/api'
import { Button } from './ui/button'

const ExpenseDeleteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteExpense,

    onError: () => {
      toast('Error', {
        description: `Failed to delete expense ${id}`,
      })
    },
    onSuccess: () => {
      toast('Expense Deleted', {
        description: `Successfully  deleted expense ${id}`,
      })
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        })
      )
    },
  })

  return (
    <div>
      <Button
        disabled={mutation.isPending}
        variant="outline"
        size="icon"
        onClick={() => {
          mutation.mutate({ id })
        }}
      >
        {mutation.isPending ? '...' : <Trash className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export default ExpenseDeleteButton
