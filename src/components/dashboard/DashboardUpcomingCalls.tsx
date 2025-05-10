
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardUpcomingCalls = () => {
  // This would be populated from an actual API in a real app
  const upcomingCalls = [];
  
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Upcoming Calls</CardTitle>
          <CardDescription>Schedule and prepare for calls</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {upcomingCalls.length > 0 ? (
          <div className="space-y-4">
            {upcomingCalls.map((call, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{call.company}</p>
                  <p className="text-sm text-muted-foreground">{call.date} • {call.time}</p>
                </div>
                <Button variant="outline" size="sm">Prepare</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No upcoming calls</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Schedule calls with prospects to have Callyn assist you
            </p>
            <Button variant="outline" className="mt-4">
              Schedule Call
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardUpcomingCalls;
