import { useQuery } from '@tanstack/react-query';
import { oftenExpensesQueryOptions } from '../lib/api';
import { Button } from './ui/button';

const OftenExpense = ({ form }) => {
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

  const handleOftenExpenseClick = (title: string, amount: number) => {
    // Directly set form field values
    form.setFieldValue('title', title);
    form.setFieldValue('amount', amount.toString());
  };

  return (
    <div className="flex flex-col self-center">
      <h2 className="">Often expenses</h2>
      <div className="flex space-x-4 max-w-xl m-auto my-6">
        {oftenExpenses?.expenses?.map(
          (expense: { title: string; amount: number }) => (
            <Button
              key={expense.title}
              onClick={() =>
                handleOftenExpenseClick(expense.title, expense.amount)
              }
            >
              {`${expense.title}`}
            </Button>
          ),
        )}
      </div>
    </div>
  );
};

export default OftenExpense;
