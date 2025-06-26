
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, TrendingUp, X } from "lucide-react";
import { UsageAlert } from "./types";
import { useState } from "react";

interface UsageAlertsPanelProps {
  alerts: UsageAlert[];
  onUpgradeClick?: () => void;
  onDismissAlert?: (alert: UsageAlert) => void;
}

const UsageAlertsPanel = ({ alerts, onUpgradeClick, onDismissAlert }: UsageAlertsPanelProps) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const getAlertIcon = (type: UsageAlert['type']) => {
    switch (type) {
      case 'danger': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getAlertColor = (type: UsageAlert['type']) => {
    switch (type) {
      case 'danger': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = (type: UsageAlert['type']) => {
    switch (type) {
      case 'danger': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const handleDismiss = (alert: UsageAlert) => {
    const alertKey = `${alert.type}-${alert.threshold}`;
    setDismissedAlerts(prev => new Set([...prev, alertKey]));
    onDismissAlert?.(alert);
  };

  const visibleAlerts = alerts.filter(alert => {
    const alertKey = `${alert.type}-${alert.threshold}`;
    return !dismissedAlerts.has(alertKey);
  });

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {visibleAlerts.map((alert, index) => {
        const Icon = getAlertIcon(alert.type);
        const alertKey = `${alert.type}-${alert.threshold}-${index}`;
        
        return (
          <Alert key={alertKey} className={getAlertColor(alert.type)}>
            <Icon className={`h-4 w-4 ${getIconColor(alert.type)}`} />
            <div className="flex-1">
              <AlertDescription className="flex items-center justify-between">
                <span>{alert.message}</span>
                <div className="flex items-center gap-2">
                  {alert.type !== 'danger' && onUpgradeClick && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={onUpgradeClick}
                      className="h-7 text-xs"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Upgrade
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDismiss(alert)}
                    className="h-7 w-7 p-0 hover:bg-white/50"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </AlertDescription>
            </div>
          </Alert>
        );
      })}
    </div>
  );
};

export default UsageAlertsPanel;
