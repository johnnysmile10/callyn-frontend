
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CallsFilterBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  outcomeFilter: string;
  setOutcomeFilter: (filter: string) => void;
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

const CallsFilterBar = ({
  searchTerm,
  setSearchTerm,
  outcomeFilter,
  setOutcomeFilter,
  timeFilter,
  setTimeFilter,
  sortOrder,
  setSortOrder,
}: CallsFilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or phone number..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[140px]">
              {outcomeFilter === "all" ? "All Outcomes" : 
               outcomeFilter === "booked" ? "Booked" :
               outcomeFilter === "noAnswer" ? "No Answer" :
               outcomeFilter === "notInterested" ? "Not Interested" :
               outcomeFilter === "callback" ? "Callback" :
               outcomeFilter === "voicemail" ? "Voicemail" : "Outcome"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setOutcomeFilter("all")}>All Outcomes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOutcomeFilter("booked")}>Booked</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOutcomeFilter("noAnswer")}>No Answer</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOutcomeFilter("notInterested")}>Not Interested</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOutcomeFilter("callback")}>Callback</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOutcomeFilter("voicemail")}>Voicemail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[140px]">
              {timeFilter === "all" ? "All Time" :
               timeFilter === "today" ? "Today" :
               timeFilter === "week" ? "Last 7 Days" : "This Month"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTimeFilter("all")}>All Time</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter("today")}>Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter("week")}>Last 7 Days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter("month")}>This Month</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[140px]">
              {sortOrder === "bookedFirst" ? "Booked First" :
               sortOrder === "newest" ? "Newest First" :
               sortOrder === "oldest" ? "Oldest First" : "Longest Calls"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOrder("bookedFirst")}>Booked First</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("newest")}>Newest First</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Oldest First</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("duration")}>Longest Calls</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CallsFilterBar;
