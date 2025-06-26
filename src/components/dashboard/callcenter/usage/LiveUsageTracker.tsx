
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, Settings } from "lucide-react";
import { useUsageData } from "./useUsageData";
import { useRealTimeUsage } from "./useRealTimeUsage";
import UsageProgressBar from "./UsageProgressBar";
import UsageTimelineChart from "./UsageTimelineChart";
import UsageAlertsPanel from "./UsageAlertsPanel";
import UsageStatsCard from "./UsageStatsCard";
import LiveUsageTimelineCard from "./LiveUsageTimelineCard";

interface LiveUsageTrackerProps {
  onUpgradeClick?: () => void;
  compact?: boolean;
  isLiveCall?: boolean;
  callStartTime?: Date;
}

const LiveUsageTracker = ({ 
  onUpgradeClick, 
  compact = false,
  isLiveCall = false,
  callStartTime
}: LiveUsageTrackerProps) => {
  const {
    usageData,
    getUsagePercentage,
    getRemainingMinutes,
    getDaysRemaining,
    getUsageAlerts
  } = useUsageData();

  const {
    realTimeUsage,
    currentCallMinutes,
    getUsageWarnings
  } = useRealTimeUsage({
    initialUsageData: usageData,
    isLiveCall,
    callStartTime
  });

  const usagePercentage = (realTimeUsage.minutesUsed / realTimeUsage.minutesTotal) * 100;
  const remainingMinutes = realTimeUsage.minutesTotal - realTimeUsage.minutesUsed;
  const daysRemaining = getDaysRemaining();
  const alerts = getUsageAlerts();
  const warnings = getUsageWarnings();

  if (compact) {
    return (
      <LiveUsageTimelineCard
        usageData={realTimeUsage}
        usagePercentage={usagePercentage}
        remainingMinutes={remainingMinutes}
        daysRemaining={daysRemaining}
        onUpgradeClick={onUpgradeClick}
        isLiveCall={isLiveCall}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Timeline Card */}
      <LiveUsageTimelineCard
        usageData={realTimeUsage}
        usagePercentage={usagePercentage}
        remainingMinutes={remainingMinutes}
        daysRemaining={daysRemaining}
        onUpgradeClick={onUpgradeClick}
        isLiveCall={isLiveCall}
      />

      {/* Current Call Info (if live) */}
      {isLiveCall && currentCallMinutes > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-700">
                Current Call: {currentCallMinutes} minutes
              </div>
              <div className="text-sm text-blue-600">
                Real-time usage: {realTimeUsage.minutesUsed} minutes
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts Panel */}
      {(alerts.length > 0 || warnings.length > 0) && (
        <UsageAlertsPanel
          alerts={[...alerts, ...warnings.map(w => ({ 
            type: w.level === 'critical' ? 'danger' as const : 'warning' as const,
            message: w.message,
            threshold: w.level === 'critical' ? 95 : 85
          }))]}
          onUpgradeClick={onUpgradeClick}
        />
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UsageStatsCard
              usageData={realTimeUsage}
              usagePercentage={usagePercentage}
              remainingMinutes={remainingMinutes}
              daysRemaining={daysRemaining}
              onUpgradeClick={onUpgradeClick}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <UsageProgressBar
                  percentage={usagePercentage}
                  minutesUsed={realTimeUsage.minutesUsed}
                  minutesTotal={realTimeUsage.minutesTotal}
                  showThresholds={true}
                  size="lg"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Usage Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageTimelineChart 
                dailyUsage={usageData.dailyUsage}
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Usage Alerts</h4>
                  <p className="text-sm text-gray-600">Get notified when approaching limits</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Auto-upgrade</h4>
                  <p className="text-sm text-gray-600">Automatically upgrade when limit reached</p>
                </div>
                <Button variant="outline" size="sm">Setup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveUsageTracker;
