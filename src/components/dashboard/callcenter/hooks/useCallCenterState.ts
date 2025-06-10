
import { useState } from "react";

interface AgentStatus {
  isActive: boolean;
  mode: 'auto' | 'manual' | 'paused';
  currentCall: boolean;
  callsToday: number;
  uptime: string;
}

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

interface QueuedCall {
  id: string;
  leadName: string;
  phoneNumber: string;
  scheduledTime: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'calling' | 'completed' | 'failed';
  attempts: number;
}

interface CallQueue {
  pending: QueuedCall[];
  inProgress: QueuedCall[];
  completed: QueuedCall[];
  failed: QueuedCall[];
}

interface CallRateSettings {
  callsPerHour: number;
  concurrentCalls: number;
  retryAttempts: number;
  retryDelay: number;
  respectDNC: boolean;
  maxDailyLimit: number;
  adaptiveRating: boolean;
}

interface CallSummary {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  averageCallDuration: string;
  connectionRate: number;
  conversionRate: number;
  totalCallTime: string;
  peakHour: string;
  callsByHour: { hour: string; calls: number }[];
  topFailureReasons: { reason: string; count: number }[];
}

export const useCallCenterState = () => {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    isActive: false,
    mode: 'auto',
    currentCall: false,
    callsToday: 0,
    uptime: '0h 0m'
  });

  const [operatingHours, setOperatingHours] = useState<OperatingHours>({
    monday: { start: '09:00', end: '17:00', enabled: true },
    tuesday: { start: '09:00', end: '17:00', enabled: true },
    wednesday: { start: '09:00', end: '17:00', enabled: true },
    thursday: { start: '09:00', end: '17:00', enabled: true },
    friday: { start: '09:00', end: '17:00', enabled: true },
    saturday: { start: '09:00', end: '17:00', enabled: false },
    sunday: { start: '09:00', end: '17:00', enabled: false },
    timezone: 'America/New_York'
  });

  const [callQueue] = useState<CallQueue>({
    pending: [
      {
        id: '1',
        leadName: 'John Smith',
        phoneNumber: '+1 (555) 123-4567',
        scheduledTime: '10:30 AM',
        priority: 'high',
        status: 'pending',
        attempts: 0
      },
      {
        id: '2',
        leadName: 'Sarah Johnson',
        phoneNumber: '+1 (555) 234-5678',
        scheduledTime: '11:00 AM',
        priority: 'medium',
        status: 'pending',
        attempts: 1
      }
    ],
    inProgress: [],
    completed: [
      {
        id: '3',
        leadName: 'Mike Wilson',
        phoneNumber: '+1 (555) 345-6789',
        scheduledTime: '09:30 AM',
        priority: 'low',
        status: 'completed',
        attempts: 1
      }
    ],
    failed: [
      {
        id: '4',
        leadName: 'Lisa Brown',
        phoneNumber: '+1 (555) 456-7890',
        scheduledTime: '09:00 AM',
        priority: 'medium',
        status: 'failed',
        attempts: 3
      }
    ]
  });

  const [callRate, setCallRate] = useState<CallRateSettings>({
    callsPerHour: 20,
    concurrentCalls: 2,
    retryAttempts: 2,
    retryDelay: 60,
    respectDNC: true,
    maxDailyLimit: 100,
    adaptiveRating: true
  });

  const [dailySummary] = useState<CallSummary>({
    totalCalls: 47,
    successfulCalls: 28,
    failedCalls: 19,
    averageCallDuration: '3m 42s',
    connectionRate: 72,
    conversionRate: 15,
    totalCallTime: '2h 54m',
    peakHour: '2-3 PM',
    callsByHour: [
      { hour: '9AM', calls: 5 },
      { hour: '10AM', calls: 8 },
      { hour: '11AM', calls: 12 },
      { hour: '12PM', calls: 6 },
      { hour: '1PM', calls: 4 },
      { hour: '2PM', calls: 15 },
      { hour: '3PM', calls: 12 },
      { hour: '4PM', calls: 9 }
    ],
    topFailureReasons: [
      { reason: 'No Answer', count: 8 },
      { reason: 'Busy Signal', count: 5 },
      { reason: 'Voicemail', count: 4 },
      { reason: 'Call Declined', count: 2 }
    ]
  });

  const updateAgentStatus = (status: Partial<AgentStatus>) => {
    setAgentStatus(prev => ({ ...prev, ...status }));
  };

  const updateOperatingHours = (hours: OperatingHours) => {
    setOperatingHours(hours);
  };

  const updateCallRate = (settings: CallRateSettings) => {
    setCallRate(settings);
  };

  return {
    agentStatus,
    operatingHours,
    callQueue,
    callRate,
    dailySummary,
    updateAgentStatus,
    updateOperatingHours,
    updateCallRate
  };
};
