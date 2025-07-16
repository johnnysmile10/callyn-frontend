
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Phone } from "lucide-react";
import { useCallLogData, useCallLogStats } from "./calls/useCallLogData";
import { useCallLogFilters } from "./calls/useCallLogFilters";
import { CallRecord } from "./calls/types";
import { exportCallsToCSV } from "./calls/callLogUtils";
import CallLogStatsCards from "./calls/CallLogStatsCards";
import CallLogFilters from "./calls/CallLogFilters";
import CallLogTable from "./calls/CallLogTable";
import CallDetailsModal from "./calls/CallDetailsModal";
import ApiService from "@/context/services/apiService";
import { toast } from "sonner";

const CallLogView = () => {
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [showCallDetails, setShowCallDetails] = useState(false);
  // const [isCalling, setIsCalling] = useState(false);

  // Get call data
  const calls = useCallLogData();

  // Apply filters
  const {
    filteredCalls,
    searchTerm,
    setSearchTerm,
    outcomeFilter,
    setOutcomeFilter,
    timeFilter,
    setTimeFilter,
    campaignFilter,
    setCampaignFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
  } = useCallLogFilters(calls);

  const activeCalls = useMemo(() => calls.filter(call => call.status === 'active'), [calls])

  // Calculate statistics
  const stats = useCallLogStats(filteredCalls);

  const handleCallClick = (call: CallRecord) => {
    setSelectedCall(call);
    setShowCallDetails(true);
  };

  const handleExportData = () => {
    exportCallsToCSV(filteredCalls);
  };

  const handleStartCall = async () => {
    try {
      const data = await ApiService.get('/call-leads');
    } catch (err) {
      if (err.status === 400) {
        toast.error(err.response.data)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Call Log</h1>
          <p className="text-muted-foreground">Track and analyze all your AI agent calls</p>
        </div>
        <div className="flex gap-x-2">
          <Button onClick={handleStartCall} variant="outline" disabled={!activeCalls.length}>
            <Phone className="mr-2 h-4 w-4" />
            Start Call
          </Button>
          <Button onClick={handleExportData} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <CallLogStatsCards stats={stats} />

      {/* Filters */}
      <CallLogFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        outcomeFilter={outcomeFilter}
        setOutcomeFilter={setOutcomeFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        campaignFilter={campaignFilter}
        setCampaignFilter={setCampaignFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Call Table */}
      <CallLogTable calls={filteredCalls} onCallClick={handleCallClick} />

      {/* Call Details Modal */}
      <CallDetailsModal
        call={selectedCall}
        isOpen={showCallDetails}
        onClose={() => setShowCallDetails(false)}
      />
    </div>
  );
};

export default CallLogView;
