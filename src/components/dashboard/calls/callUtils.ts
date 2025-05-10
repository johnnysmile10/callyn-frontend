
import { CallData } from "./mockCallData";

// Stats calculation functions
export const calculateStats = (calls: CallData[]) => {
  const totalCalls = calls.length;
  const bookedCalls = calls.filter(call => call.outcome === "Booked").length;
  const conversionRate = totalCalls > 0 ? ((bookedCalls / totalCalls) * 100).toFixed(1) : "0.0";
  
  // Calculate average duration
  const callsWithDuration = calls.filter(call => call.duration && call.duration !== "0:00");
  let avgDuration = "0:00";
  if (callsWithDuration.length > 0) {
    const totalSeconds = callsWithDuration.reduce((acc, call) => {
      const [mins, secs] = call.duration.split(":");
      return acc + (parseInt(mins, 10) * 60 + parseInt(secs, 10));
    }, 0);
    
    const avgSeconds = Math.round(totalSeconds / callsWithDuration.length);
    const avgMinutes = Math.floor(avgSeconds / 60);
    const remainingSeconds = avgSeconds % 60;
    avgDuration = `${avgMinutes}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  
  // Find top objection
  const objections = calls
    .filter(call => call.objection)
    .map(call => call.objection);
  
  let topObjection = "None identified";
  if (objections.length > 0) {
    const objectionCounts = objections.reduce((acc, obj) => {
      acc[obj as string] = (acc[obj as string] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    topObjection = Object.entries(objectionCounts)
      .sort((a, b) => b[1] - a[1])[0][0];
  }
  
  return {
    totalCalls,
    bookedCalls,
    conversionRate,
    avgDuration,
    topObjection
  };
};

// Generate rebuttal based on objection
export const getRebuttalSuggestion = (objection: string) => {
  const rebuttals: Record<string, string> = {
    "Price concerns": "Focus on ROI and long-term value: 'Our clients typically see a 300% return within the first 6 months.'",
    "Already using competitor": "Highlight your unique advantages: 'That's exactly why others switch to us - our integration with X saves teams an average of 5 hours per week.'",
    "Needs to consult team": "Offer decision-making assistance: 'I'd be happy to join a call with your team to answer their questions directly.'",
    "No budget": "Explore flexible options: 'We have several plans that can accommodate different budgets, including quarterly payment options.'",
  };
  
  return rebuttals[objection] || "Suggested approach: Ask follow-up questions to better understand their specific concerns.";
};

// Filter and sort calls
export const filterAndSortCalls = (
  calls: CallData[],
  searchTerm: string,
  outcomeFilter: string,
  timeFilter: string,
  sortOrder: string
) => {
  return calls.filter(call => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phoneNumber.includes(searchTerm);
    
    // Outcome filter
    const matchesOutcome = outcomeFilter === "all" || call.outcome.toLowerCase() === outcomeFilter.toLowerCase();
    
    // Time filter - simplified for mock data
    const matchesTime = timeFilter === "all" || 
      (timeFilter === "today" && call.dateTime.includes("Today")) ||
      (timeFilter === "week" && (call.dateTime.includes("Today") || call.dateTime.includes("Yesterday") || call.dateTime.includes("days ago"))) ||
      (timeFilter === "month" && !call.dateTime.includes("Last week"));
    
    return matchesSearch && matchesOutcome && matchesTime;
  }).sort((a, b) => {
    // Sort logic
    if (sortOrder === "newest") {
      // Simple sort for demo - in real app would use proper date objects
      return calls.indexOf(a) - calls.indexOf(b);
    } else if (sortOrder === "oldest") {
      return calls.indexOf(b) - calls.indexOf(a);
    } else if (sortOrder === "duration") {
      const durationA = a.duration ? parseInt(a.duration.replace(':', ''), 10) : 0;
      const durationB = b.duration ? parseInt(b.duration.replace(':', ''), 10) : 0;
      return durationB - durationA;
    }
    return 0;
  });
};
