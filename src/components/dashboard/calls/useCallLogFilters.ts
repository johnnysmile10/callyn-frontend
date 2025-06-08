
import { useState, useMemo } from "react";
import { CallRecord } from "./types";

export const useCallLogFilters = (calls: CallRecord[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredCalls = useMemo(() => {
    let filtered = calls;

    if (searchTerm) {
      filtered = filtered.filter(call => 
        call.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.contactPhone.includes(searchTerm) ||
        (call.contactCompany && call.contactCompany.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (call.campaign && call.campaign.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (outcomeFilter !== "all") {
      filtered = filtered.filter(call => call.outcome === outcomeFilter);
    }

    if (campaignFilter !== "all") {
      filtered = filtered.filter(call => call.campaign === campaignFilter);
    }

    if (timeFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch (timeFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      if (timeFilter !== "all") {
        filtered = filtered.filter(call => new Date(call.timestamp) >= filterDate);
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "timestamp":
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
          break;
        case "duration":
          aValue = a.duration;
          bValue = b.duration;
          break;
        case "outcome":
          aValue = a.outcome;
          bValue = b.outcome;
          break;
        case "contact":
          aValue = a.contactName;
          bValue = b.contactName;
          break;
        default:
          aValue = a.timestamp;
          bValue = b.timestamp;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [calls, searchTerm, outcomeFilter, campaignFilter, timeFilter, sortBy, sortOrder]);

  return {
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
  };
};
