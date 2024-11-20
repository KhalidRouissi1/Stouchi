import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { createFileRoute } from '@tanstack/react-router';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Wallet } from 'lucide-react';

async function getTotalSpent() {
  const result = await api.expenses['total-spent'].$get();
  if (!result.ok) {
    throw new Error('Error happened');
  }

  console.log(result);

  const data = await result.json();

  return data;
}

function Index() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['total-spent'],
    queryFn: getTotalSpent,
  });

  if (error) return 'An error has occurred: ' + error.message;

  // Ensure data.total is a number
  const totalSpent = data ? parseFloat(data.total) : 0;
  const budget = 10000;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex max-w-3xl m-auto gap-64">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${isPending ? '...' : totalSpent ? totalSpent.toFixed(2) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalSpent ? ((totalSpent / budget) * 100).toFixed(0) : 0}% of
              budget
            </p>
            <Progress value={(totalSpent / budget) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="w-[350px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Remaining Budget
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">
              ${budget ? (budget - totalSpent ? totalSpent : 0).toFixed(2) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {budget
                ? (
                    ((budget - totalSpent ? totalSpent : 0) / budget) *
                    100
                  ).toFixed(0)
                : 0}
              % remaining
            </p>
          </CardContent>
        </Card>
      </div>
      <Progress value={33} />
    </div>
  );
}

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});
