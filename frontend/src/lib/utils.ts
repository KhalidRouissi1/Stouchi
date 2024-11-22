import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categories = ['Food', 'Bills', 'Entertainment', 'Others'];

export const generateSpikeData = (expenses: any) => {
  const today = new Date();
  // Get the 6 days before today

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 6 + i);
    return date.toISOString().split('T')[0];
  });

  const expensesMap = new Map(days.map((day) => [day, 0]));

  // Sum expenses for each day
  expenses.forEach((expense: any) => {
    const date = expense.date.split('T')[0];
    if (expensesMap.has(date)) {
      expensesMap.set(date, expensesMap.get(date) + parseFloat(expense.amount));
    }
  });

  const values = days.map((day) => expensesMap.get(day) || 0);

  return {
    days: days.map((day) =>
      new Date(day).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    ),
    values,
  };
};
