
import { useState, useEffect, useCallback } from 'react';
import { RealtimeUsageUpdate } from './types';

interface UseRealTimeUsageProps {
  isCallActive: boolean;
  callStartTime?: Date;
  onUsageUpdate?: (minutes: number) => void;
}

export const useRealTimeUsage = ({ 
  isCallActive, 
  callStartTime, 
  onUsageUpdate 
}: UseRealTimeUsageProps) => {
  const [realtimeUsage, setRealtimeUsage] = useState<RealtimeUsageUpdate>({
    currentCallMinutes: 0,
    totalMinutesUsed: 650, // Starting from existing usage
    isActive: false
  });

  const updateCurrentCallTime = useCallback(() => {
    if (!isCallActive || !callStartTime) {
      setRealtimeUsage(prev => ({
        ...prev,
        currentCallMinutes: 0,
        isActive: false
      }));
      return;
    }

    const now = new Date();
    const diffInMs = now.getTime() - callStartTime.getTime();
    const diffInMinutes = Math.max(0, diffInMs / (1000 * 60));

    setRealtimeUsage(prev => ({
      ...prev,
      currentCallMinutes: diffInMinutes,
      isActive: true,
      callStartTime
    }));
  }, [isCallActive, callStartTime]);

  // Update every second when call is active
  useEffect(() => {
    if (!isCallActive || !callStartTime) {
      updateCurrentCallTime();
      return;
    }

    const interval = setInterval(updateCurrentCallTime, 1000);
    return () => clearInterval(interval);
  }, [isCallActive, callStartTime, updateCurrentCallTime]);

  // Notify parent when call ends to update total usage
  useEffect(() => {
    if (!isCallActive && realtimeUsage.currentCallMinutes > 0) {
      if (onUsageUpdate) {
        onUsageUpdate(realtimeUsage.currentCallMinutes);
      }
      
      setRealtimeUsage(prev => ({
        ...prev,
        totalMinutesUsed: prev.totalMinutesUsed + prev.currentCallMinutes,
        currentCallMinutes: 0,
        isActive: false
      }));
    }
  }, [isCallActive, realtimeUsage.currentCallMinutes, onUsageUpdate]);

  return {
    realtimeUsage,
    currentCallDuration: realtimeUsage.currentCallMinutes,
    isTrackingCall: realtimeUsage.isActive
  };
};
