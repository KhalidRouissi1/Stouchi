import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { DollarSign, Wallet } from 'lucide-react';
import AdviceAI from '../../components/AdviceAi';
import KhalidProSpinner from '../../components/KhalidProSpinner';
import { CardDescription } from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  getAllBudgetQueryOption,
  getAllExpensesQueryOptions,
  getTotalSpent,
} from '../../lib/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { byCategory } from '../../lib/utils';
import PieChartComponent from '../../components/PieChartComponent';
import StatsCard from '@/components/StatsCardProps';
/**
 * this component it return a list of Expenses filtered in client side
 */
function DashboardPage() {
  // Get total expense using tanstack query
  const {
    isLoading: isTotalSpentLoading,
    error: totalSpentError,
    data: totalSpentData,
  } = useQuery({
    queryKey: ['total-spent'],
    queryFn: getTotalSpent,
  });
  // Get budget using tanstack query

  const {
    data: dataBudget,
    error: budgetError,
    isLoading: isBudgetLoading,
  } = useQuery(getAllBudgetQueryOption);
  // Get all expense using tanstack query

  const {
    data: allExpenses,
    error: allExpensesError,
    isLoading: isAllExpensesLoading,
  } = useQuery(getAllExpensesQueryOptions);
  // if any of the states are loading so the KhalidProSpinner will load

  if (isTotalSpentLoading || isBudgetLoading || isAllExpensesLoading) {
    return (
      <div>
        <KhalidProSpinner h={'80'} />
      </div>
    );
  }
  // if any Error happend it gonna show the error message

  if (totalSpentError || budgetError || allExpensesError) {
    return (
      <div>
        Error:{' '}
        {totalSpentError?.message ||
          budgetError?.message ||
          allExpensesError?.message}
      </div>
    );
  }
  // Check if there  dataBudget?.budget?.amount is not null so it will convert it to float else it gonna be 0
  const budget = dataBudget?.budget?.amount
    ? parseFloat(dataBudget?.budget?.amount)
    : 0;
  // Check if there  totalSpentData is not null so it will convert it to float else it gonna be 0
  const totalSpent = totalSpentData ? parseFloat(totalSpentData) : 0;
  const remainingBudget = budget - totalSpent;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <StatsCard
          title="Total Expenses"
          icon={DollarSign}
          amount={totalSpent}
          isLoading={isTotalSpentLoading}
          total={budget}
          progressLabel="of budget"
        ></StatsCard>
        <StatsCard
          title="Remaining Budget"
          icon={Wallet}
          amount={remainingBudget}
          isLoading={isBudgetLoading}
          total={budget}
          progressLabel="remaining"
        ></StatsCard>
      </div>
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Expenses </TabsTrigger>
          <TabsTrigger value="expenses">Advice?</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <Card>
            <CardContent className="space-y-4">
              <PieChartComponent allExpenses={allExpenses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expenses Details</CardTitle>
              <CardDescription>
                <AdviceAI
                  financialData={{
                    budget,
                    totalSpent,
                    remainingBudget,
                    expensesByCategory: Object.fromEntries(byCategory),
                  }}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
/**
 * It link this component to the tanstack router
 */
export const Route = createFileRoute('/_authenticated/')({
  component: DashboardPage,
});

export default DashboardPage;
