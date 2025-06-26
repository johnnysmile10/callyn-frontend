
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsageAlert } from './types';
import { formatDistanceToNow } from 'date-fns';

interface UsageAlertsPanelProps {
  alerts: UsageAlert[];
  onDismissAlert?: (alertId: string) => void;
}

const UsageAlertsPanel = ({ alerts, onDismissAlert }: UsageAlertsPanelProps) => {
  const getAlertIcon = (type: UsageAlert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: UsageAlert['type']) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
        return 'default';
      default:
        return 'default';
    }
  };

  const getAlertBadgeColor = (type: UsageAlert['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          Usage Alerts
          <Badge variant="secondary">{alerts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <AlertDescription className="text-sm">
                    {alert.message}
                  </AlertDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getAlertBadgeColor(alert.type)}`}
                    >
                      {alert.type.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(alert.timestamp))} ago
                    </span>
                  </div>
                </div>
              </div>
              {onDismissAlert && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismissAlert(alert.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default UsageAlertsPanel;
