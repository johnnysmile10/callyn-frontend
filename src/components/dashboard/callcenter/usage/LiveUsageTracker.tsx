
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Play, Square } from "lucide-react";
import LiveUsageTimelineCard from "./LiveUsageTimelineCard";
import UsageStatsCard from "./UsageStatsCard";
import { useRealTimeUsage } from "./useRealTimeUsage";
import { useUsageData } from "./useUsageData";

const LiveUsageTracker = () => {
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
