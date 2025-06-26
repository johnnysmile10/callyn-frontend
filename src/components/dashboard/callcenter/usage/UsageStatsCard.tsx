
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { UsageData } from "./types";

interface UsageStatsCardProps {
  usageData: UsageData;
  usagePercentage: number;
  remainingMinutes: number;
  daysRemaining: number;
  onUpgradeClick?: () => void;
  onViewDetailsClick?: () => void;
}

const UsageStatsCard = ({ 
  usageData, 
  usagePercentage, 
  remainingMinutes, 
  daysRemaining,
  onUpgradeClick,
  onViewDetailsClick
}: UsageStatsCardProps) => {
  const getUsageStatus = () => {
    if (usagePercentage >= 90) return { text: "Critical", color: "bg-red-100 text-red-800" };
    if (usagePercentage >= 75) return { text: "High Usage", color: "bg-orange-100 text-orange-800" };
    if (usagePercentage >= 50) return { text: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    return { text: "On Track", color: "bg-green-100 text-green-800" };
  };

  const status = getUsageStatus();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Usage Overview
          </CardTitle>
          <Badge className={status.color}>
            {status.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Usage Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {usageData.minutesUsed.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Minutes Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {remainingMinutes.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Remaining</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">{daysRemaining}</span>
            </div>
            <div className="text-xs text-gray-500">Days Left</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">${usageData.estimatedMonthlyCost}</span>
            </div>
            <div className="text-xs text-gray-500">Est. Cost</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{usageData.currentPlan}</div>
            <div className="text-xs text-gray-500">Current Plan</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3">
          {onViewDetailsClick && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onViewDetailsClick}
              className="flex-1"
            >
              View Details
            </Button>
          )}
          {onUpgradeClick && usagePercentage > 60 && (
            <Button 
              size="sm" 
              onClick={onUpgradeClick}
              className="flex-1"
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Upgrade Plan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageStatsCard;
