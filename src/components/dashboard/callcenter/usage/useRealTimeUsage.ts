
import { useState, useEffect, useCallback } from "react";
import { UsageData } from "./types";

interface RealTimeUsageOptions {
  initialUsageData: UsageData;
  isLiveCall?: boolean;
  callStartTime?: Date;
}

export const useRealTimeUsage = ({ 
  initialUsageData, 
  isLiveCall = false, 
  callStartTime 
}: RealTimeUsageOptions) => {
  const [usageData, setUsageData] = useState<UsageData>(initialUsageData);
  const [currentCallMinutes, setCurrentCallMinutes] = useState(0);

  // Update current call duration
  useEffect(() => {
    if (!isLiveCall || !callStartTime) {
      setCurrentCallMinutes(0);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - callStartTime.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      setCurrentCallMinutes(diffMinutes);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveCall, callStartTime]);

  // Calculate real-time usage including current call
  const getRealTimeUsage = useCallback(() => {
    const totalUsedMinutes = usageData.minutesUsed + currentCallMinutes;
    const realTimePercentage = (totalUsedMinutes / usageData.minutesTotal) * 100;
    const realTimeRemaining = Math.max(0, usageData.minutesTotal - totalUsedMinutes);
    const realTimeCost = totalUsedMinutes * usageData.costPerMinute;

    return {
      ...usageData,
      minutesUsed: totalUsedMinutes,
      estimatedMonthlyCost: Math.round(realTimeCost * 100) / 100,
      realTimePercentage,
      realTimeRemaining,
      currentCallMinutes
    };
  }, [usageData, currentCallMinutes]);

  // Update usage when call ends
  const finalizeCallUsage = useCallback((finalCallMinutes: number) => {
    setUsageData(prev => ({
      ...prev,
      minutesUsed: prev.minutesUsed + finalCallMinutes,
      estimatedMonthlyCost: Math.round((prev.minutesUsed + finalCallMinutes) * prev.costPerMinute * 100) / 100
    }));
    setCurrentCallMinutes(0);
  }, []);

  // Check if approaching limits
  const getUsageWarnings = useCallback(() => {
    const realTimeUsage = getRealTimeUsage();
    const warnings = [];

    if (realTimeUsage.realTimePercentage >= 95) {
      warnings.push({
        level: 'critical' as const,
        message: 'Usage limit nearly reached',
        action: 'upgrade'
      });
    } else if (realTimeUsage.realTimePercentage >= 85) {
      warnings.push({
        level: 'warning' as const,
        message: 'Approaching usage limit',
        action: 'monitor'
      });
    }

    return warnings;
  }, [getRealTimeUsage]);

  return {
    realTimeUsage: getRealTimeUsage(),
    currentCallMinutes,
    finalizeCallUsage,
    getUsageWarnings,
    setUsageData
  };
};
