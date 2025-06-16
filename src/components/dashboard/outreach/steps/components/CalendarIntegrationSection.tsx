
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  CheckCircle, 
  ExternalLink,
  Settings,
  Mail,
  Clock
} from "lucide-react";

interface CalendarIntegrationData {
  provider: string;
  connected: boolean;
  calendarId?: string;
  syncEnabled: boolean;
}

interface CalendarIntegrationSectionProps {
  calendarIntegration?: CalendarIntegrationData;
  onUpdate: (data: CalendarIntegrationData) => void;
}

const CalendarIntegrationSection = ({ calendarIntegration, onUpdate }: CalendarIntegrationSectionProps) => {
  const [connectedCalendar, setConnectedCalendar] = useState<string | null>(
    calendarIntegration?.connected ? calendarIntegration.provider : null
  );

  const calendarProviders = [
    {
      id: "google",
      name: "Google Calendar",
      icon: Calendar,
      description: "Connect your Google Calendar for seamless booking",
      color: "blue"
    },
    {
      id: "outlook",
      name: "Microsoft Outlook",
      icon: Mail,
      description: "Sync with Outlook calendar and email",
      color: "orange"
    },
    {
      id: "calendly",
      name: "Calendly",
      icon: Clock,
      description: "Use your existing Calendly booking links",
      color: "green"
    }
  ];

  const handleCalendarConnect = (providerId: string) => {
    setConnectedCalendar(providerId);
    const updatedData = {
      provider: providerId,
      connected: true,
      calendarId: `${providerId}_primary`,
      syncEnabled: true
    };
    onUpdate(updatedData);
  };

  const handleCalendarDisconnect = () => {
    setConnectedCalendar(null);
    const updatedData = {
      provider: "",
      connected: false,
      syncEnabled: false
    };
    onUpdate(updatedData);
  };

  const getConnectedProvider = () => {
    return calendarProviders.find(p => p.id === connectedCalendar);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Calendar Connection
        </CardTitle>
        <CardDescription>
          Where should Callyn book meetings when prospects want to schedule?
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connectedCalendar ? (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="flex items-center justify-between">
                  <span>
                    <strong>{getConnectedProvider()?.name}</strong> is connected and syncing. 
                    Meetings will appear in your calendar automatically.
                  </span>
                  <Badge className="bg-green-600">Connected</Badge>
                </div>
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCalendarDisconnect}>
                Disconnect
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configure Settings
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {calendarProviders.map((provider) => (
              <Card 
                key={provider.id}
                className="cursor-pointer hover:bg-gray-50 transition-all border-2 hover:border-blue-200"
                onClick={() => handleCalendarConnect(provider.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center bg-${provider.color}-100`}>
                    <provider.icon className={`h-6 w-6 text-${provider.color}-600`} />
                  </div>
                  <h3 className="font-semibold mb-2">{provider.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{provider.description}</p>
                  <Button size="sm" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarIntegrationSection;
