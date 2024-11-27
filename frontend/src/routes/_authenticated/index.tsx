import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import Highcharts from 'highcharts'
import PieChart from 'highcharts-react-official'
import { DollarSign, Wallet } from 'lucide-react'
import React from 'react'
import AdviceAI from '../../components/AdviceAi'
import KhalidProSpinner from '../../components/KhalidProSpinner'
import { CardDescription } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import { Skeleton } from '../../components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import {
  getAllBudgetQueryOption,
  getAllExpensesQueryOptions,
  getTotalSpent,
} from '../../lib/api'
import { categories } from '../../lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function DashboardPage() {
  const byCategory = new Map()
  categories.forEach((category) => {
    byCategory.set(category, 0)
  })

  const {
    isLoading: isTotalSpentLoading,
    error: totalSpentError,
    data: totalSpentData,
  } = useQuery({
    queryKey: ['total-spent'],
    queryFn: getTotalSpent,
  })

  const {
    data: dataBudget,
    error: budgetError,
    isLoading: isBudgetLoading,
  } = useQuery(getAllBudgetQueryOption)

  const {
    data: allExpenses,
    error: allExpensesError,
    isLoading: isAllExpensesLoading,
  } = useQuery(getAllExpensesQueryOptions)

  if (isTotalSpentLoading || isBudgetLoading || isAllExpensesLoading) {
    return (
      <div>
        <KhalidProSpinner h={80} />
      </div>
    )
  }

  if (totalSpentError || budgetError || allExpensesError) {
    return (
      <div>
        Error:{' '}
        {totalSpentError?.message ||
          budgetError?.message ||
          allExpensesError?.message}
      </div>
    )
  }

  allExpenses?.expenses.forEach((expense) => {
    if (byCategory.has(expense.category)) {
      byCategory.set(
        expense.category,
        byCategory.get(expense.category) + parseFloat(expense.amount)
      )
    }
  })

  const pieChartData = Array.from(byCategory.entries()).map(
    ([category, total]) => ({
      name: category,
      y: total,
    })
  )

  const pieChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Expenses by Category',
    },
    series: [
      {
        name: 'Expenses',
        colorByPoint: true,
        data: pieChartData,
      },
    ],
  }

  const budget = dataBudget?.budget?.amount
    ? parseFloat(dataBudget?.budget?.amount)
    : 0
  const totalSpent = totalSpentData ? parseFloat(totalSpentData) : 0
  const remainingBudget = budget - totalSpent

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex gap-2">
              $
              {isTotalSpentLoading ? (
                <Skeleton className="w-[80px] h-[30px] rounded-full" />
              ) : (
                totalSpent.toFixed(2)
              )}
            </div>
            <Progress
              value={
                budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0
              }
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {budget > 0
                ? `${Math.min((totalSpent / budget) * 100, 100).toFixed(0)}% of budget`
                : 'No budget set'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Remaining Budget
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isBudgetLoading ? (
              <Skeleton className="w-[80px] h-[30px] rounded-full" />
            ) : (
              <div className="text-2xl font-bold">
                ${remainingBudget.toFixed(2)}
              </div>
            )}
            <Progress
              value={
                budget > 0 ? Math.min((remainingBudget / budget) * 100, 100) : 0
              }
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {budget > 0
                ? `${Math.min((remainingBudget / budget) * 100, 100).toFixed(
                    0
                  )}% remaining`
                : 'No budget set'}
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Expenses </TabsTrigger>
          <TabsTrigger value="expenses">Advice?</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <Card>
            <CardContent className="space-y-4">
              <PieChart highcharts={Highcharts} options={pieChartOptions} />
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
  )
}

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardPage,
})

export default DashboardPage
