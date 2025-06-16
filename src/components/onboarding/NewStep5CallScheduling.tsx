
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Globe, Zap } from "lucide-react";

interface NewStep5CallSchedulingProps {
  handleNext: () => void;
  handleBack: () => void;
  onDataUpdate: (data: any) => void;
  initialData?: any;
}

const NewStep5CallScheduling = ({ handleNext, handleBack, onDataUpdate, initialData }: NewStep5CallSchedulingProps) => {
  const [schedulingData, setSchedulingData] = useState({
    enableScheduling: initialData?.enableScheduling ?? true,
    operatingHours: initialData?.operatingHours || {
      start: "09:00",
      end: "17:00",
      timezone: "America/New_York"
    },
    callFrequency: initialData?.callFrequency || "balanced",
    respectTimeZones: initialData?.respectTimeZones ?? true,
    ...initialData
  });

  const handleDataChange = (updates: any) => {
    const newData = { ...schedulingData, ...updates };
    setSchedulingData(newData);
    onDataUpdate(newData);
  };

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "UTC", label: "UTC" }
  ];

  const callFrequencies = [
    { 
      value: "conservative", 
      label: "Conservative", 
      description: "1-2 calls per hour, respects all do-not-call preferences",
      icon: "🐌"
    },
    { 
      value: "balanced", 
      label: "Balanced", 
      description: "3-5 calls per hour, optimal for most businesses",
      icon: "⚖️"
    },
    { 
      value: "aggressive", 
      label: "Aggressive", 
      description: "8-12 calls per hour, maximum outreach volume",
      icon: "🚀"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Calendar className="h-16 w-16 text-callyn-blue mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-callyn-darkBlue mb-4">
          Set Your Calling Schedule
        </h2>
        <p className="text-xl text-gray-600">
          Configure when and how often your AI agent makes calls
        </p>
      </div>

      <div className="space-y-6">
        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Operating Hours
            </CardTitle>
            <CardDescription>
              Set when your AI agent should be active
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Select 
                  value={schedulingData.operatingHours.start}
                  onValueChange={(value) => handleDataChange({
                    operatingHours: { ...schedulingData.operatingHours, start: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i-12}:00 PM`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Select 
                  value={schedulingData.operatingHours.end}
                  onValueChange={(value) => handleDataChange({
                    operatingHours: { ...schedulingData.operatingHours, end: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i-12}:00 PM`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone">Time Zone</Label>
                <Select 
                  value={schedulingData.operatingHours.timezone}
                  onValueChange={(value) => handleDataChange({
                    operatingHours: { ...schedulingData.operatingHours, timezone: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
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
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="respect-timezones"
                checked={schedulingData.respectTimeZones}
                onCheckedChange={(checked) => handleDataChange({ respectTimeZones: checked })}
              />
              <Label htmlFor="respect-timezones" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Respect prospect time zones (recommended)
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Call Frequency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Call Frequency
            </CardTitle>
            <CardDescription>
              Choose how aggressively your agent should make calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {callFrequencies.map((frequency) => (
                <Card 
                  key={frequency.value}
                  className={`cursor-pointer transition-all ${
                    schedulingData.callFrequency === frequency.value 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleDataChange({ callFrequency: frequency.value })}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{frequency.icon}</div>
                    <h3 className="font-semibold mb-2">{frequency.label}</h3>
                    <p className="text-sm text-gray-600">{frequency.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2"
        >
          Continue to Launch
        </Button>
      </div>
    </div>
  );
};

export default NewStep5CallScheduling;
