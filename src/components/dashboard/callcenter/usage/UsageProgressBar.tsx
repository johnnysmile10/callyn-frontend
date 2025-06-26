
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UsageProgressBarProps {
  percentage: number;
  usedMinutes: number;
  totalMinutes: number;
  compact?: boolean;
}

const UsageProgressBar = ({ 
  percentage, 
  usedMinutes, 
  totalMinutes, 
  compact = false 
}: UsageProgressBarProps) => {
  const getProgressColor = () => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const getStatusBadge = () => {
    if (percentage >= 90) return <Badge variant="destructive" className="text-xs">Critical</Badge>;
    if (percentage >= 75) return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">Warning</Badge>;
    return <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Good</Badge>;
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Usage</span>
          {getStatusBadge()}
        </div>
        <Progress value={percentage} className="h-2" />
        <div className="text-xs text-gray-500">
          {usedMinutes}/{totalMinutes} minutes ({percentage.toFixed(1)}%)
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Monthly Usage</h3>
        {getStatusBadge()}
      </div>
      <Progress value={percentage} className="h-3" />
      <div className="flex justify-between text-sm text-gray-600">
        <span>{usedMinutes} minutes used</span>
        <span>{totalMinutes - usedMinutes} remaining</span>
      </div>
    </div>
  );
};

export default UsageProgressBar;
