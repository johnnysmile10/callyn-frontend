
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsageAlert } from './types';

interface UsageAlertsPanelProps {
  alerts: UsageAlert[];
  onDismissAlert?: (alertId: string) => void;
  compact?: boolean;
}

const UsageAlertsPanel = ({ alerts, onDismissAlert, compact = false }: UsageAlertsPanelProps) => {
  if (alerts.length === 0) return null;

  const getAlertIcon = (type: UsageAlert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: UsageAlert['type']): "default" | "destructive" => {
    return type === 'critical' ? 'destructive' : 'default';
  };

  if (compact) {
    const latestAlert = alerts[alerts.length - 1];
    return (
      <Alert variant={getAlertVariant(latestAlert.type)} className="mb-3">
        {getAlertIcon(latestAlert.type)}
        <AlertDescription className="text-sm">
          {latestAlert.message}
        </AlertDescription>
        {onDismissAlert && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 h-6 w-6 p-0"
            onClick={() => onDismissAlert(latestAlert.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm">Usage Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
            {getAlertIcon(alert.type)}
            <AlertDescription className="text-sm">
              {alert.message}
            </AlertDescription>
            {onDismissAlert && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => onDismissAlert(alert.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default UsageAlertsPanel;
