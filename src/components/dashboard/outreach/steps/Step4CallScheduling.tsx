
import { useState } from "react";
import { Calendar } from "lucide-react";
import CalendarIntegrationSection from "./components/CalendarIntegrationSection";
import OperatingHoursSection from "./components/OperatingHoursSection";
import AdvancedSettingsSection from "./components/AdvancedSettingsSection";
import SchedulingSummarySection from "./components/SchedulingSummarySection";

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

  const handleCalendarUpdate = (calendarData: any) => {
    setConnectedCalendar(calendarData.connected ? calendarData.provider : null);
    const updatedData = {
      ...data,
      calendarIntegration: calendarData
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

  const handleTimezoneChange = (timezone: string) => {
    const updatedData = { ...data, timezone };
    onUpdate(updatedData);
  };

  const handleWeekendCallingChange = (weekendCalling: boolean) => {
    const updatedData = { ...data, weekendCalling };
    onUpdate(updatedData);
  };

  const handleBufferTimeChange = (bufferTime: number) => {
    const updatedData = { ...data, bufferTime };
    onUpdate(updatedData);
  };

  const handleRetryDelayChange = (retryDelay: number) => {
    const updatedData = { ...data, retryDelay };
    onUpdate(updatedData);
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

      <CalendarIntegrationSection
        calendarIntegration={data.calendarIntegration}
        onUpdate={handleCalendarUpdate}
      />

      {/* <OperatingHoursSection
        operatingHours={data.operatingHours}
        timezone={data.timezone}
        weekendCalling={data.weekendCalling}
        onOperatingHoursChange={handleOperatingHoursChange}
        onTimezoneChange={handleTimezoneChange}
        onWeekendCallingChange={handleWeekendCallingChange}
      /> */}

      {/* <AdvancedSettingsSection
        bufferTime={data.bufferTime}
        retryDelay={data.retryDelay}
        onBufferTimeChange={handleBufferTimeChange}
        onRetryDelayChange={handleRetryDelayChange}
      /> */}

      <SchedulingSummarySection
        // operatingHours={data.operatingHours}
        // timezone={data.timezone}
        // bufferTime={data.bufferTime}
        calendarIntegration={data.calendarIntegration}
        connectedCalendar={connectedCalendar}
      />
    </div>
  );
};

export default Step4CallScheduling;
