
import { useState, useEffect } from "react";
import { UsageData, DailyUsage, UsageAlert } from "./types";

export const useUsageData = () => {
  const [usageData, setUsageData] = useState<UsageData>({
    minutesUsed: 347,
    minutesTotal: 1500,
    currentPlan: "Pro",
    billingPeriod: {
      start: "2024-06-01",
      end: "2024-06-30"
    },
    dailyUsage: generateMockDailyUsage(),
    costPerMinute: 0.065,
    estimatedMonthlyCost: 22.55
  });

  const getUsagePercentage = () => {
    return (usageData.minutesUsed / usageData.minutesTotal) * 100;
  };

  const getRemainingMinutes = () => {
    return usageData.minutesTotal - usageData.minutesUsed;
  };

  const getDaysRemaining = () => {
    const endDate = new Date(usageData.billingPeriod.end);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUsageAlerts = (): UsageAlert[] => {
    const percentage = getUsagePercentage();
    const alerts: UsageAlert[] = [];

    if (percentage >= 90) {
      alerts.push({
        type: 'danger',
        message: 'You have used 90% of your monthly minutes',
        threshold: 90
      });
    } else if (percentage >= 75) {
      alerts.push({
        type: 'warning',
        message: 'You have used 75% of your monthly minutes',
        threshold: 75
      });
    }

    const daysRemaining = getDaysRemaining();
    if (daysRemaining <= 5 && percentage < 50) {
      alerts.push({
        type: 'info',
        message: 'Consider upgrading to make the most of remaining days',
        threshold: 50
      });
    }

    return alerts;
  };

  const updateUsage = (additionalMinutes: number) => {
    setUsageData(prev => ({
      ...prev,
      minutesUsed: prev.minutesUsed + additionalMinutes,
      estimatedMonthlyCost: (prev.minutesUsed + additionalMinutes) * prev.costPerMinute
    }));
  };

  return {
    usageData,
    getUsagePercentage,
    getRemainingMinutes,
    getDaysRemaining,
    getUsageAlerts,
    updateUsage
  };
};

function generateMockDailyUsage(): DailyUsage[] {
  const days = [];
  const today = new Date();
  
  for (let i = 25; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const minutes = Math.floor(Math.random() * 30) + 5;
    const calls = Math.floor(Math.random() * 8) + 2;
    const cost = minutes * 0.065;
    
    days.push({
      date: date.toISOString().split('T')[0],
      minutes,
      calls,
      cost: Math.round(cost * 100) / 100
    });
  }
  
  return days;
}
