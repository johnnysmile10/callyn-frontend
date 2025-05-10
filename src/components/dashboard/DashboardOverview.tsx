
import { Phone, User, Calendar, TrendingUp, Play, Pause, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardCallActivity from "./DashboardCallActivity";
import DashboardUpcomingCalls from "./DashboardUpcomingCalls";

const DashboardOverview = () => {
  const { user, onboardingData } = useAuth();
  const [campaignActive, setCampaignActive] = useState(false);
  
  const toggleCampaign = () => {
    setCampaignActive(!campaignActive);
  };

  // In a real app, these would come from an API
  const minutesUsed = 15;
  const totalMinutes = 45;
  const minutesPercentage = (minutesUsed / totalMinutes) * 100;
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}! 
          Here's what's happening with your Callyn AI sales assistant.
        </p>
      </div>
      
      {/* Quick action panel */}
      <Card className="bg-gradient-to-r from-callyn-darkBlue to-callyn-blue text-white">
        <CardHeader className="pb-2">
          <CardTitle>Your AI Sales Assistant is {campaignActive ? "Active" : "Ready"}</CardTitle>
          <CardDescription className="text-white text-opacity-80">
            {campaignActive 
              ? "Callyn is currently making calls on your behalf" 
              : onboardingData?.businessName 
                ? `Trained for ${onboardingData.businessName}` 
                : "Start making calls with Callyn"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              variant={campaignActive ? "destructive" : "secondary"} 
              size="lg" 
              className="gap-2"
              onClick={toggleCampaign}
            >
              {campaignActive ? (
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
            {!campaignActive && (
              <span className="text-sm">First 45 minutes free. No credit card required.</span>
            )}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Start making calls to see metrics
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">
              Track your performance over time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Connect with potential customers
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0h</div>
            <p className="text-xs text-muted-foreground">
              Let Callyn work for you
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity and upcoming calls */}
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCallActivity />
        <DashboardUpcomingCalls />
      </div>
    </div>
  );
};

export default DashboardOverview;
