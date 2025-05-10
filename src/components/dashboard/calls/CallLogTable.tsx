
import { useState } from "react";
import { Phone, MessageSquare, AlertTriangle, Calendar, Target } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CallData } from "./mockCallData";

type CallLogTableProps = {
  filteredCalls: CallData[];
};

const CallLogTable = ({ filteredCalls }: CallLogTableProps) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  
  const toggleExpandRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };
  
  // Handle action buttons
  const handleFollowUp = (call: CallData) => {
    console.log(`Sending follow-up SMS to ${call.name} at ${call.phoneNumber}`);
    // In a real app, this would trigger an SMS sending function
  };
  
  const handleRetryCall = (call: CallData) => {
    console.log(`Retrying call to ${call.name} at ${call.phoneNumber}`);
    // In a real app, this would initiate a call
  };
  
  const handleAddNote = (call: CallData) => {
    console.log(`Adding note to call with ${call.name}`);
    // In a real app, this would open a note editor
  };
  
  const handleMarkConverted = (call: CallData) => {
    console.log(`Marking call with ${call.name} as converted`);
    // In a real app, this would update the call status
  };
  
  return (
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
  );
};

export default CallLogTable;
