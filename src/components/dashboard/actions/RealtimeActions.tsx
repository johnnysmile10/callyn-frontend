
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Phone, ArrowRight, Plus, Settings } from "lucide-react";
import { TransferAction } from "./types";

const RealtimeActions = () => {
  const [transferActions, setTransferActions] = useState<TransferAction[]>([
    {
      id: "1",
      name: "Sales Team Transfer",
      enabled: true,
      trigger: "escalation_needed",
      transferType: "department",
      destination: "sales",
      conditions: ["customer requests manager", "complex technical question"]
    },
    {
      id: "2",
      name: "Support Transfer",
      enabled: false,
      trigger: "specific_request",
      transferType: "department", 
      destination: "support",
      conditions: ["technical issue", "billing question"]
    }
  ]);

  const toggleTransferAction = (id: string) => {
    setTransferActions(prev => prev.map(action => 
      action.id === id ? { ...action, enabled: !action.enabled } : action
    ));
  };

  return (
    <div className="space-y-6">
      {/* Call Transfer Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Transfer Actions
              </CardTitle>
              <CardDescription>
                Automatically transfer calls based on conversation context
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Transfer Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transferActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{action.name}</h4>
                    <Badge variant={action.trigger === 'escalation_needed' ? 'default' : 'secondary'}>
                      {action.trigger.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">Transfer to:</span>
                    <Badge variant="outline">{action.transferType}</Badge>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{action.destination}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Conditions: {action.conditions.join(", ")}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={action.enabled}
                    onCheckedChange={() => toggleTransferAction(action.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Response Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Response Adjustments</CardTitle>
          <CardDescription>
            Configure how the agent adapts its responses during the call
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Sentiment Analysis Adjustments</h4>
                <p className="text-sm text-gray-600">Adjust tone based on customer sentiment</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Objection Detection</h4>
                <p className="text-sm text-gray-600">Switch to objection handling mode when detected</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Interest Level Tracking</h4>
                <p className="text-sm text-gray-600">Adjust approach based on engagement level</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealtimeActions;
