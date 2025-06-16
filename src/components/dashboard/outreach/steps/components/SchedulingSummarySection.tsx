
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, AlertCircle } from "lucide-react";

interface OperatingHours {
  monday: { enabled: boolean; start: string; end: string; };
  tuesday: { enabled: boolean; start: string; end: string; };
  wednesday: { enabled: boolean; start: string; end: string; };
  thursday: { enabled: boolean; start: string; end: string; };
  friday: { enabled: boolean; start: string; end: string; };
  saturday: { enabled: boolean; start: string; end: string; };
  sunday: { enabled: boolean; start: string; end: string; };
}

interface CalendarIntegrationData {
  provider: string;
  connected: boolean;
}

interface SchedulingSummarySectionProps {
  operatingHours: OperatingHours;
  timezone: string;
  bufferTime: number;
  calendarIntegration?: CalendarIntegrationData;
  connectedCalendar: string | null;
}

const SchedulingSummarySection = ({ 
  operatingHours, 
  timezone, 
  bufferTime, 
  calendarIntegration,
  connectedCalendar 
}: SchedulingSummarySectionProps) => {
  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "UTC", label: "UTC" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Berlin", label: "Berlin (CET)" }
  ];

  const calendarProviders = [
    { id: "google", name: "Google Calendar" },
    { id: "outlook", name: "Microsoft Outlook" },
    { id: "calendly", name: "Calendly" }
  ];

  const getConnectedProvider = () => {
    return calendarProviders.find(p => p.id === connectedCalendar);
  };

  if (!connectedCalendar) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please connect a calendar to proceed. This ensures prospects can book meetings with you automatically.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Zap className="h-5 w-5" />
          Ready to Launch Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-blue-700">
          <p>
            <strong>Callyn will call leads:</strong>{' '}
            {Object.entries(operatingHours || {})
              .filter(([_, dayData]) => dayData.enabled)
              .map(([day, dayData]) => `${day.charAt(0).toUpperCase() + day.slice(1)} ${dayData.start}-${dayData.end}`)
              .join(', ')
            }
          </p>
          <p>
            <strong>Timezone:</strong> {timezones.find(tz => tz.value === timezone)?.label || 'Eastern Time'}
          </p>
          <p>
            <strong>Booked meetings will appear in:</strong> {getConnectedProvider()?.name}
          </p>
          <p>
            <strong>Buffer time:</strong> {bufferTime || 15} minutes between meetings
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchedulingSummarySection;
