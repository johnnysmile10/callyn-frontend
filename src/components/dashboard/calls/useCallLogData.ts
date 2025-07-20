
import { useEffect, useMemo, useState } from "react";
import { CallRecord, CallLogStats } from "./types";
import { mockCallData } from "./mockCallData";
import { useAuth } from "@/context";
import ApiService from "@/context/services/apiService";

export const useCallLogData = () => {
  const { user } = useAuth()
  const [calls, setCalls] = useState([])

  useEffect(() => {
    ApiService.get('/call').then(data => {
      setCalls(data)
    })
  }, [user])

  const callRecords: CallRecord[] = useMemo(() =>
    calls.map(call => {
      // Parse duration from string format (e.g., "2:30" to seconds)
      // const durationParts = (call.duration || "0:0").split(':');
      // const durationInSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);

      return {
        id: call.id,
        timestamp: call.createdAt,
        contactName: call.customer.name,
        contactPhone: call.customer.number,
        contactCompany: undefined, // Not available in mock data
        duration: Math.floor(call.duration),
        outcome: call.outcome as CallRecord['outcome'] || 'no-answer',
        campaign: undefined, // Not available in mock data
        agent: call.assistant,
        cost: call.cost, // $0.02 per minute
        recording: call.reordingUrl, // Not available in mock data
        transcript: call.transcript,
        notes: null,
        tags: [], // Not available in mock data
        leadScore: Math.floor(Math.random() * 100),
        followUpDate: call.outcome === 'booked' ? new Date(Date.now() + 86400000).toISOString() : undefined,
        sentiment: call.outcome === 'booked' || call.outcome === 'interested' ? 'positive' :
          call.outcome === 'not-interested' ? 'negative' : 'neutral',
        status: call.status
      };
    }), [calls]
  );

  return callRecords;
};

export const useCallLogStats = (filteredCalls: CallRecord[]): CallLogStats => {
  return useMemo(() => {
    const total = filteredCalls.length;
    const answered = filteredCalls.filter(c => c.outcome === 'answered').length;
    const booked = filteredCalls.filter(c => c.outcome === 'booked').length;
    const totalDuration = filteredCalls.reduce((sum, c) => sum + c.duration, 0);
    const totalCost = filteredCalls.reduce((sum, c) => sum + c.cost, 0);
    const avgDuration = total > 0 ? totalDuration / total : 0;
    const bookingRate = total > 0 ? (booked / total) * 100 : 0;

    return {
      total,
      answered,
      booked,
      totalDuration,
      totalCost,
      avgDuration,
      bookingRate
    };
  }, [filteredCalls]);
};
