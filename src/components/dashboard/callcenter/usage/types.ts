
export interface UsageData {
  totalMinutes: number;
  usedMinutes: number;
  remainingMinutes: number;
  percentage: number;
  dailyUsage: DailyUsage[];
  alerts: UsageAlert[];
}

export interface DailyUsage {
  date: string;
  minutes: number;
  calls: number;
}

export interface UsageAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: string;
}

export interface RealtimeUsageUpdate {
  currentCallMinutes: number;
  totalMinutesUsed: number;
  isActive: boolean;
  callStartTime?: Date;
}
