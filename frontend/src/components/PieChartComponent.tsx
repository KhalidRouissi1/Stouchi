import Highcharts from 'highcharts';
import React from 'react';
import { byCategory, PieChartComponentProps } from '../lib/utils';
import PieChart from 'highcharts-react-official';

/**
 * Renders a pie chart from Highcharts library that depende on Category of
 * it accept {PieChartComponentProps} allExpenses The object that has all expenses 
    (I pass all expense for scalability resons like want to make more than one type of charts)
 * it return React.FC<PieChartComponentProps> that render the Piechart
 */
const PieChartComponent: React.FC<PieChartComponentProps> = ({
  allExpenses,
}) => {
  allExpenses?.expenses.forEach((expense) => {
    if (byCategory.has(expense.category)) {
      byCategory.set(
        expense.category,
        byCategory.get(expense.category) + parseFloat(expense.amount)
      );
    }
  });
  const pieChartData = Array.from(byCategory.entries()).map(
    ([category, total]) => ({
      name: category,
      y: total,
    })
  );

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
  };

  return <PieChart highcharts={Highcharts} options={pieChartOptions} />;
};

export default PieChartComponent;
