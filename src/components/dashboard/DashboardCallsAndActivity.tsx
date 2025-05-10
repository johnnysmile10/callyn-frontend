
import { useState, useMemo } from "react";
import { mockCallData } from "./calls/mockCallData";
import { filterAndSortCalls, calculateStats } from "./calls/callUtils";
import CallsStatsBar from "./calls/CallsStatsBar";
import CallsFilterBar from "./calls/CallsFilterBar";
import CallLogTable from "./calls/CallLogTable";
import ObjectionInsights from "./calls/ObjectionInsights";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DashboardCallsAndActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("bookedFirst"); // Default to booked first
  
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
  
  // Calculate stats for insights widget
  const stats = useMemo(() => calculateStats(filteredCalls), [filteredCalls]);
  
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
          <CallLogTable filteredCalls={filteredCalls} />
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
