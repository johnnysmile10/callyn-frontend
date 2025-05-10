
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
  
  // Find top objection with percentage
  const objectionsArray = calls
    .filter(call => call.objection)
    .map(call => call.objection);
  
  let topObjection = "None identified";
  let objectionPercentage = 0;
  
  if (objectionsArray.length > 0) {
    const objectionCounts: Record<string, number> = {};
    
    objectionsArray.forEach(obj => {
      if (obj) {
        objectionCounts[obj] = (objectionCounts[obj] || 0) + 1;
      }
    });
    
    const sortedObjections = Object.entries(objectionCounts)
      .sort((a, b) => b[1] - a[1]);
    
    if (sortedObjections.length > 0) {
      topObjection = sortedObjections[0][0];
      objectionPercentage = Math.round((sortedObjections[0][1] / objectionsArray.length) * 100);
    }
  }
  
  return {
    totalCalls,
    bookedCalls,
    conversionRate,
    avgDuration,
    topObjection,
    objectionPercentage
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
    if (sortOrder === "bookedFirst") {
      // First sort by booked status
      if (a.outcome === "Booked" && b.outcome !== "Booked") {
        return -1;
      }
      if (a.outcome !== "Booked" && b.outcome === "Booked") {
        return 1;
      }
      // Then by date (newest first as secondary sort)
      return calls.indexOf(a) - calls.indexOf(b);
    } else if (sortOrder === "newest") {
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
