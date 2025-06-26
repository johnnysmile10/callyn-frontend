
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink } from "lucide-react";
import UsageProgressBar from "./UsageProgressBar";
import UsageTimelineChart from "./UsageTimelineChart";
import UsageAlertsPanel from "./UsageAlertsPanel";
import { useUsageData } from "./useUsageData";

interface LiveUsageTimelineCardProps {
  compact?: boolean;
  onUpgradeClick?: () => void;
}

const LiveUsageTimelineCard = ({ 
  compact = false, 
  onUpgradeClick 
}: LiveUsageTimelineCardProps) => {
  const { usageData } = useUsageData();

  if (compact) {
    return (
      <div className="space-y-4">
        <UsageProgressBar
          percentage={usageData.percentage}
          usedMinutes={usageData.usedMinutes}
          totalMinutes={usageData.totalMinutes}
          compact={true}
        />
        
        <UsageAlertsPanel 
          alerts={usageData.alerts} 
          compact={true}
        />

        {usageData.percentage > 75 && onUpgradeClick && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onUpgradeClick}
            className="w-full text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Upgrade Plan
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Usage Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <UsageProgressBar
          percentage={usageData.percentage}
          usedMinutes={usageData.usedMinutes}
          totalMinutes={usageData.totalMinutes}
        />

        <div>
          <h4 className="font-medium mb-3">7-Day Usage Trend</h4>
          <UsageTimelineChart data={usageData.dailyUsage} />
        </div>

        <UsageAlertsPanel alerts={usageData.alerts} />

        {usageData.percentage > 75 && onUpgradeClick && (
          <div className="pt-4 border-t">
            <Button 
              onClick={onUpgradeClick}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveUsageTimelineCard;
