import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Trigger } from '@radix-ui/react-tabs';

// Mock API function (replace with your actual API call)
async function getTotalSpent() {
  // Simulate API call
  return {
    total: 7500,
    monthlyBreakdown: [
      { month: 'Jan', amount: 2500 },
      { month: 'Feb', amount: 3000 },
      { month: 'Mar', amount: 2000 },
      { month: 'Apr', amount: 7500 },
    ],
  };
}

function DashboardPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ['total-spent'],
    queryFn: getTotalSpent,
  });

  if (error) return <div>Error: {error.message}</div>;

  const budget = 10000;
  const totalSpent = data ? parseFloat(data.total) : 0;
  const remainingBudget = budget - totalSpent;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Expenses Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${isPending ? '...' : totalSpent.toFixed(2)}
            </div>
            <Progress value={(totalSpent / budget) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {((totalSpent / budget) * 100).toFixed(0)}% of budget
            </p>
          </CardContent>
        </Card>

        {/* Remaining Budget Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Remaining Budget
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${remainingBudget.toFixed(2)}
            </div>
            <Progress
              value={(remainingBudget / budget) * 100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {((remainingBudget / budget) * 100).toFixed(0)}% remaining
            </p>
          </CardContent>
        </Card>

        {/* Expense Trend Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="text-green-500 mr-2" />
              <span className="text-sm text-muted-foreground">
                +12.5% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Budget Utilization Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Utilization
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingDown className="text-red-500 mr-2" />
              <span className="text-sm text-muted-foreground">
                Pace: $1,875/week
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Detailed Views */}
      <Tabs defaultValue="monthly-expenses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly-expenses">Monthly Expenses</TabsTrigger>
          <Trigger value="category-breakdown">Category Breakdown</Trigger>
        </TabsList>
        <TabsContent value="monthly-expenses">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data?.monthlyBreakdown || []}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="category-breakdown">
          <Card>
            <CardContent className="pt-6">
              <div>Category breakdown chart placeholder</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardPage,
});

export default DashboardPage;
