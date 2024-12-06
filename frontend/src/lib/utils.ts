// Shadcn utils

import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { LucideIcon } from 'lucide-react';
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

type FinancialDataType = {
  budget: number;
  totalSpent: number;
  remainingBudget: number;
  expensesByCategory: Record<string, number>;
};

export interface AdviceAIProps {
  financialData: FinancialDataType;
}

export const byCategory = new Map();
categories.forEach((category) => {
  byCategory.set(category, 0);
});

interface AllExpenses {
  expenses: {
    id: number;
    title: string | null;
    amount: string;
    userId: string;
    date: string;
    category: string;
  }[];
}
export interface PieChartComponentProps {
  allExpenses?: AllExpenses;
}
/* eslint-disable */
export interface StatsCardProps {
  title: string;
  icon: LucideIcon;
  amount: number;
  isLoading?: boolean;
  total?: number;
  formatter?: (value: number) => string;
  progressLabel?: string;
}
