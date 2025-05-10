
import { Phone, User, Calendar, TrendingUp, Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import DashboardCallActivity from "./DashboardCallActivity";
import DashboardUpcomingCalls from "./DashboardUpcomingCalls";

const DashboardOverview = () => {
  const { user, onboardingData } = useAuth();
  
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
          <CardTitle>Your AI Sales Assistant is Ready</CardTitle>
          <CardDescription className="text-white text-opacity-80">
            {onboardingData?.businessName ? `Trained for ${onboardingData.businessName}` : "Start making calls with Callyn"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="secondary" size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Start New Call
            </Button>
            <span className="text-sm">First 45 minutes free. No credit card required.</span>
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
            <CardTitle className="text-sm font-medium">Upcoming Calls</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Schedule your next call
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
