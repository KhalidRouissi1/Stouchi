import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../lib/api'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  await new Promise((r) => setTimeout(r, 500))
  const result = await api.expenses.$get()
  if (!result.ok) {
    throw new Error('Error happend')
  }

  console.log(result)

  const data = await result.json()

  return data
}
function Expenses() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses,
  })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="p-2 max-w-3xl m-auto">
      <pre></pre>

      <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.id}</TableCell>

                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
