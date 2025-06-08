
import { useState, useMemo } from "react";
import { mockCallData } from "./calls/mockCallData";
import { filterAndSortCalls, calculateStats } from "./calls/callUtils";
import CallsStatsBar from "./calls/CallsStatsBar";
import CallsFilterBar from "./calls/CallsFilterBar";
import CallLogTable from "./calls/CallLogTable";
import ObjectionInsights from "./calls/ObjectionInsights";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CallRecord } from "./calls/types";

const DashboardCallsAndActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("bookedFirst"); // Default to booked first
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  
  // Apply filters and sort
  const filteredCalls = useMemo(() => 
    filterAndSortCalls(
      mockCallData.calls, 
      searchTerm, 
      outcomeFilter, 
      timeFilter, 
      sortOrder
    ), 
    [searchTerm, outcomeFilter, timeFilter, sortOrder]
  );

  // Convert filtered calls to CallRecord format for CallLogTable
  const callRecords: CallRecord[] = useMemo(() => 
    filteredCalls.map(call => {
      // Parse duration from string format (e.g., "2:30" to seconds)
      const durationParts = call.duration.split(':');
      const durationInSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
      
      return {
        id: call.id.toString(),
        timestamp: call.dateTime,
        contactName: call.name,
        contactPhone: call.phoneNumber,
        contactCompany: undefined,
        duration: durationInSeconds,
        outcome: call.outcome as CallRecord['outcome'],
        campaign: undefined,
        agent: "Callyn AI Agent",
        cost: Math.round(durationInSeconds * 0.02 * 100) / 100,
        recording: undefined,
        transcript: call.transcript,
        notes: call.notes,
        tags: [],
        leadScore: Math.floor(Math.random() * 100),
        followUpDate: call.outcome === 'booked' ? new Date(Date.now() + 86400000).toISOString() : undefined,
        sentiment: call.outcome === 'booked' || call.outcome === 'interested' ? 'positive' : 
                  call.outcome === 'not-interested' ? 'negative' : 'neutral'
      };
    }), [filteredCalls]
  );
  
  // Calculate stats for insights widget
  const stats = useMemo(() => calculateStats(filteredCalls), [filteredCalls]);

  const handleCallClick = (call: CallRecord) => {
    setSelectedCall(call);
  };
  
  return (
    <div className="space-y-6">
      {/* Quick Stats Bar */}
      <CallsStatsBar filteredCalls={filteredCalls} />
      
      {/* Filter + Search Bar */}
      <CallsFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        outcomeFilter={outcomeFilter}
        setOutcomeFilter={setOutcomeFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Call Log Table */}
        <div className="lg:col-span-3">
          <CallLogTable calls={callRecords} onCallClick={handleCallClick} />
        </div>
        
        {/* Objection Intelligence Widget */}
        <div className="lg:col-span-1">
          <ObjectionInsights 
            topObjection={stats.topObjection} 
            objectionPercentage={stats.objectionPercentage} 
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCallsAndActivity;
