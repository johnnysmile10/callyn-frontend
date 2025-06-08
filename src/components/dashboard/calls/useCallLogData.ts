
import { useMemo } from "react";
import { CallRecord, CallLogStats } from "./types";
import { mockCallData } from "./mockCallData";

export const useCallLogData = () => {
  const calls: CallRecord[] = useMemo(() => 
    mockCallData.calls.map(call => {
      // Parse duration from string format (e.g., "2:30" to seconds)
      const durationParts = call.duration.split(':');
      const durationInSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
      
      return {
        id: call.id.toString(),
        timestamp: call.dateTime,
        contactName: call.name,
        contactPhone: call.phoneNumber,
        contactCompany: undefined, // Not available in mock data
        duration: durationInSeconds,
        outcome: call.outcome as CallRecord['outcome'],
        campaign: undefined, // Not available in mock data
        agent: "Callyn AI Agent",
        cost: Math.round(durationInSeconds * 0.02 * 100) / 100, // $0.02 per minute
        recording: undefined, // Not available in mock data
        transcript: call.transcript,
        notes: call.notes,
        tags: [], // Not available in mock data
        leadScore: Math.floor(Math.random() * 100),
        followUpDate: call.outcome === 'booked' ? new Date(Date.now() + 86400000).toISOString() : undefined,
        sentiment: call.outcome === 'booked' || call.outcome === 'interested' ? 'positive' : 
                  call.outcome === 'not-interested' ? 'negative' : 'neutral'
      };
    }), []
  );

  return calls;
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
