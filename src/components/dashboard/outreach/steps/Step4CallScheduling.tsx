
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  Clock, 
  Globe, 
  CheckCircle, 
  ExternalLink,
  Settings,
  Users,
  Mail,
  Zap,
  AlertCircle
} from "lucide-react";

interface CallSchedulingData {
  calendarIntegration?: {
    provider: string;
    connected: boolean;
    calendarId?: string;
    syncEnabled: boolean;
  };
  operatingHours: {
    monday: { enabled: boolean; start: string; end: string; };
    tuesday: { enabled: boolean; start: string; end: string; };
    wednesday: { enabled: boolean; start: string; end: string; };
    thursday: { enabled: boolean; start: string; end: string; };
    friday: { enabled: boolean; start: string; end: string; };
    saturday: { enabled: boolean; start: string; end: string; };
    sunday: { enabled: boolean; start: string; end: string; };
  };
  timezone: string;
  bufferTime: number;
  retryDelay: number;
  weekendCalling: boolean;
}

interface Step4CallSchedulingProps {
  data: CallSchedulingData;
  onUpdate: (data: CallSchedulingData) => void;
}

const Step4CallScheduling = ({ data, onUpdate }: Step4CallSchedulingProps) => {
  const [connectedCalendar, setConnectedCalendar] = useState<string | null>(
    data.calendarIntegration?.connected ? data.calendarIntegration.provider : null
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

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "UTC", label: "UTC" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Berlin", label: "Berlin (CET)" }
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    const displayHour = i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i-12}:00 PM`;
    return { value: `${hour}:00`, label: displayHour };
  });

  const weekdays = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleCalendarConnect = (providerId: string) => {
    setConnectedCalendar(providerId);
    const updatedData = {
      ...data,
      calendarIntegration: {
        provider: providerId,
        connected: true,
        calendarId: `${providerId}_primary`,
        syncEnabled: true
      }
    };
    onUpdate(updatedData);
  };

  const handleCalendarDisconnect = () => {
    setConnectedCalendar(null);
    const updatedData = {
      ...data,
      calendarIntegration: {
        provider: "",
        connected: false,
        syncEnabled: false
      }
    };
    onUpdate(updatedData);
  };

  const handleOperatingHoursChange = (day: string, field: string, value: string | boolean) => {
    const updatedData = {
      ...data,
      operatingHours: {
        ...data.operatingHours,
        [day]: {
          ...data.operatingHours[day as keyof typeof data.operatingHours],
          [field]: value
        }
      }
    };
    onUpdate(updatedData);
  };

  const handleSettingChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate(updatedData);
  };

  const getConnectedProvider = () => {
    return calendarProviders.find(p => p.id === connectedCalendar);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Connect Calendar & Set Calling Hours
        </h2>
        <p className="text-xl text-gray-600">
          Configure when Callyn calls and where meetings get booked
        </p>
      </div>

      {/* Calendar Integration Section */}
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

      {/* Operating Hours Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Calling Hours Setup
          </CardTitle>
          <CardDescription>
            When should Callyn start calling your leads?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timezone Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Time Zone
              </Label>
              <Select 
                value={data.timezone || "America/New_York"}
                onValueChange={(value) => handleSettingChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="weekend-calling"
                checked={data.weekendCalling || false}
                onCheckedChange={(checked) => handleSettingChange('weekendCalling', checked)}
              />
              <Label htmlFor="weekend-calling">Enable weekend calling</Label>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Daily Calling Schedule</Label>
            <div className="space-y-2">
              {weekdays.map((day) => {
                const dayData = data.operatingHours?.[day.key as keyof typeof data.operatingHours] || 
                  { enabled: day.key !== 'saturday' && day.key !== 'sunday', start: '09:00', end: '17:00' };
                
                return (
                  <div key={day.key} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-20">
                      <Switch
                        checked={dayData.enabled}
                        onCheckedChange={(checked) => handleOperatingHoursChange(day.key, 'enabled', checked)}
                      />
                    </div>
                    <div className="w-24 text-sm font-medium">
                      {day.label}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Select 
                        value={dayData.start}
                        onValueChange={(value) => handleOperatingHoursChange(day.key, 'start', value)}
                        disabled={!dayData.enabled}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-gray-500">to</span>
                      <Select 
                        value={dayData.end}
                        onValueChange={(value) => handleOperatingHoursChange(day.key, 'end', value)}
                        disabled={!dayData.enabled}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <Label htmlFor="buffer-time">Buffer Between Meetings (minutes)</Label>
              <Input
                id="buffer-time"
                type="number"
                value={data.bufferTime || 15}
                onChange={(e) => handleSettingChange('bufferTime', parseInt(e.target.value))}
                min="0"
                max="60"
              />
            </div>
            <div>
              <Label htmlFor="retry-delay">Retry Delay (hours)</Label>
              <Input
                id="retry-delay"
                type="number"
                value={data.retryDelay || 24}
                onChange={(e) => handleSettingChange('retryDelay', parseInt(e.target.value))}
                min="1"
                max="168"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Preview */}
      {connectedCalendar && (
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
                {Object.entries(data.operatingHours || {})
                  .filter(([_, dayData]) => dayData.enabled)
                  .map(([day, dayData]) => `${day.charAt(0).toUpperCase() + day.slice(1)} ${dayData.start}-${dayData.end}`)
                  .join(', ')
                }
              </p>
              <p>
                <strong>Timezone:</strong> {timezones.find(tz => tz.value === data.timezone)?.label || 'Eastern Time'}
              </p>
              <p>
                <strong>Booked meetings will appear in:</strong> {getConnectedProvider()?.name}
              </p>
              <p>
                <strong>Buffer time:</strong> {data.bufferTime || 15} minutes between meetings
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Warning */}
      {!connectedCalendar && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please connect a calendar to proceed. This ensures prospects can book meetings with you automatically.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Step4CallScheduling;
