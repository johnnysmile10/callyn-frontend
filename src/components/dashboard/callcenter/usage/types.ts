
export interface UsageData {
  minutesUsed: number;
  minutesTotal: number;
  currentPlan: string;
  billingPeriod: {
    start: string;
    end: string;
  };
  dailyUsage: DailyUsage[];
  costPerMinute: number;
  estimatedMonthlyCost: number;
}

export interface DailyUsage {
  date: string;
  minutes: number;
  calls: number;
  cost: number;
}

export interface UsageAlert {
  type: 'warning' | 'danger' | 'info';
  message: string;
  threshold: number;
}
