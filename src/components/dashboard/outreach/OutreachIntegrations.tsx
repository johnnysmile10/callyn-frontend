
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileSpreadsheet, 
  Zap, 
  Calendar, 
  Phone,
  CheckCircle,
  ExternalLink,
  Settings,
  Plus
} from "lucide-react";

const OutreachIntegrations = () => {
  const [zapierWebhook, setZapierWebhook] = useState("");
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);

  const integrations = [
    {
      id: "google-sheets",
      name: "Google Sheets",
      description: "Import leads and sync call results automatically",
      icon: FileSpreadsheet,
      status: "not_connected",
      color: "green"
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect to 5000+ apps with automated workflows",
      icon: Zap,
      status: "not_connected",
      color: "orange"
    },
    {
      id: "calendly",
      name: "Calendly",
      description: "Schedule follow-up meetings automatically",
      icon: Calendar,
      status: "not_connected",
      color: "blue"
    },
    {
      id: "twilio",
      name: "Twilio",
      description: "Advanced calling features and SMS integration",
      icon: Phone,
      status: "not_connected",
      color: "red"
    }
  ];

  const handleConnect = (integrationId: string) => {
    if (integrationId === "zapier") {
      // Handle Zapier webhook setup
      if (zapierWebhook) {
        setConnectedIntegrations([...connectedIntegrations, integrationId]);
      }
    } else {
      // For other integrations, simulate connection
      setConnectedIntegrations([...connectedIntegrations, integrationId]);
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setConnectedIntegrations(connectedIntegrations.filter(id => id !== integrationId));
    if (integrationId === "zapier") {
      setZapierWebhook("");
    }
  };

  const isConnected = (integrationId: string) => connectedIntegrations.includes(integrationId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Integrations
        </CardTitle>
        <CardDescription>
          Connect your favorite tools to supercharge your outreach campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const connected = isConnected(integration.id);
            
            return (
              <div key={integration.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${integration.color}-100`}>
                      <integration.icon className={`h-5 w-5 text-${integration.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <Badge variant={connected ? "default" : "secondary"}>
                    {connected ? (
                      <>
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Connected
                      </>
                    ) : (
                      "Not Connected"
                    )}
                  </Badge>
                </div>

                {/* Special handling for Zapier webhook input */}
                {integration.id === "zapier" && !connected && (
                  <div className="space-y-2">
                    <Label htmlFor="zapier-webhook" className="text-sm">
                      Zapier Webhook URL
                    </Label>
                    <Input
                      id="zapier-webhook"
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      value={zapierWebhook}
                      onChange={(e) => setZapierWebhook(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  {connected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(integration.id)}
                      disabled={integration.id === "zapier" && !zapierWebhook}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OutreachIntegrations;
