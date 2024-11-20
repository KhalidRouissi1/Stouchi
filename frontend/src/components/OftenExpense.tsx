import { useQuery } from '@tanstack/react-query';
import { oftenExpensesQueryOptions } from '../lib/api';
import { Button } from './ui/button';

const OftenExpense = () => {
  const {
    data: oftenExpenses,
    isLoading,
    error,
  } = useQuery(oftenExpensesQueryOptions);

  if (isLoading) {
    return <div>Loading often expenses...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col self-center">
      <h2 className="">Often expenses</h2>

      <div className="flex space-x-4 max-w-xl m-auto my-6">
        {oftenExpenses?.expenses?.map(
          (expense: { title: string; amount: number }) => (
            <Button
              key={expense.title}
            >{`${expense.title}: $${expense.amount}`}</Button>
          ),
        )}
      </div>
    </div>
  );
};

export default OftenExpense;
