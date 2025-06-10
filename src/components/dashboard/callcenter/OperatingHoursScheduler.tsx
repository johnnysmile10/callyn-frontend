
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Calendar } from "lucide-react";

interface TimeSlot {
  start: string;
  end: string;
  enabled: boolean;
}

interface OperatingHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
  timezone: string;
}

interface OperatingHoursSchedulerProps {
  hours: OperatingHours;
  onHoursChange: (hours: OperatingHours) => void;
}

const OperatingHoursScheduler = ({ hours, onHoursChange }: OperatingHoursSchedulerProps) => {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const updateDaySchedule = (day: string, field: 'start' | 'end' | 'enabled', value: string | boolean) => {
    onHoursChange({
      ...hours,
      [day]: {
        ...hours[day as keyof OperatingHours],
        [field]: value
      }
    });
  };

  const setBusinessHours = () => {
    const businessHours: OperatingHours = {
      ...hours,
      monday: { start: '09:00', end: '17:00', enabled: true },
      tuesday: { start: '09:00', end: '17:00', enabled: true },
      wednesday: { start: '09:00', end: '17:00', enabled: true },
      thursday: { start: '09:00', end: '17:00', enabled: true },
      friday: { start: '09:00', end: '17:00', enabled: true },
      saturday: { start: '09:00', end: '17:00', enabled: false },
      sunday: { start: '09:00', end: '17:00', enabled: false },
    };
    onHoursChange(businessHours);
  };

  const setExtendedHours = () => {
    const extendedHours: OperatingHours = {
      ...hours,
      monday: { start: '08:00', end: '20:00', enabled: true },
      tuesday: { start: '08:00', end: '20:00', enabled: true },
      wednesday: { start: '08:00', end: '20:00', enabled: true },
      thursday: { start: '08:00', end: '20:00', enabled: true },
      friday: { start: '08:00', end: '20:00', enabled: true },
      saturday: { start: '10:00', end: '18:00', enabled: true },
      sunday: { start: '10:00', end: '18:00', enabled: false },
    };
    onHoursChange(extendedHours);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Operating Hours
        </CardTitle>
        <CardDescription>
          Set when your AI agent should make calls
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick presets */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={setBusinessHours} size="sm">
            Business Hours (9-5)
          </Button>
          <Button variant="outline" onClick={setExtendedHours} size="sm">
            Extended Hours (8-8)
          </Button>
        </div>

        {/* Timezone selector */}
        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select 
            value={hours.timezone} 
            onValueChange={(value) => onHoursChange({ ...hours, timezone: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Daily schedule */}
        <div className="space-y-4">
          {days.map(({ key, label }) => {
            const daySchedule = hours[key as keyof OperatingHours] as TimeSlot;
            return (
              <div key={key} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-20">
                  <Switch
                    checked={daySchedule.enabled}
                    onCheckedChange={(enabled) => updateDaySchedule(key, 'enabled', enabled)}
                  />
                </div>
                <div className="w-24 font-medium">{label}</div>
                
                <div className="flex items-center gap-2">
                  <Select
                    value={daySchedule.start}
                    onValueChange={(value) => updateDaySchedule(key, 'start', value)}
                    disabled={!daySchedule.enabled}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <span>to</span>
                  
                  <Select
                    value={daySchedule.end}
                    onValueChange={(value) => updateDaySchedule(key, 'end', value)}
                    disabled={!daySchedule.enabled}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OperatingHoursScheduler;
