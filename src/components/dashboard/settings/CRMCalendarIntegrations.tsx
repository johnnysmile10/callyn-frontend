
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  Database, 
  ExternalLink, 
  CheckCircle, 
  Clock,
  Users,
  Mail,
  Building,
  Zap,
  Star,
  ArrowRight
} from "lucide-react";

const CRMCalendarIntegrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);

  const crmIntegrations = [
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Sync leads, contacts, and call outcomes with Salesforce",
      icon: Database,
      category: "CRM",
      status: "available",
      popular: true,
      features: ["Lead sync", "Contact management", "Activity logging", "Custom fields"]
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Automatically create contacts and track interactions in HubSpot",
      icon: Building,
      category: "CRM",
      status: "available",
      popular: true,
      features: ["Contact sync", "Deal tracking", "Email integration", "Analytics"]
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      description: "Sync prospects and deals with your Pipedrive pipeline",
      icon: Users,
      category: "CRM",
      status: "available",
      features: ["Pipeline sync", "Activity tracking", "Deal management"]
    }
  ];

  const calendarIntegrations = [
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Schedule follow-up calls and meetings automatically",
      icon: Calendar,
      category: "Calendar",
      status: "available",
      popular: true,
      features: ["Meeting scheduling", "Availability sync", "Automatic reminders"]
    },
    {
      id: "outlook",
      name: "Microsoft Outlook",
      description: "Integrate with Outlook calendar and email",
      icon: Mail,
      category: "Calendar",
      status: "available",
      features: ["Calendar sync", "Email integration", "Meeting scheduling"]
    },
    {
      id: "calendly",
      name: "Calendly",
      description: "Book meetings through your existing Calendly setup",
      icon: Clock,
      category: "Calendar",
      status: "coming-soon",
      features: ["Booking links", "Availability rules", "Meeting types"]
    }
  ];

  const allIntegrations = [...crmIntegrations, ...calendarIntegrations];

  const handleConnect = (integrationId: string) => {
    setConnectedIntegrations(prev => [...prev, integrationId]);
    // In real implementation, this would trigger OAuth flow
    console.log(`Connecting to ${integrationId}`);
  };

  const handleDisconnect = (integrationId: string) => {
    setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
  };

  const isConnected = (integrationId: string) => connectedIntegrations.includes(integrationId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          Connect your business tools to automatically sync data and streamline your workflow. 
          Your AI agent will handle the integration seamlessly.
        </AlertDescription>
      </Alert>

      {/* CRM Integrations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">CRM Integrations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {crmIntegrations.map((integration) => (
            <Card 
              key={integration.id}
              className={`relative ${isConnected(integration.id) ? 'border-green-200 bg-green-50' : ''}`}
            >
              {integration.popular && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500">
                  Popular
                </Badge>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <integration.icon className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                  </div>
                  {isConnected(integration.id) && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <CardDescription className="text-sm">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {integration.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-gray-400" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                {isConnected(integration.id) ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600">Connected</Badge>
                      <span className="text-xs text-green-700">Syncing data</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDisconnect(integration.id)}
                      className="w-full"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleConnect(integration.id)}
                    className="w-full"
                    size="sm"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Calendar Integrations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Calendar Integrations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calendarIntegrations.map((integration) => (
            <Card 
              key={integration.id}
              className={`relative ${
                isConnected(integration.id) 
                  ? 'border-green-200 bg-green-50' 
                  : integration.status === 'coming-soon' 
                    ? 'border-gray-200 bg-gray-50 opacity-75' 
                    : ''
              }`}
            >
              {integration.popular && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500">
                  Popular
                </Badge>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <integration.icon className="h-6 w-6 text-purple-600" />
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                  </div>
                  {isConnected(integration.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : integration.status === 'coming-soon' ? (
                    <Badge variant="outline">Coming Soon</Badge>
                  ) : null}
                </div>
                <CardDescription className="text-sm">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {integration.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-gray-400" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                {integration.status === 'coming-soon' ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled
                    className="w-full"
                  >
                    Coming Soon
                  </Button>
                ) : isConnected(integration.id) ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600">Connected</Badge>
                      <span className="text-xs text-green-700">Active sync</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDisconnect(integration.id)}
                      className="w-full"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleConnect(integration.id)}
                    className="w-full"
                    size="sm"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Connected Integrations Summary */}
      {connectedIntegrations.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="h-5 w-5" />
              Active Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-blue-700">
                Your AI agent is now connected to {connectedIntegrations.length} integration{connectedIntegrations.length !== 1 ? 's' : ''}:
              </p>
              <div className="flex flex-wrap gap-2">
                {connectedIntegrations.map((id) => {
                  const integration = allIntegrations.find(i => i.id === id);
                  return integration ? (
                    <Badge key={id} className="bg-blue-600">
                      {integration.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Future Integrations */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Request an Integration
          </CardTitle>
          <CardDescription>
            Don't see your favorite tool? Let us know what you'd like to connect!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Request Integration
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMCalendarIntegrations;
