import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AgentConfigurationDashboard from "@/components/dashboard/AgentConfigurationDashboard";
import DashboardActions from "@/components/dashboard/DashboardActions";
import DashboardCampaignManager from "@/components/dashboard/DashboardCampaignManager";
import CallControlBar from "@/components/dashboard/CallControlBar";
import CallLogView from "@/components/dashboard/CallLogView";
import YourAgentSection from "@/components/dashboard/agent/YourAgentSection";
import SettingsIntegrationsSection from "@/components/dashboard/settings/SettingsIntegrationsSection";
import CallCenterDashboard from "@/components/dashboard/callcenter/CallCenterDashboard";
import EliteCallInterface from "@/components/dashboard/callcenter/EliteCallInterface";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight } from "lucide-react";
import CallynOutreachSystem from "@/components/dashboard/CallynOutreachSystem";

const Dashboard = () => {
  const { isAuthenticated, userAgent, hasCompletedSetup, onboardingData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Check if there's a specific tab requested via navigation state
    const requestedTab = location.state?.activeTab;
    if (requestedTab) {
      return requestedTab;
    }
    
    // If user has completed onboarding but no agent exists, show your-agent
    // If user has an agent, default to your-agent instead of overview
    if (onboardingData || userAgent) {
      return "your-agent";
    }
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

    // Handle navigation state for tab switching
    if (location.state?.activeTab && location.state.activeTab !== activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [isAuthenticated, userAgent, navigate, activeTab, location.state]);

  if (!isAuthenticated) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview onCampaignToggle={setCampaignActive} campaignActive={campaignActive} />;
      
      case "call-log":
        return <CallLogView />;
      
      // Your Agent section
      case "your-agent":
        return <YourAgentSection />;
      
      // Settings & Integrations section
      case "settings-integrations":
        return <SettingsIntegrationsSection />;
      
      // Agent Configuration (replaces agent-setup)
      case "agent-setup":
        return <AgentConfigurationDashboard />;
      
      // Outreach System (replaces actions)
      case "outreach-system":
        return <CallynOutreachSystem />;
      
      // Elite Call Interface
      case "elite-call-interface":
        return <EliteCallInterface />;
      
      // Call Center Dashboard
      case "call-center":
        return <CallCenterDashboard />;
      
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
