
import { useState, useEffect } from 'react';
import { UsageData, DailyUsage, UsageAlert } from './types';
import { subDays, format } from 'date-fns';

export const useUsageData = () => {
  const [usageData, setUsageData] = useState<UsageData>({
    totalMinutes: 1000,
    usedMinutes: 0,
    remainingMinutes: 1000,
    percentage: 0,
    dailyUsage: [],
    alerts: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateMockData = (): UsageData => {
      // Generate daily usage for the past 7 days
      const dailyUsage: DailyUsage[] = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i);
        const minutes = Math.floor(Math.random() * 120) + 20; // 20-140 minutes
        const calls = Math.floor(Math.random() * 15) + 5; // 5-20 calls
        
        dailyUsage.push({
          date: format(date, 'yyyy-MM-dd'),
          minutes,
          calls
        });
      }

      const totalUsedMinutes = dailyUsage.reduce((sum, day) => sum + day.minutes, 0);
      const totalMinutes = 1000;
      const remainingMinutes = totalMinutes - totalUsedMinutes;
      const percentage = (totalUsedMinutes / totalMinutes) * 100;

      // Generate alerts based on usage
      const alerts: UsageAlert[] = [];
      
      if (percentage >= 90) {
        alerts.push({
          id: 'critical-usage',
          type: 'critical',
          message: 'You have used 90% of your monthly minutes. Consider upgrading your plan.',
          timestamp: new Date().toISOString()
        });
      } else if (percentage >= 75) {
        alerts.push({
          id: 'warning-usage',
          type: 'warning',
          message: 'You have used 75% of your monthly minutes.',
          timestamp: new Date().toISOString()
        });
      }

      // Check if today's usage is high
      const todayUsage = dailyUsage[dailyUsage.length - 1];
      if (todayUsage.minutes > 100) {
        alerts.push({
          id: 'high-daily-usage',
          type: 'info',
          message: `High usage detected today: ${todayUsage.minutes} minutes used.`,
          timestamp: new Date().toISOString()
        });
      }

      return {
        totalMinutes,
        usedMinutes: totalUsedMinutes,
        remainingMinutes,
        percentage,
        dailyUsage,
        alerts
      };
    };

    // Simulate loading delay
    setTimeout(() => {
      setUsageData(generateMockData());
      setIsLoading(false);
    }, 1000);
  }, []);

  return { usageData, isLoading };
};
