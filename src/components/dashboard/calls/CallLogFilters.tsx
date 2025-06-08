
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface CallLogFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  outcomeFilter: string;
  setOutcomeFilter: (value: string) => void;
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  campaignFilter: string;
  setCampaignFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const CallLogFilters = ({
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
}: CallLogFiltersProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Outcomes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outcomes</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
              <SelectItem value="voicemail">Voicemail</SelectItem>
              <SelectItem value="no-answer">No Answer</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="Q4 Outreach">Q4 Outreach</SelectItem>
              <SelectItem value="Lead Follow-up">Lead Follow-up</SelectItem>
              <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timestamp">Date/Time</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="outcome">Outcome</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger>
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallLogFilters;
