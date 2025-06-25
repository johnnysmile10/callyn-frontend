
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
import GatewaySetupCard from "@/components/dashboard/settings/gateway-setup/GatewaySetupCard";
import EliteGatewaySetupCard from "@/components/dashboard/settings/gateway-setup/EliteGatewaySetupCard";
import CallCenterDashboard from "@/components/dashboard/callcenter/CallCenterDashboard";
import EliteCallInterface from "@/components/dashboard/callcenter/EliteCallInterface";
import PersonalAgentManager from "@/components/dashboard/PersonalAgentManager";
import LiveCallCenter from "@/components/dashboard/callcenter/LiveCallCenter";
import DashboardPricingTable from "@/components/dashboard/DashboardPricingTable";
import SupportSection from "@/components/dashboard/support/SupportSection";
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
  const [dashboardKey, setDashboardKey] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Initialize dashboard once
    if (!isInitialized) {
      console.log("Dashboard: Initializing");
      
      // Check if user just completed onboarding
      if (location.state?.fromOnboarding && userAgent) {
        setShowOnboardingSuccess(true);
        // Auto-hide after 5 seconds
        setTimeout(() => setShowOnboardingSuccess(false), 5000);
      }

      // Update active tab based on agent status if needed
      if (!userAgent && activeTab === "overview") {
        setActiveTab("your-agent");
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
      
      setIsInitialized(true);
    }
  }, [isAuthenticated, userAgent, navigate, activeTab, location.state, outreachData, updateProgressState, setOutreachData, isInitialized]);

  // Force dashboard refresh when userAgent changes (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      console.log("Dashboard: UserAgent changed, forcing refresh", {
        hasAgent: !!userAgent,
        agentId: userAgent?.id
      });
      setDashboardKey(prev => prev + 1);
    }
  }, [userAgent, isInitialized]);

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
      
      // User Database section
      case "user-database":
        return <UserDatabaseSection />;
      
      // Settings & Integrations section
      case "settings-integrations":
        return <SettingsIntegrationsSection />;
      
      // Price Plan section
      case "price-plan":
        return <DashboardPricingTable />;
      
      // Support section
      case "support":
        return <SupportSection />;
      
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
      
      // Gateway Setup - Check for Elite vs Lite
      case "gateway-setup":
        // For demo, show Elite version if user has an agent, otherwise show Lite
        return userAgent ? <EliteGatewaySetupCard /> : <GatewaySetupCard />;
      
      default:
        return <DashboardOverview onCampaignToggle={setCampaignActive} campaignActive={campaignActive} />;
    }
  };

  return (
    <SidebarProvider>
      <div key={dashboardKey} className="min-h-screen flex w-full bg-gray-50">
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
            
            {renderActiveTab()}
          </div>
        </div>
        <CallControlBar isActive={campaignActive} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
