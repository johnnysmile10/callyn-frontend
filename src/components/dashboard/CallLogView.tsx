
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  PhoneCall, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  User,
  Tag,
  Download,
  Play,
  FileText,
  TrendingUp,
  BarChart3,
  MessageSquare
} from "lucide-react";
import { mockCallData } from "./calls/mockCallData";

interface CallRecord {
  id: string;
  timestamp: string;
  contactName: string;
  contactPhone: string;
  contactCompany?: string;
  duration: number;
  outcome: "answered" | "voicemail" | "no-answer" | "busy" | "failed" | "booked" | "interested" | "not-interested";
  campaign?: string;
  agent: string;
  cost: number;
  recording?: string;
  transcript?: string;
  notes?: string;
  tags: string[];
  leadScore?: number;
  followUpDate?: string;
  sentiment?: "positive" | "neutral" | "negative";
}

const CallLogView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [showCallDetails, setShowCallDetails] = useState(false);

  // Convert mock data to our enhanced format
  const calls: CallRecord[] = useMemo(() => 
    mockCallData.calls.map(call => {
      // Parse duration from string format (e.g., "2:30" to seconds)
      const durationParts = call.duration.split(':');
      const durationInSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
      
      return {
        id: call.id.toString(),
        timestamp: call.dateTime,
        contactName: call.name,
        contactPhone: call.phoneNumber,
        contactCompany: undefined, // Not available in mock data
        duration: durationInSeconds,
        outcome: call.outcome as CallRecord['outcome'],
        campaign: undefined, // Not available in mock data
        agent: "Callyn AI Agent",
        cost: Math.round(durationInSeconds * 0.02 * 100) / 100, // $0.02 per minute
        recording: undefined, // Not available in mock data
        transcript: call.transcript,
        notes: call.notes,
        tags: [], // Not available in mock data
        leadScore: Math.floor(Math.random() * 100),
        followUpDate: call.outcome === 'booked' ? new Date(Date.now() + 86400000).toISOString() : undefined,
        sentiment: call.outcome === 'booked' || call.outcome === 'interested' ? 'positive' : 
                  call.outcome === 'not-interested' ? 'negative' : 'neutral'
      };
    }), []
  );

  // Advanced filtering
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

  // Statistics
  const stats = useMemo(() => {
    const total = filteredCalls.length;
    const answered = filteredCalls.filter(c => c.outcome === 'answered').length;
    const booked = filteredCalls.filter(c => c.outcome === 'booked').length;
    const totalDuration = filteredCalls.reduce((sum, c) => sum + c.duration, 0);
    const totalCost = filteredCalls.reduce((sum, c) => sum + c.cost, 0);
    const avgDuration = total > 0 ? totalDuration / total : 0;
    const bookingRate = total > 0 ? (booked / total) * 100 : 0;

    return {
      total,
      answered,
      booked,
      totalDuration,
      totalCost,
      avgDuration,
      bookingRate
    };
  }, [filteredCalls]);

  const getOutcomeBadge = (outcome: string) => {
    const colors = {
      answered: "bg-blue-100 text-blue-800",
      voicemail: "bg-yellow-100 text-yellow-800", 
      "no-answer": "bg-gray-100 text-gray-800",
      busy: "bg-orange-100 text-orange-800",
      failed: "bg-red-100 text-red-800",
      booked: "bg-green-100 text-green-800",
      interested: "bg-purple-100 text-purple-800",
      "not-interested": "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={colors[outcome as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {outcome.replace('-', ' ')}
      </Badge>
    );
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleCallClick = (call: CallRecord) => {
    setSelectedCall(call);
    setShowCallDetails(true);
  };

  const exportData = () => {
    const csvContent = [
      // CSV headers
      "Timestamp,Contact,Phone,Company,Duration,Outcome,Campaign,Cost,Notes",
      // CSV rows
      ...filteredCalls.map(call => 
        `${call.timestamp},"${call.contactName}","${call.contactPhone}","${call.contactCompany || ''}",${call.duration},"${call.outcome}","${call.campaign || ''}","${call.cost}","${call.notes || ''}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `call-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Call Log</h1>
          <p className="text-muted-foreground">Track and analyze all your AI agent calls</p>
        </div>
        <Button onClick={exportData} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Calls</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Booking Rate</p>
                <p className="text-2xl font-bold">{stats.bookingRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Avg Duration</p>
                <p className="text-2xl font-bold">{formatDuration(Math.round(stats.avgDuration))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Total Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalCost)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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

      {/* Call Table */}
      <Card>
        <CardHeader>
          <CardTitle>Call Records ({filteredCalls.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date/Time</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow 
                  key={call.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCallClick(call)}
                >
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {new Date(call.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(call.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{call.contactName}</div>
                  </TableCell>
                  <TableCell>{call.contactPhone}</TableCell>
                  <TableCell>{call.contactCompany || '-'}</TableCell>
                  <TableCell>{formatDuration(call.duration)}</TableCell>
                  <TableCell>{getOutcomeBadge(call.outcome)}</TableCell>
                  <TableCell>{call.campaign || '-'}</TableCell>
                  <TableCell>{formatCurrency(call.cost)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {call.recording && (
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      {call.transcript && (
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Call Details Modal */}
      <Dialog open={showCallDetails} onOpenChange={setShowCallDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
            <DialogDescription>
              Complete information about this call
            </DialogDescription>
          </DialogHeader>
          {selectedCall && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Call Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {selectedCall.contactName}</div>
                      <div><strong>Phone:</strong> {selectedCall.contactPhone}</div>
                      <div><strong>Company:</strong> {selectedCall.contactCompany || 'N/A'}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Call Details</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Date:</strong> {new Date(selectedCall.timestamp).toLocaleString()}</div>
                      <div><strong>Duration:</strong> {formatDuration(selectedCall.duration)}</div>
                      <div><strong>Outcome:</strong> {getOutcomeBadge(selectedCall.outcome)}</div>
                      <div><strong>Campaign:</strong> {selectedCall.campaign || 'N/A'}</div>
                      <div><strong>Cost:</strong> {formatCurrency(selectedCall.cost)}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Transcript */}
                {selectedCall.transcript && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Call Transcript
                    </h3>
                    <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                      {selectedCall.transcript}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedCall.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <div className="bg-muted p-4 rounded-lg text-sm">
                      {selectedCall.notes}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedCall.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCall.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow-up */}
                {selectedCall.followUpDate && (
                  <div>
                    <h3 className="font-semibold mb-2">Follow-up Scheduled</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedCall.followUpDate).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CallLogView;
