
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
import UserDatabaseSection from "@/components/dashboard/settings/UserDatabaseSection";
import CallCenterDashboard from "@/components/dashboard/callcenter/CallCenterDashboard";
import EliteCallInterface from "@/components/dashboard/callcenter/EliteCallInterface";
import PersonalAgentManager from "@/components/dashboard/PersonalAgentManager";
import LiveCallCenter from "@/components/dashboard/callcenter/LiveCallCenter";
import DashboardPricingTable from "@/components/dashboard/DashboardPricingTable";
import { useAuth } from "@/context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, CheckCircle } from "lucide-react";
import CallynOutreachSystem from "@/components/dashboard/CallynOutreachSystem";
import AICampaignBuilder from "@/components/dashboard/AICampaignBuilder";
import { initializeDemoData } from "@/utils/demoDataUtils";

const Dashboard = () => {
  const { isAuthenticated, userAgent, hasCompletedSetup, onboardingData, outreachData, updateProgressState, setOutreachData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Check if there's a specific tab requested via navigation state
    const requestedTab = location.state?.activeTab;
    if (requestedTab) {
      return requestedTab;
    }
    
    // If user has no agent, always start with your-agent which includes quick-start
    if (!userAgent) {
      return "your-agent";
    }
    
    // If user has an agent, default to overview
    return "overview";
  });
  const [campaignActive, setCampaignActive] = useState(false);
  const [showOnboardingSuccess, setShowOnboardingSuccess] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Check if user just completed onboarding
    if (location.state?.fromOnboarding && userAgent) {
      setShowOnboardingSuccess(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setShowOnboardingSuccess(false), 5000);
    }

    // Update active tab based on agent status if needed
    if (!userAgent && activeTab === "overview") {
      setActiveTab("agent-setup");
    }

    // Handle navigation state for tab switching
    if (location.state?.activeTab && location.state.activeTab !== activeTab) {
      setActiveTab(location.state.activeTab);
    }

    // Initialize demo data if user has an agent but no outreach data (for testing unlock system)
    if (userAgent && !outreachData) {
      console.log('Initializing demo data for unlock system testing');
      initializeDemoData(updateProgressState, setOutreachData);
    }
  }, [isAuthenticated, userAgent, navigate, activeTab, location.state, outreachData, updateProgressState, setOutreachData]);

  if (!isAuthenticated) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview onCampaignToggle={setCampaignActive} campaignActive={campaignActive} />;
      
      case "call-log":
        return <CallLogView />;
      
      // My Agent section
      case "my-agent":
        return <PersonalAgentManager />;
      
      // Your Agent section
      case "your-agent":
        return <YourAgentSection />;
      
      // User Database section
      case "user-database":
        return <UserDatabaseSection />;
      
      // Settings & Integrations section
      case "settings-integrations":
        return <SettingsIntegrationsSection />;
      
      // Price Plan section
      case "price-plan":
        return <DashboardPricingTable />;
      
      // AI Campaign Builder
      case "ai-campaign-builder":
        return <AICampaignBuilder />;
      
      // Live Call Center
      case "live-call-center":
        return <LiveCallCenter />;
      
      // Call Analytics (new)
      case "call-analytics":
        return <CallLogView />;
      
      // Campaign Manager - Updated to handle all campaign-related functionality
      case "campaigns":
      case "lead-lists":
      case "analytics":
        return <DashboardCampaignManager />;
      
      // Legacy routes (redirect to new components)
      case "agent-setup":
      case "outreach-system":
      case "actions":
        return <AICampaignBuilder />;
      
      case "call-center":
      case "elite-call-interface":
        return <LiveCallCenter />;
      
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
            {/* Onboarding Success Banner */}
            {showOnboardingSuccess && userAgent && (
              <div className="mb-6">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">🎉 Agent Successfully Created!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your AI agent "{userAgent.name}" is now live and ready to start making calls. 
                    Set up your first campaign below to begin generating leads.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Welcome Banner for New Users - Updated */}
            {!userAgent && (
              <div className="mb-8">
                <Alert className="bg-blue-50 border-blue-200">
                  <Rocket className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Welcome to Callyn!</AlertTitle>
                  <AlertDescription className="text-blue-700 flex items-center justify-between">
                    <span>Create your first AI calling agent in just 6 minutes with our Quick Start wizard.</span>
                    <Button 
                      onClick={() => setActiveTab('your-agent')} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white ml-4"
                    >
                      Get Started
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
