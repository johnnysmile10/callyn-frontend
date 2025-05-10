
import { useState, useEffect, useMemo } from "react";
import { Search, Calendar, Phone, Clock, Target, AlertTriangle, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - In a real app, this would be fetched from an API
const mockCallData = {
  calls: [
    { 
      id: 1, 
      name: "John Smith", 
      phoneNumber: "(555) 123-4567", 
      dateTime: "Today, 2:30 PM", 
      duration: "3:42", 
      outcome: "Booked", 
      objection: null, 
      notes: "Interested in premium plan, has team of 5", 
      bookingLink: "https://calendly.com/example/meeting",
      transcript: "Client expressed interest in the premium features. Concerned about implementation timeline.",
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      phoneNumber: "(555) 234-5678", 
      dateTime: "Today, 1:15 PM", 
      duration: "4:15", 
      outcome: "Not Interested", 
      objection: "Already using competitor", 
      notes: "Currently using ProductX, contract renewal in 6 months", 
      bookingLink: null,
      transcript: "Client mentioned they're locked into a contract with CompetitorX for another 6 months.",
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      phoneNumber: "(555) 345-6789", 
      dateTime: "Today, 11:30 AM", 
      duration: "0:45", 
      outcome: "No Answer", 
      objection: null, 
      notes: "Left voicemail", 
      bookingLink: null,
      transcript: null,
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      phoneNumber: "(555) 456-7890", 
      dateTime: "Yesterday, 3:45 PM", 
      duration: "5:20", 
      outcome: "Booked", 
      objection: "Price concerns", 
      notes: "Negotiated 10% discount, needs approval", 
      bookingLink: "https://calendly.com/example/meeting",
      transcript: "Discussed pricing options. Client requested discount for annual commitment.",
    },
    { 
      id: 5, 
      name: "David Wilson", 
      phoneNumber: "(555) 567-8901", 
      dateTime: "2 days ago, 10:15 AM", 
      duration: "2:30", 
      outcome: "Callback", 
      objection: "Needs to consult team", 
      notes: "Will follow up next week after team meeting", 
      bookingLink: null,
      transcript: "Client needs to discuss with their team before making a decision.",
    },
    { 
      id: 6, 
      name: "Jennifer Taylor", 
      phoneNumber: "(555) 678-9012", 
      dateTime: "3 days ago, 1:30 PM", 
      duration: "4:10", 
      outcome: "Booked", 
      objection: null, 
      notes: "Very enthusiastic, ready to start immediately", 
      bookingLink: "https://calendly.com/example/meeting",
      transcript: "Client was excited about features X, Y, and Z. Ready to start onboarding process.",
    },
    { 
      id: 7, 
      name: "Robert Anderson", 
      phoneNumber: "(555) 789-0123", 
      dateTime: "Last week, Monday", 
      duration: "3:55", 
      outcome: "Voicemail", 
      objection: null, 
      notes: "Left detailed message with call back info", 
      bookingLink: null,
      transcript: null,
    },
  ]
};

// Stats calculation functions
const calculateStats = (calls) => {
  const totalCalls = calls.length;
  const bookedCalls = calls.filter(call => call.outcome === "Booked").length;
  const conversionRate = totalCalls > 0 ? ((bookedCalls / totalCalls) * 100).toFixed(1) : "0.0";
  
  // Calculate average duration
  const callsWithDuration = calls.filter(call => call.duration && call.duration !== "0:00");
  let avgDuration = "0:00";
  if (callsWithDuration.length > 0) {
    const totalMinutes = callsWithDuration.reduce((acc, call) => {
      const [mins, secs] = call.duration.split(":");
      return acc + (parseInt(mins) * 60 + parseInt(secs));
    }, 0);
    const avgSeconds = Math.round(totalMinutes / callsWithDuration.length);
    avgDuration = `${Math.floor(avgSeconds / 60)}:${String(avgSeconds % 60).padStart(2, '0')}`;
  }
  
  // Find top objection
  const objections = calls
    .filter(call => call.objection)
    .map(call => call.objection);
  
  let topObjection = "None identified";
  if (objections.length > 0) {
    const objectionCounts = objections.reduce((acc, obj) => {
      acc[obj] = (acc[obj] || 0) + 1;
      return acc;
    }, {});
    
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
const getRebuttalSuggestion = (objection) => {
  const rebuttals = {
    "Price concerns": "Focus on ROI and long-term value: 'Our clients typically see a 300% return within the first 6 months.'",
    "Already using competitor": "Highlight your unique advantages: 'That's exactly why others switch to us - our integration with X saves teams an average of 5 hours per week.'",
    "Needs to consult team": "Offer decision-making assistance: 'I'd be happy to join a call with your team to answer their questions directly.'",
    "No budget": "Explore flexible options: 'We have several plans that can accommodate different budgets, including quarterly payment options.'",
  };
  
  return rebuttals[objection] || "Suggested approach: Ask follow-up questions to better understand their specific concerns.";
};

const DashboardCallsAndActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [calls, setCalls] = useState(mockCallData.calls);
  
  // Apply filters and search
  const filteredCalls = useMemo(() => {
    return mockCallData.calls.filter(call => {
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
        return mockCallData.calls.indexOf(a) - mockCallData.calls.indexOf(b);
      } else if (sortOrder === "oldest") {
        return mockCallData.calls.indexOf(b) - mockCallData.calls.indexOf(a);
      } else if (sortOrder === "duration") {
        const durationA = a.duration ? parseInt(a.duration.replace(':', '')) : 0;
        const durationB = b.duration ? parseInt(b.duration.replace(':', '')) : 0;
        return durationB - durationA;
      }
      return 0;
    });
  }, [searchTerm, outcomeFilter, timeFilter, sortOrder]);
  
  // Calculate stats based on filtered calls
  const stats = useMemo(() => calculateStats(filteredCalls), [filteredCalls]);
  
  // Find the most common objection for the insight widget
  const topObjection = stats.topObjection;
  const rebuttalSuggestion = getRebuttalSuggestion(topObjection);
  
  const toggleExpandRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };
  
  // Handle action buttons
  const handleFollowUp = (call) => {
    console.log(`Sending follow-up SMS to ${call.name} at ${call.phoneNumber}`);
    // In a real app, this would trigger an SMS sending function
  };
  
  const handleRetryCall = (call) => {
    console.log(`Retrying call to ${call.name} at ${call.phoneNumber}`);
    // In a real app, this would initiate a call
  };
  
  const handleAddNote = (call) => {
    console.log(`Adding note to call with ${call.name}`);
    // In a real app, this would open a note editor
  };
  
  const handleMarkConverted = (call) => {
    console.log(`Marking call with ${call.name} as converted`);
    // In a real app, this would update the call status
  };
  
  return (
    <div className="space-y-6">
      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Booked Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookedCalls}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDuration}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Objection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium truncate" title={stats.topObjection}>
              {stats.topObjection !== "None identified" ? stats.topObjection : "None"}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter + Search Bar */}
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
                {sortOrder === "newest" ? "Newest First" :
                 sortOrder === "oldest" ? "Oldest First" : "Longest Calls"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOrder("newest")}>Newest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Oldest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("duration")}>Longest Calls</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Call Log Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Call Log</CardTitle>
              <CardDescription>Complete history of all call activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCalls.length > 0 ? (
                    filteredCalls.map((call) => (
                      <>
                        <TableRow key={call.id} className="cursor-pointer" onClick={() => toggleExpandRow(call.id)}>
                          <TableCell>{call.name}</TableCell>
                          <TableCell>
                            <a href={`tel:${call.phoneNumber}`} onClick={(e) => e.stopPropagation()} className="flex items-center hover:text-primary">
                              <Phone className="mr-1 h-3 w-3" />{call.phoneNumber}
                            </a>
                          </TableCell>
                          <TableCell>{call.dateTime}</TableCell>
                          <TableCell>
                            <Badge className={
                              call.outcome === "Booked" ? "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800" :
                              call.outcome === "No Answer" ? "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-800" :
                              call.outcome === "Not Interested" ? "bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-800" :
                              call.outcome === "Callback" ? "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-800" :
                              "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-800"
                            }>
                              {call.outcome}
                            </Badge>
                            {call.objection && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                <AlertTriangle className="inline h-3 w-3 mr-1" />
                                {call.objection}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{call.duration}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={(e) => { e.stopPropagation(); handleFollowUp(call); }}
                              >
                                <MessageSquare className="h-3 w-3" />
                                <span className="sr-only md:not-sr-only md:ml-2">Follow Up</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={(e) => { e.stopPropagation(); handleRetryCall(call); }}
                              >
                                <Phone className="h-3 w-3" />
                                <span className="sr-only md:not-sr-only md:ml-2">Retry</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedRowId === call.id && (
                          <TableRow className="bg-accent/30">
                            <TableCell colSpan={6} className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                                  <p className="text-sm text-muted-foreground">{call.notes || "No notes available"}</p>
                                  
                                  {call.transcript && (
                                    <div className="mt-3">
                                      <h4 className="text-sm font-medium mb-2">Transcript Preview</h4>
                                      <p className="text-sm text-muted-foreground line-clamp-2">{call.transcript}</p>
                                      <Button variant="link" className="p-0 h-auto text-xs mt-1">View full transcript</Button>
                                    </div>
                                  )}
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-3">
                                    <h4 className="text-sm font-medium">Actions</h4>
                                    {call.bookingLink && (
                                      <a href={call.bookingLink} target="_blank" rel="noopener noreferrer">
                                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          View Booking
                                        </Button>
                                      </a>
                                    )}
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="justify-start"
                                      onClick={() => handleAddNote(call)}
                                    >
                                      <svg className="h-3.5 w-3.5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5H9C7.89543 5 7 5.89543 7 7V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V10M12 5V10H17M12 5L17 10M12 14H14M10 14H10.01M12 16H14M10 16H10.01M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                      Add Note
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="justify-start"
                                      onClick={() => handleMarkConverted(call)}
                                    >
                                      <Target className="h-3.5 w-3.5 mr-2" />
                                      Mark Converted
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No calls match your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Objection Intelligence Widget */}
        <div className="lg:col-span-1">
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle className="text-lg">Objection Intelligence</CardTitle>
              <CardDescription>Insights to improve your close rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Most common objection:</h4>
                  <div className="px-3 py-2 bg-background rounded-md">
                    "{topObjection !== "None identified" ? topObjection : "No objections recorded yet"}"
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Suggested rebuttal:</h4>
                  <div className="px-3 py-2 bg-background rounded-md text-sm text-muted-foreground">
                    {rebuttalSuggestion}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full" variant="outline">
                    View All Objection Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardCallsAndActivity;
