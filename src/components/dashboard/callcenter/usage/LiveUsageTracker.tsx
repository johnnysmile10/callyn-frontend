
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, Settings } from "lucide-react";
import { useUsageData } from "./useUsageData";
import UsageProgressBar from "./UsageProgressBar";
import UsageTimelineChart from "./UsageTimelineChart";
import UsageAlertsPanel from "./UsageAlertsPanel";
import UsageStatsCard from "./UsageStatsCard";

interface LiveUsageTrackerProps {
  onUpgradeClick?: () => void;
  compact?: boolean;
}

const LiveUsageTracker = ({ onUpgradeClick, compact = false }: LiveUsageTrackerProps) => {
  const {
    usageData,
    getUsagePercentage,
    getRemainingMinutes,
    getDaysRemaining,
    getUsageAlerts
  } = useUsageData();

  const usagePercentage = getUsagePercentage();
  const remainingMinutes = getRemainingMinutes();
  const daysRemaining = getDaysRemaining();
  const alerts = getUsageAlerts();

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            Usage Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <UsageProgressBar
            percentage={usagePercentage}
            minutesUsed={usageData.minutesUsed}
            minutesTotal={usageData.minutesTotal}
            size="sm"
          />
          
          {alerts.length > 0 && (
            <UsageAlertsPanel
              alerts={alerts}
              onUpgradeClick={onUpgradeClick}
            />
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alerts Panel */}
      {alerts.length > 0 && (
        <UsageAlertsPanel
          alerts={alerts}
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
              usageData={usageData}
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
                  minutesUsed={usageData.minutesUsed}
                  minutesTotal={usageData.minutesTotal}
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
