
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Activity } from "lucide-react";
import UsageProgressBar from "./UsageProgressBar";
import UsageAlertsPanel from "./UsageAlertsPanel";
import { useUsageData } from "./useUsageData";
import { useRealTimeUsage } from "./useRealTimeUsage";

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
  const { usageData, updateUsage } = useUsageData();
  const { realtimeUsage, currentCallDuration, isTrackingCall } = useRealTimeUsage({
    isCallActive: isLiveCall,
    callStartTime,
    onUsageUpdate: updateUsage
  });

  // Calculate display values including current call
  const displayUsedMinutes = usageData.usedMinutes + (isTrackingCall ? currentCallDuration : 0);
  const displayPercentage = (displayUsedMinutes / usageData.totalMinutes) * 100;

  const formatDuration = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {isTrackingCall && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-green-800 font-medium">
                  Live Call: {formatDuration(currentCallDuration)}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <UsageProgressBar
          percentage={displayPercentage}
          usedMinutes={Math.floor(displayUsedMinutes)}
          totalMinutes={usageData.totalMinutes}
          compact={true}
        />
        
        <UsageAlertsPanel 
          alerts={usageData.alerts} 
          compact={true}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Usage Tracker
          {isTrackingCall && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Activity className="h-3 w-3 animate-pulse" />
              Live
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isTrackingCall && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-800">Current Call Duration</span>
              <span className="font-mono text-green-800 font-medium">
                {formatDuration(currentCallDuration)}
              </span>
            </div>
          </div>
        )}

        <UsageProgressBar
          percentage={displayPercentage}
          usedMinutes={Math.floor(displayUsedMinutes)}
          totalMinutes={usageData.totalMinutes}
        />

        <UsageAlertsPanel alerts={usageData.alerts} />
      </CardContent>
    </Card>
  );
};

export default LiveUsageTracker;
