
import { Phone, User, Calendar, TrendingUp, Play, Pause, Clock, CalendarCheck, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardCallActivity from "./DashboardCallActivity";
import DashboardUpcomingCalls from "./DashboardUpcomingCalls";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardOverviewProps {
  campaignActive?: boolean;
  onCampaignToggle?: (active: boolean) => void;
}

const DashboardOverview = ({ campaignActive = false, onCampaignToggle }: DashboardOverviewProps) => {
  const { user, onboardingData } = useAuth();
  const navigate = useNavigate();
  const [localCampaignActive, setLocalCampaignActive] = useState(campaignActive);
  const [timeFilter, setTimeFilter] = useState("today");
  
  useEffect(() => {
    setLocalCampaignActive(campaignActive);
  }, [campaignActive]);
  
  const toggleCampaign = () => {
    const newState = !localCampaignActive;
    setLocalCampaignActive(newState);
    if (onCampaignToggle) {
      onCampaignToggle(newState);
    }
  };

  const handleCreateAgent = () => {
    navigate("/create-agent");
  };

  // In a real app, these would come from an API and would change based on timeFilter
  const minutesUsed = 15;
  const totalMinutes = 45;
  const minutesPercentage = (minutesUsed / totalMinutes) * 100;
  
  const metricsData = {
    today: {
      totalCalls: 5,
      conversionRate: 40,
      leadsGenerated: 2,
      timeSaved: 25,
      callsHandled: 5,
      appointmentsBooked: 2
    },
    week: {
      totalCalls: 24,
      conversionRate: 45,
      leadsGenerated: 11,
      timeSaved: 120,
      callsHandled: 24,
      appointmentsBooked: 8
    },
    all: {
      totalCalls: 87,
      conversionRate: 42,
      leadsGenerated: 36,
      timeSaved: 435,
      callsHandled: 87,
      appointmentsBooked: 22
    }
  };
  
  const currentMetrics = metricsData[timeFilter === "today" ? "today" : timeFilter === "week" ? "week" : "all"];
  
  const handleTimeFilterChange = (value) => {
    setTimeFilter(value);
  };
  
  return (
    <div className="space-y-8">
      {/* Header with Create Agent button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}! 
            Here's what's happening with your Callyn AI sales assistant.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleCreateAgent}
            className="bg-callyn-blue hover:bg-callyn-darkBlue text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Agent
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View period:</span>
            <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Quick action panel */}
      <Card className="bg-gradient-to-r from-callyn-darkBlue to-callyn-blue text-white">
        <CardHeader className="pb-2">
          <CardTitle>Your AI Sales Assistant is {localCampaignActive ? "Active" : "Ready"}</CardTitle>
          <CardDescription className="text-white text-opacity-80">
            {localCampaignActive 
              ? "Callyn is currently making calls on your behalf" 
              : onboardingData?.businessName 
                ? `Trained for ${onboardingData.businessName}` 
                : "Start making calls with Callyn"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button 
              variant={localCampaignActive ? "destructive" : "secondary"} 
              size="lg" 
              className="gap-2"
              onClick={toggleCampaign}
            >
              {localCampaignActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  Stop Call Campaign
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Call Campaign
                </>
              )}
            </Button>
            <span className="text-sm opacity-85">
              {!localCampaignActive 
                ? "First 45 minutes free. No credit card required." 
                : "Let Callyn qualify your leads while you focus on closing."}
            </span>
          </div>
        </CardContent>
      </Card>
      
      {/* Usage tracker */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Usage Tracker</CardTitle>
          <CardDescription>
            {minutesUsed} of {totalMinutes} minutes used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={minutesPercentage} className="h-2 mb-4" />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {totalMinutes - minutesUsed} minutes remaining
            </span>
            <Button variant="outline" size="sm">Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Metrics summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              {timeFilter === "today" ? "Made today" : timeFilter === "week" ? "Made this week" : "All time"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Booked</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.appointmentsBooked}</div>
            <p className="text-xs text-muted-foreground">
              {timeFilter === "today" ? "Booked today" : timeFilter === "week" ? "Booked this week" : "All time"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {timeFilter === "today" ? "Today's rate" : timeFilter === "week" ? "This week's rate" : "Overall rate"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.leadsGenerated}</div>
            <p className="text-xs text-muted-foreground">
              {timeFilter === "today" ? "Generated today" : timeFilter === "week" ? "Generated this week" : "All time"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.timeSaved}min</div>
            <p className="text-xs text-muted-foreground">
              {currentMetrics.callsHandled} calls = {currentMetrics.timeSaved} minutes saved
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity and upcoming calls */}
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCallActivity timeFilter={timeFilter} />
        <DashboardUpcomingCalls />
      </div>
    </div>
  );
};

export default DashboardOverview;
