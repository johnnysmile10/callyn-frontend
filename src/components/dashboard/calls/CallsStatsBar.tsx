
import { useMemo } from "react";
import { CallData } from "./mockCallData";
import { calculateStats } from "./callUtils";
import CallStatsCard from "./CallStatsCard";

type CallsStatsBarProps = {
  filteredCalls: CallData[];
};

const CallsStatsBar = ({ filteredCalls }: CallsStatsBarProps) => {
  // Calculate stats based on filtered calls
  const stats = useMemo(() => calculateStats(filteredCalls), [filteredCalls]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <CallStatsCard title="Total Calls" value={stats.totalCalls} />
      <CallStatsCard title="Booked Appointments" value={stats.bookedCalls} />
      <CallStatsCard title="Conversion Rate" value={`${stats.conversionRate}%`} />
      <CallStatsCard title="Avg. Call Duration" value={stats.avgDuration} />
      <CallStatsCard 
        title="Top Objection" 
        value={stats.topObjection !== "None identified" ? stats.topObjection : "None"} 
      />
    </div>
  );
};

export default CallsStatsBar;
