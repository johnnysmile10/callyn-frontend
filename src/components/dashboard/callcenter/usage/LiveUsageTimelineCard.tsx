
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Activity, AlertTriangle } from "lucide-react";
import UsageTimelineChart from "./UsageTimelineChart";
import UsageProgressBar from "./UsageProgressBar";
import UsageAlertsPanel from "./UsageAlertsPanel";
import { useUsageData } from "./useUsageData";
import { useRealTimeUsage } from "./useRealTimeUsage";

const LiveUsageTimelineCard = () => {
  const { usageData, isLoading } = useUsageData();
  const { realtimeUsage, isCallActive } = useRealTimeUsage();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 animate-spin" />
            <span>Loading usage data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentUsage = realtimeUsage.isActive 
    ? realtimeUsage.totalMinutesUsed 
    : usageData.usedMinutes;

  const usagePercentage = (currentUsage / usageData.totalMinutes) * 100;

  return (
    <div className="space-y-4">
      {/* Main Usage Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Live Usage Timeline
            </div>
            <div className="flex items-center gap-2">
              {isCallActive && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                  Call Active
                </Badge>
              )}
              <Badge variant="outline">
                {currentUsage}/{usageData.totalMinutes} min
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <UsageProgressBar
            percentage={usagePercentage}
            usedMinutes={currentUsage}
            totalMinutes={usageData.totalMinutes}
          />

          {/* Timeline Chart */}
          <UsageTimelineChart 
            dailyUsage={usageData.dailyUsage}
            realtimeUsage={realtimeUsage}
          />

          {/* Current Call Info */}
          {isCallActive && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="font-medium">Active Call</span>
                </div>
                <div className="text-sm text-gray-600">
                  {realtimeUsage.currentCallMinutes.toFixed(1)} minutes
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alerts Panel */}
      {usageData.alerts.length > 0 && (
        <UsageAlertsPanel alerts={usageData.alerts} />
      )}
    </div>
  );
};

export default LiveUsageTimelineCard;
