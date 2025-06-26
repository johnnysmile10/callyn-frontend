
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UsageProgressBarProps {
  percentage: number;
  minutesUsed: number;
  minutesTotal: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showThresholds?: boolean;
}

const UsageProgressBar = ({ 
  percentage, 
  minutesUsed, 
  minutesTotal, 
  showLabels = true,
  size = 'md',
  showThresholds = false
}: UsageProgressBarProps) => {
  const getProgressColor = () => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getHeightClass = () => {
    switch (size) {
      case 'sm': return 'h-2';
      case 'lg': return 'h-6';
      default: return 'h-3';
    }
  };

  return (
    <div className="space-y-2">
      {showLabels && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {minutesUsed.toLocaleString()} minutes used
          </span>
          <span className="text-gray-600">
            {minutesTotal.toLocaleString()} total
          </span>
        </div>
      )}
      
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn("w-full", getHeightClass())}
        />
        <div 
          className={cn(
            "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
            getProgressColor(),
            getHeightClass()
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        
        {showThresholds && (
          <>
            {/* 75% threshold line */}
            <div 
              className="absolute top-0 w-0.5 h-full bg-orange-300 opacity-60"
              style={{ left: '75%' }}
            />
            {/* 90% threshold line */}
            <div 
              className="absolute top-0 w-0.5 h-full bg-red-300 opacity-60"
              style={{ left: '90%' }}
            />
          </>
        )}
      </div>
      
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>{percentage.toFixed(1)}% used</span>
          <span>{(100 - percentage).toFixed(1)}% remaining</span>
        </div>
      )}
    </div>
  );
};

export default UsageProgressBar;
