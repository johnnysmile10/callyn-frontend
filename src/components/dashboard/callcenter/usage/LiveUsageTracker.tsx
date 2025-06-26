
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Play, Square } from "lucide-react";
import LiveUsageTimelineCard from "./LiveUsageTimelineCard";
import UsageStatsCard from "./UsageStatsCard";
import { useRealTimeUsage } from "./useRealTimeUsage";
import { useUsageData } from "./useUsageData";

interface LiveUsageTrackerProps {
  compact?: boolean;
  onUpgradeClick?: () => void;
  isLiveCall?: boolean;
  callStartTime?: Date;
}

const LiveUsageTracker = ({ 
  compact = false, 
  onUpgradeClick,
  isLiveCall = false,
  callStartTime
}: LiveUsageTrackerProps) => {
  const { realtimeUsage, isCallActive, startTestCall, endTestCall } = useRealTimeUsage();
  const { usageData, isLoading } = useUsageData();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 animate-spin" />
            <span>Loading usage tracker...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalCalls = usageData.dailyUsage.reduce((sum, day) => sum + day.calls, 0);
  const averageCallDuration = totalCalls > 0 ? usageData.usedMinutes / totalCalls : 0;

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Usage Tracker
          </h3>
          {isLiveCall && (
            <div className="text-xs text-green-600 font-medium">
              Live Call Active
            </div>
          )}
        </div>
        
        <UsageStatsCard
          totalMinutes={usageData.totalMinutes}
          usedMinutes={realtimeUsage.isActive 
            ? usageData.usedMinutes + realtimeUsage.currentCallMinutes 
            : usageData.usedMinutes}
          totalCalls={totalCalls}
          averageCallDuration={averageCallDuration}
          compact={true}
        />

        {onUpgradeClick && (
          <Button
            onClick={onUpgradeClick}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Upgrade Plan
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Test Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            Live Usage Tracking
          </h2>
          <p className="text-muted-foreground">
            Monitor your call usage in real-time
          </p>
        </div>
        
        {/* Test Controls */}
        <div className="flex items-center gap-2">
          <Button
            onClick={startTestCall}
            disabled={isCallActive}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Start Test Call
          </Button>
          <Button
            onClick={endTestCall}
            disabled={!isCallActive}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" />
            End Test Call
          </Button>
        </div>
      </div>

      {/* Usage Stats */}
      <UsageStatsCard
        totalMinutes={usageData.totalMinutes}
        usedMinutes={realtimeUsage.isActive 
          ? usageData.usedMinutes + realtimeUsage.currentCallMinutes 
          : usageData.usedMinutes}
        totalCalls={totalCalls}
        averageCallDuration={averageCallDuration}
      />

      {/* Live Timeline */}
      <LiveUsageTimelineCard />
    </div>
  );
};

export default LiveUsageTracker;
