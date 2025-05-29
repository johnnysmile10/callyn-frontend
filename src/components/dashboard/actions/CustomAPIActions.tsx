import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Plus, Settings, TestTube, ExternalLink } from "lucide-react";
import { CustomAction } from "./types";

const CustomAPIActions = () => {
  const [customActions, setCustomActions] = useState<CustomAction[]>([
    {
      id: "1",
      name: "CRM Lead Creation",
      enabled: true,
      trigger: "qualified_lead",
      type: "webhook",
      url: "https://hooks.zapier.com/hooks/catch/123/abc",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      payload: JSON.stringify({ 
        lead_source: "callyn_ai",
        status: "new"
      }, null, 2)
    },
    {
      id: "2",
      name: "Slack Notification",
      enabled: false,
      trigger: "call_end",
      type: "webhook",
      url: "https://hooks.slack.com/services/...",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }
  ]);

  const [newActionUrl, setNewActionUrl] = useState("");

  const toggleCustomAction = (id: string) => {
    setCustomActions(prev => prev.map(action => 
      action.id === id ? { ...action, enabled: !action.enabled } : action
    ));
  };

  const testAction = async (action: CustomAction) => {
    console.log("Testing action:", action.name);
    // Here we would implement the actual test functionality
  };

  return (
    <div className="space-y-6">
      {/* Existing Custom Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Custom Actions
              </CardTitle>
              <CardDescription>
                Connect to external APIs and webhooks
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Action
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{action.name}</h4>
                    <Badge variant={action.type === 'webhook' ? 'default' : 'secondary'}>
                      {action.type}
                    </Badge>
                    <Badge variant="outline">{action.method}</Badge>
                    <Badge variant={action.trigger === 'qualified_lead' ? 'default' : 'secondary'}>
                      {action.trigger.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{action.url}</p>
                  {action.payload && (
                    <p className="text-xs text-gray-500">Has custom payload</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => testAction(action)}>
                    <TestTube className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={action.enabled}
                    onCheckedChange={() => toggleCustomAction(action.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Zapier Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Zapier Integration
          </CardTitle>
          <CardDescription>
            Connect to your Zapier webhook for instant automation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="zapier-url">Zapier Webhook URL</Label>
            <Input
              id="zapier-url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={newActionUrl}
              onChange={(e) => setNewActionUrl(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Zap className="h-4 w-4 mr-2" />
              Connect Zapier
            </Button>
            <Button variant="outline" asChild>
              <a href="https://zapier.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Zapier
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Integration Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Integrations</CardTitle>
          <CardDescription>
            Pre-configured templates for common services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">HubSpot CRM</div>
                <div className="text-sm text-gray-500">Create contacts and deals</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Salesforce</div>
                <div className="text-sm text-gray-500">Lead creation and updates</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Slack</div>
                <div className="text-sm text-gray-500">Team notifications</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Google Sheets</div>
                <div className="text-sm text-gray-500">Log call data</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomAPIActions;
