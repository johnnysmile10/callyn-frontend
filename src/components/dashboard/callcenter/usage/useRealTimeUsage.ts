
import { useState, useEffect, useRef } from 'react';
import { RealtimeUsageUpdate } from './types';

export const useRealTimeUsage = () => {
  const [realtimeUsage, setRealtimeUsage] = useState<RealtimeUsageUpdate>({
    currentCallMinutes: 0,
    totalMinutesUsed: 0,
    isActive: false,
    callStartTime: undefined
  });

  const [isCallActive, setIsCallActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callStartTimeRef = useRef<Date | null>(null);

  // Simulate call activity (in a real app, this would come from your call service)
  useEffect(() => {
    const simulateCallActivity = () => {
      // Randomly start/stop calls for demo purposes
      const shouldStartCall = Math.random() < 0.1; // 10% chance to start a call
      const shouldEndCall = Math.random() < 0.2; // 20% chance to end a call

      if (!isCallActive && shouldStartCall) {
        startCall();
      } else if (isCallActive && shouldEndCall) {
        endCall();
      }
    };

    const activityInterval = setInterval(simulateCallActivity, 5000);
    return () => clearInterval(activityInterval);
  }, [isCallActive]);

  const startCall = () => {
    const startTime = new Date();
    callStartTimeRef.current = startTime;
    setIsCallActive(true);
    
    setRealtimeUsage(prev => ({
      ...prev,
      isActive: true,
      callStartTime: startTime,
      currentCallMinutes: 0
    }));

    // Start tracking call duration
    intervalRef.current = setInterval(() => {
      if (callStartTimeRef.current) {
        const now = new Date();
        const durationMs = now.getTime() - callStartTimeRef.current.getTime();
        const durationMinutes = durationMs / (1000 * 60);

        setRealtimeUsage(prev => ({
          ...prev,
          currentCallMinutes: durationMinutes
        }));
      }
    }, 1000); // Update every second
  };

  const endCall = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setRealtimeUsage(prev => {
      const finalCallMinutes = prev.currentCallMinutes;
      return {
        ...prev,
        isActive: false,
        totalMinutesUsed: prev.totalMinutesUsed + finalCallMinutes,
        currentCallMinutes: 0,
        callStartTime: undefined
      };
    });

    setIsCallActive(false);
    callStartTimeRef.current = null;
  };

  // Manual controls for testing
  const startTestCall = () => {
    if (!isCallActive) {
      startCall();
    }
  };

  const endTestCall = () => {
    if (isCallActive) {
      endCall();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    realtimeUsage,
    isCallActive,
    startTestCall,
    endTestCall
  };
};
