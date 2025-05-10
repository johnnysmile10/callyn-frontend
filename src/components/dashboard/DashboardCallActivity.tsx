
import { Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DashboardCallActivity = () => {
  // This would be populated from an actual API in a real app
  const recentCalls = [];
  
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Call Activity</CardTitle>
          <CardDescription>Your call history and results</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {recentCalls.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCalls.map((call, index) => (
                <TableRow key={index}>
                  <TableCell>{call.date}</TableCell>
                  <TableCell>{call.number}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>{call.status}</TableCell>
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
              Make your first call with Callyn to start tracking your sales activity
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCallActivity;
