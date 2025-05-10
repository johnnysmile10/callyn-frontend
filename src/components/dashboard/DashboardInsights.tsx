
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample data for charts
const dailyCallData = [
  { name: "Mon", calls: 0, meetings: 0 },
  { name: "Tue", calls: 0, meetings: 0 },
  { name: "Wed", calls: 0, meetings: 0 },
  { name: "Thu", calls: 0, meetings: 0 },
  { name: "Fri", calls: 0, meetings: 0 },
  { name: "Sat", calls: 0, meetings: 0 },
  { name: "Sun", calls: 0, meetings: 0 },
];

const conversionData = [
  { name: "Week 1", rate: 0 },
  { name: "Week 2", rate: 0 },
  { name: "Week 3", rate: 0 },
  { name: "Week 4", rate: 0 },
];

const DashboardInsights = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
        <p className="text-muted-foreground">
          Analytics and smart recommendations to improve your sales
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Call Performance</CardTitle>
          <CardDescription>
            Track your call volume and success rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyCallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calls" fill="#8884d8" name="Calls Made" />
                    <Bar dataKey="meetings" fill="#82ca9d" name="Meetings Booked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Empty state message */}
              <div className="text-center mt-8 text-sm text-muted-foreground">
                Start making calls to see your performance data
              </div>
            </TabsContent>
            <TabsContent value="weekly" className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyCallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calls" fill="#8884d8" name="Calls Made" />
                    <Bar dataKey="meetings" fill="#82ca9d" name="Meetings Booked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-8 text-sm text-muted-foreground">
                Start making calls to see your performance data
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyCallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calls" fill="#8884d8" name="Calls Made" />
                    <Bar dataKey="meetings" fill="#82ca9d" name="Meetings Booked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-8 text-sm text-muted-foreground">
                Start making calls to see your performance data
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>
              Percentage of calls that result in bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="rate" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Smart Recommendations</CardTitle>
            <CardDescription>
              AI-powered insights to improve your results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Script</Badge>
                  <h3 className="font-medium">Try different value propositions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your current script may be too focused on features. Try highlighting benefits more prominently.
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Timing</Badge>
                  <h3 className="font-medium">Optimal calling hours</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on industry data, try scheduling calls between 10am-11am and 2pm-4pm for higher answer rates.
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Voice</Badge>
                  <h3 className="font-medium">Adjust speaking pace</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  A slightly slower pace may improve comprehension and response rates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardInsights;
