import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardAgentBuilder from "@/components/dashboard/DashboardAgentBuilder";
import DashboardActions from "@/components/dashboard/DashboardActions";
import DashboardCampaignManager from "@/components/dashboard/DashboardCampaignManager";
import CallControlBar from "@/components/dashboard/CallControlBar";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight } from "lucide-react";
import CallynOutreachSystem from "@/components/dashboard/CallynOutreachSystem";

const Dashboard = () => {
  const { isAuthenticated, userAgent, hasCompletedSetup } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Default to agent-setup if no agent exists, otherwise overview
    return userAgent ? "overview" : "agent-setup";
  });
  const [campaignActive, setCampaignActive] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Update active tab based on agent status if needed
    if (!userAgent && activeTab === "overview") {
      setActiveTab("agent-setup");
    }
  }, [isAuthenticated, userAgent, navigate, activeTab]);

  if (!isAuthenticated) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview onCampaignToggle={setCampaignActive} campaignActive={campaignActive} />;
      
      // Agent Builder sections
      case "agent-setup":
        return <DashboardAgentBuilder />;
      
      // Outreach System (replaces actions)
      case "outreach-system":
        return <CallynOutreachSystem />;
      
      // Campaign Manager sections  
      case "lead-lists":
      case "campaigns":
      case "analytics":
        return <DashboardCampaignManager />;
      
      // Legacy actions route (now redirects to outreach-system)
      case "actions":
        return <CallynOutreachSystem />;
      
      default:
        return <DashboardOverview onCampaignToggle={setCampaignActive} campaignActive={campaignActive} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-8 px-4">
            {/* Welcome Banner for New Users */}
            {!userAgent && !hasCompletedSetup() && (
              <div className="mb-8">
                <Alert className="bg-blue-50 border-blue-200">
                  <Rocket className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Welcome to Callyn!</AlertTitle>
                  <AlertDescription className="text-blue-700 flex items-center justify-between">
                    <span>Complete your setup to create your first AI calling agent.</span>
                    <Button 
                      onClick={() => navigate('/onboarding')} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white ml-4"
                    >
                      Complete Setup
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {renderActiveTab()}
          </div>
        </div>
        <CallControlBar isActive={campaignActive} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
