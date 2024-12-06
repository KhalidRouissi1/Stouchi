import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsCardProps } from '@/lib/utils';
/**
 * This component it takes props of StatsCardProps and it returns a Card with Progress bar depend on that data it passed in the props
 */
const StatsCard = ({
  title,
  icon: Icon,
  amount,
  isLoading = false,
  total = 0,
  formatter = (value) => `$${value.toFixed(2)}`,
  progressLabel,
}: StatsCardProps) => {
  const percentage = total > 0 ? Math.min((amount / total) * 100, 100) : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <Skeleton className="w-[80px] h-[30px] rounded-full" />
          ) : (
            formatter(amount)
          )}
        </div>
        <Progress value={percentage} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {total > 0
            ? `${percentage.toFixed(0)}% ${progressLabel || ''}`
            : 'No budget set'}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
