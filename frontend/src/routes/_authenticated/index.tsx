import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { createFileRoute } from '@tanstack/react-router'

async function getTotalSpent() {
  const result = await api.expenses['total-spent'].$get()
  if (!result.ok) {
    throw new Error('Error happend')
  }

  console.log(result)

  const data = await result.json()

  return data
}
function Index() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['total-spent'],
    queryFn: getTotalSpent,
  })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? '...' : data.total}</CardContent>
      </Card>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})
