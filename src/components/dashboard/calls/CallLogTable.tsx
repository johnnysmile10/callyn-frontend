
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, FileText } from "lucide-react";
import { CallRecord } from "./types";
import { formatDuration, formatCurrency, getOutcomeBadgeClass } from "./callLogUtils";

interface CallLogTableProps {
  calls: CallRecord[];
  onCallClick: (call: CallRecord) => void;
}

const CallLogTable = ({ calls, onCallClick }: CallLogTableProps) => {
  const getOutcomeBadge = (outcome: string) => {
    return (
      <Badge className={getOutcomeBadgeClass(outcome)}>
        {outcome.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Records ({calls.length})</CardTitle>
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
            {calls.map((call) => (
              <TableRow 
                key={call.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onCallClick(call)}
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
  );
};

export default CallLogTable;
