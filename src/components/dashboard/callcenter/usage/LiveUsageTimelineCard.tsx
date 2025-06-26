
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { UsageData } from "./types";

interface LiveUsageTimelineCardProps {
  usageData: UsageData;
  usagePercentage: number;
  remainingMinutes: number;
  daysRemaining: number;
  onUpgradeClick?: () => void;
  isLiveCall?: boolean;
}

const LiveUsageTimelineCard = ({ 
  usageData, 
  usagePercentage, 
  remainingMinutes, 
  daysRemaining,
  onUpgradeClick,
  isLiveCall = false
}: LiveUsageTimelineCardProps) => {
  const getUsageColor = () => {
    if (usagePercentage >= 90) return "text-red-600";
    if (usagePercentage >= 75) return "text-orange-600";
    if (usagePercentage >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  const getProgressColor = () => {
    if (usagePercentage >= 90) return "bg-red-500";
    if (usagePercentage >= 75) return "bg-orange-500";
    if (usagePercentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getBadgeVariant = () => {
    if (usagePercentage >= 90) return "destructive";
    if (usagePercentage >= 75) return "secondary";
    return "outline";
  };

  return (
    <Card className={`transition-all duration-300 ${isLiveCall ? 'border-blue-200 shadow-md' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            Usage Timeline
            {isLiveCall && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          </CardTitle>
          <Badge variant={getBadgeVariant()}>
            {usageData.currentPlan}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Usage Display */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${getUsageColor()}`}>
            {usageData.minutesUsed.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            of {usageData.minutesTotal.toLocaleString()} minutes used
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative">
            <Progress value={usagePercentage} className="h-3" />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{usagePercentage.toFixed(1)}% used</span>
            <span>{remainingMinutes.toLocaleString()} remaining</span>
          </div>
        </div>

        {/* Timeline Info */}
        <div className="grid grid-cols-2 gap-3 text-center text-sm">
          <div>
            <div className="font-semibold">{daysRemaining}</div>
            <div className="text-gray-500">Days Left</div>
          </div>
          <div>
            <div className="font-semibold">${usageData.estimatedMonthlyCost}</div>
            <div className="text-gray-500">Est. Cost</div>
          </div>
        </div>

        {/* Warning/Action Section */}
        {usagePercentage >= 75 && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span>High usage detected</span>
            </div>
            {onUpgradeClick && (
              <Button 
                size="sm" 
                onClick={onUpgradeClick}
                className="w-full"
                variant={usagePercentage >= 90 ? "default" : "outline"}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Upgrade Plan
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveUsageTimelineCard;
