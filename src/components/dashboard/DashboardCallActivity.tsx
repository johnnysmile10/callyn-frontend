
import { Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

// Sample data - In a real app, this would be fetched from an API
const mockCallData = {
  today: [
    { id: 1, date: "Today, 2:30 PM", number: "(555) 123-4567", name: "John Smith", duration: "3:42", status: "Booked" },
    { id: 2, date: "Today, 1:15 PM", number: "(555) 234-5678", name: "Sarah Johnson", duration: "4:15", status: "Not Interested" },
    { id: 3, date: "Today, 11:30 AM", number: "(555) 345-6789", name: "Michael Brown", duration: "0:45", status: "No Answer" },
  ],
  week: [
    { id: 4, date: "Yesterday, 3:45 PM", number: "(555) 456-7890", name: "Emily Davis", duration: "5:20", status: "Booked" },
    { id: 5, date: "2 days ago, 10:15 AM", number: "(555) 567-8901", name: "David Wilson", duration: "2:30", status: "Not Interested" },
    { id: 6, date: "3 days ago, 1:30 PM", number: "(555) 678-9012", name: "Jennifer Taylor", duration: "4:10", status: "Booked" },
  ],
  all: [
    { id: 7, date: "Last week, Monday", number: "(555) 789-0123", name: "Robert Anderson", duration: "3:55", status: "No Answer" },
    { id: 8, date: "Last week, Tuesday", number: "(555) 890-1234", name: "Lisa Martinez", duration: "6:20", status: "Booked" },
    { id: 9, date: "2 weeks ago", number: "(555) 901-2345", name: "Daniel Thompson", duration: "2:45", status: "Not Interested" },
  ]
};

const DashboardCallActivity = ({ timeFilter = "today" }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Get the appropriate calls based on the time filter
  let calls = [...(mockCallData.today || [])];
  
  if (timeFilter === "week") {
    calls = [...mockCallData.today, ...mockCallData.week];
  } else if (timeFilter === "all") {
    calls = [...mockCallData.today, ...mockCallData.week, ...mockCallData.all];
  }
  
  // Filter by status if needed
  const filteredCalls = statusFilter === "all" 
    ? calls 
    : calls.filter(call => {
        if (statusFilter === "booked") return call.status === "Booked";
        if (statusFilter === "noAnswer") return call.status === "No Answer";
        if (statusFilter === "notInterested") return call.status === "Not Interested";
        return true;
      });
  
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Call Activity</CardTitle>
          <CardDescription>Your call history and results</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <ToggleGroup type="single" value={statusFilter} onValueChange={(value) => value && setStatusFilter(value)}>
            <ToggleGroupItem value="all" aria-label="All calls" className="text-xs">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="booked" aria-label="Booked calls" className="text-xs">
              Booked
            </ToggleGroupItem>
            <ToggleGroupItem value="noAnswer" aria-label="No answer calls" className="text-xs">
              No Answer
            </ToggleGroupItem>
            <ToggleGroupItem value="notInterested" aria-label="Not interested calls" className="text-xs">
              Not Interested
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {filteredCalls.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>{call.date}</TableCell>
                  <TableCell>{call.name}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      call.status === "Booked" ? "bg-green-100 text-green-800" : 
                      call.status === "No Answer" ? "bg-gray-100 text-gray-800" : 
                      "bg-red-100 text-red-800"
                    }`}>
                      {call.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Phone className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No call activity yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              {statusFilter !== "all" 
                ? `No ${statusFilter === "booked" ? "booked calls" : statusFilter === "noAnswer" ? "missed calls" : "rejected calls"} found`
                : "Make your first call with Callyn to start tracking your sales activity"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCallActivity;
