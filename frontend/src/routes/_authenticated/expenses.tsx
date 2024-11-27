import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import ExpenseDeleteButton from '../../components/ExpenseDeleteButton'
import { Button } from '../../components/ui/button'
import { Skeleton } from '../../components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from '../../lib/api'
import { categories } from '../../lib/utils'

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

function Expenses() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions)

  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  )

  const filteredExpenses =
    selectedCategory === 'All'
      ? data?.expenses
      : data?.expenses?.filter(
          (expense) => expense.category === selectedCategory
        )

  if (error) {
    return 'An error has occurred: ' + error.message
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell className="font-medium">
                {loadingCreateExpense?.expense.title}
              </TableCell>
              <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
              <TableCell>
                {loadingCreateExpense?.expense.date.slice(
                  0,
                  loadingCreateExpense.expense.date.indexOf('T')
                )}
              </TableCell>
              <TableCell>{loadingCreateExpense?.expense.category}</TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
            </TableRow>
          )}
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
            : filteredExpenses?.map((expense, index) => (
                <TableRow key={expense.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    <ExpenseDeleteButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Expenses
