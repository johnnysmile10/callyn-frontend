
import { useState, useEffect } from 'react';
import { UsageData, DailyUsage, UsageAlert } from './types';

export const useUsageData = () => {
  const [usageData, setUsageData] = useState<UsageData>({
    totalMinutes: 1000,
    usedMinutes: 650,
    remainingMinutes: 350,
    percentage: 65,
    dailyUsage: [
      { date: '2024-01-20', minutes: 45, calls: 12 },
      { date: '2024-01-21', minutes: 67, calls: 18 },
      { date: '2024-01-22', minutes: 89, calls: 24 },
      { date: '2024-01-23', minutes: 120, calls: 32 },
      { date: '2024-01-24', minutes: 78, calls: 21 },
      { date: '2024-01-25', minutes: 95, calls: 26 },
      { date: '2024-01-26', minutes: 156, calls: 41 },
    ],
    alerts: [
      {
        id: '1',
        type: 'warning',
        message: 'You have used 65% of your monthly calling minutes',
        timestamp: new Date().toISOString()
      }
    ]
  });

  const updateUsage = (additionalMinutes: number) => {
    setUsageData(prev => {
      const newUsedMinutes = prev.usedMinutes + additionalMinutes;
      const newRemainingMinutes = prev.totalMinutes - newUsedMinutes;
      const newPercentage = (newUsedMinutes / prev.totalMinutes) * 100;

      // Generate alerts based on usage
      const newAlerts = [...prev.alerts];
      if (newPercentage >= 90 && !newAlerts.some(a => a.type === 'critical')) {
        newAlerts.push({
          id: Date.now().toString(),
          type: 'critical',
          message: 'Critical: You have used 90% of your monthly calling minutes',
          timestamp: new Date().toISOString()
        });
      } else if (newPercentage >= 75 && !newAlerts.some(a => a.type === 'warning')) {
        newAlerts.push({
          id: Date.now().toString(),
          type: 'warning',
          message: 'Warning: You have used 75% of your monthly calling minutes',
          timestamp: new Date().toISOString()
        });
      }

      return {
        ...prev,
        usedMinutes: newUsedMinutes,
        remainingMinutes: newRemainingMinutes,
        percentage: newPercentage,
        alerts: newAlerts
      };
    });
  };

  return {
    usageData,
    updateUsage
  };
};
