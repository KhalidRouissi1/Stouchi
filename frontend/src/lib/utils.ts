import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categories = ['Food', 'Bills', 'Entertainment', 'Others'];

export type Expense = {
  title: string;
  amount: string;
};

export type FinancialData = {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  expensesByCategory: Record<string, number>;
};
