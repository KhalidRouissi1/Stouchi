// PieChartComponent.tsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { categories } from '../lib/utils';

interface PieChartProps {
  expensesData: { category: string; amount: number }[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ expensesData }) => {
  const allCat = new Map();
  categories.forEach((category) => {
    allCat.set(category, 0);
  });

  expensesData.forEach((expense) => {
    const currentAmount = allCat.get(expense.category) || 0;
    allCat.set(expense.category, currentAmount + expense.amount);
  });

  // Prepare data for the pie chart
  const categoryData = Array.from(allCat.entries()).map(([name, value]) => ({
    name,
    y: value,
  }));
  const pieOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Expenses by Category',
    },
    tooltip: {
      pointFormat: '<b>{point.y} USD</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        },
      },
    },
    series: [
      {
        name: 'Categories',
        colorByPoint: true,
        data: categoryData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={pieOptions} />;
};

export default PieChartComponent;
