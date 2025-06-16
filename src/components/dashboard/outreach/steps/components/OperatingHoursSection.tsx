
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Globe } from "lucide-react";

interface OperatingHours {
  monday: { enabled: boolean; start: string; end: string; };
  tuesday: { enabled: boolean; start: string; end: string; };
  wednesday: { enabled: boolean; start: string; end: string; };
  thursday: { enabled: boolean; start: string; end: string; };
  friday: { enabled: boolean; start: string; end: string; };
  saturday: { enabled: boolean; start: string; end: string; };
  sunday: { enabled: boolean; start: string; end: string; };
}

interface OperatingHoursSectionProps {
  operatingHours: OperatingHours;
  timezone: string;
  weekendCalling: boolean;
  onOperatingHoursChange: (day: string, field: string, value: string | boolean) => void;
  onTimezoneChange: (timezone: string) => void;
  onWeekendCallingChange: (enabled: boolean) => void;
}

const OperatingHoursSection = ({ 
  operatingHours, 
  timezone, 
  weekendCalling,
  onOperatingHoursChange, 
  onTimezoneChange, 
  onWeekendCallingChange 
}: OperatingHoursSectionProps) => {
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

  return (
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
              value={timezone || "America/New_York"}
              onValueChange={onTimezoneChange}
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
              checked={weekendCalling || false}
              onCheckedChange={onWeekendCallingChange}
            />
            <Label htmlFor="weekend-calling">Enable weekend calling</Label>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Daily Calling Schedule</Label>
          <div className="space-y-2">
            {weekdays.map((day) => {
              const dayData = operatingHours?.[day.key as keyof typeof operatingHours] || 
                { enabled: day.key !== 'saturday' && day.key !== 'sunday', start: '09:00', end: '17:00' };
              
              return (
                <div key={day.key} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-20">
                    <Switch
                      checked={dayData.enabled}
                      onCheckedChange={(checked) => onOperatingHoursChange(day.key, 'enabled', checked)}
                    />
                  </div>
                  <div className="w-24 text-sm font-medium">
                    {day.label}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Select 
                      value={dayData.start}
                      onValueChange={(value) => onOperatingHoursChange(day.key, 'start', value)}
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
                      onValueChange={(value) => onOperatingHoursChange(day.key, 'end', value)}
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
      </CardContent>
    </Card>
  );
};

export default OperatingHoursSection;
