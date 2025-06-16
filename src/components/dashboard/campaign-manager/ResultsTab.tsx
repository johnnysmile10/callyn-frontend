
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { 
  TrendingUp, 
  Phone, 
  Target, 
  Clock, 
  Download, 
  Filter,
  Calendar,
  Award,
  AlertCircle
} from "lucide-react";

// Mock analytics data
const callOutcomeData = [
  { name: "Interested", value: 35, color: "#10B981" },
  { name: "Not Interested", value: 115, color: "#EF4444" },
  { name: "Callback Scheduled", value: 22, color: "#F59E0B" },
  { name: "No Answer", value: 29, color: "#6B7280" },
];

const dailyPerformanceData = [
  { day: "Mon", calls: 45, conversions: 8 },
  { day: "Tue", calls: 52, conversions: 12 },
  { day: "Wed", calls: 38, conversions: 6 },
  { day: "Thu", calls: 61, conversions: 15 },
  { day: "Fri", calls: 48, conversions: 11 },
  { day: "Sat", calls: 33, conversions: 7 },
  { day: "Sun", calls: 25, conversions: 4 },
];

const hourlyPerformanceData = [
  { hour: "9AM", calls: 8, success: 65 },
  { hour: "10AM", calls: 12, success: 72 },
  { hour: "11AM", calls: 15, success: 68 },
  { hour: "12PM", calls: 10, success: 45 },
  { hour: "1PM", calls: 8, success: 38 },
  { hour: "2PM", calls: 14, success: 71 },
  { hour: "3PM", calls: 16, success: 75 },
  { hour: "4PM", calls: 13, success: 69 },
  { hour: "5PM", calls: 11, success: 58 },
];

const agentPerformanceData = [
  { agent: "Dr. Sarah AI", calls: 89, conversions: 12, rate: 13.5, avgDuration: "3:24" },
  { agent: "Tech Expert AI", calls: 23, conversions: 8, rate: 34.8, avgDuration: "4:12" },
  { agent: "Property AI", calls: 89, conversions: 15, rate: 16.9, avgDuration: "2:58" },
];

const ResultsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  const totalCalls = callOutcomeData.reduce((sum, item) => sum + item.value, 0);
  const conversionRate = ((callOutcomeData[0].value + callOutcomeData[2].value) / totalCalls * 100).toFixed(1);
  const avgCallDuration = "3:18";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Results & Analytics</h2>
          <p className="text-gray-600">Track performance and analyze campaign outcomes</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="dental">Dental Practice Outreach</SelectItem>
              <SelectItem value="b2b">B2B Software Demo</SelectItem>
              <SelectItem value="realestate">Real Estate Investment</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
                <p className="text-2xl font-bold">{totalCalls}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{conversionRate}%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3.2% from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Avg Call Duration</p>
                <p className="text-2xl font-bold">{avgCallDuration}</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  -8s from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Award className="h-4 w-4 text-yellow-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                <p className="text-2xl font-bold">8.7</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Outcomes Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Call Outcomes</CardTitle>
            <CardDescription>Distribution of call results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={callOutcomeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {callOutcomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {callOutcomeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Performance</CardTitle>
            <CardDescription>Calls and conversions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calls" fill="#3B82F6" />
                  <Bar dataKey="conversions" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="hourly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hourly">Hourly Trends</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Success Rate</CardTitle>
              <CardDescription>Call success rate throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="success" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Comparison</CardTitle>
              <CardDescription>Compare performance across different AI agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformanceData.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{agent.agent}</h4>
                      <p className="text-sm text-gray-600">{agent.calls} calls made</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Conversions</p>
                        <p className="font-bold text-green-600">{agent.conversions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Rate</p>
                        <p className="font-bold">{agent.rate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Avg Duration</p>
                        <p className="font-bold">{agent.avgDuration}</p>
                      </div>
                      <Badge variant={agent.rate > 20 ? "default" : "secondary"}>
                        {agent.rate > 20 ? "High Performer" : "Average"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">Best Performing Time</p>
                  <p className="text-sm text-green-700">3:00 PM shows 75% success rate - 20% above average</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Script Effectiveness</p>
                  <p className="text-sm text-blue-700">Healthcare scripts convert 23% better than generic ones</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">Optimization Opportunity</p>
                  <p className="text-sm text-yellow-700">Callback follow-ups have 68% success rate</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Increase afternoon calls</p>
                  <p className="text-sm text-gray-600">Schedule 60% of calls between 2-4 PM for better results</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Optimize callback timing</p>
                  <p className="text-sm text-gray-600">Follow up on callbacks within 24 hours for best conversion</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Agent training focus</p>
                  <p className="text-sm text-gray-600">Tech Expert AI needs objection handling improvement</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsTab;
