
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, TrendingUp, Activity } from "lucide-react";
import UsageProgressBar from "./UsageProgressBar";

interface UsageStatsCardProps {
  totalMinutes: number;
  usedMinutes: number;
  totalCalls: number;
  averageCallDuration: number;
  compact?: boolean;
}

const UsageStatsCard = ({ 
  totalMinutes, 
  usedMinutes, 
  totalCalls, 
  averageCallDuration,
  compact = false
}: UsageStatsCardProps) => {
  const remainingMinutes = totalMinutes - usedMinutes;
  const usagePercentage = (usedMinutes / totalMinutes) * 100;

  if (compact) {
    return (
      <div className="space-y-3">
        <UsageProgressBar
          percentage={usagePercentage}
          usedMinutes={usedMinutes}
          totalMinutes={totalMinutes}
          compact={true}
        />
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600">Calls:</span>
            <span className="font-medium">{totalCalls}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600">Avg:</span>
            <span className="font-medium">{averageCallDuration.toFixed(1)}m</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Usage Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <UsageProgressBar
          percentage={usagePercentage}
          usedMinutes={usedMinutes}
          totalMinutes={totalMinutes}
        />

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Phone className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <div className="text-sm text-gray-600">Total Calls</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{remainingMinutes}</div>
            <div className="text-sm text-gray-600">Minutes Left</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{averageCallDuration.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Duration</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageStatsCard;
