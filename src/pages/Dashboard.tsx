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
import { OnboardingData, useAuth } from "@/context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";
import CallynOutreachSystem from "@/components/dashboard/CallynOutreachSystem";
import AICampaignBuilder from "@/components/dashboard/AICampaignBuilder";
import { initializeDemoData } from "@/utils/demoDataUtils";
import { recoverUserState, shouldHaveAccess } from "@/components/dashboard/sidebar/unlockConditions";
import { toast } from "@/hooks/use-toast";
import ApiService from "@/context/services/apiService";
import { mapApiAgentToOnboardingData, mapApiAgentToUserAgent } from "@/utils/agent";
import { ApiAgent } from "@/context/types/apiTypes";

const Dashboard = () => {
  const { user, setUserAgent, userAgent, setupCompleted, setOnboardingData, outreachData, updateProgressState, setOutreachData, progressState } = useAuth();
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
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);

  // Enhanced state checking
  useEffect(() => {
    // Initialize dashboard once
    if (!isInitialized) {
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
        initializeDemoData(updateProgressState, setOutreachData);
      }

      if (!userAgent && (!!userAgent || setupCompleted)) {
        setShowRecoveryBanner(true);
      }

      setIsInitialized(true);
    }
  }, [userAgent, navigate, activeTab, location.state, outreachData, updateProgressState, setOutreachData, isInitialized, progressState]);

  // Force dashboard refresh when userAgent changes (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      setDashboardKey(prev => prev + 1);

      // Hide recovery banner if agent is now available
      if (userAgent) {
        setShowRecoveryBanner(false);
      }
    }
  }, [userAgent, isInitialized]);

  useEffect(() => {
    if (!user) return
    (async () => {
      try {
        const { assistant } = await ApiService.get('/assistant');
        setUserAgent(mapApiAgentToUserAgent(assistant as ApiAgent))
        setOnboardingData(mapApiAgentToOnboardingData(assistant as ApiAgent))
      } catch (err) {
        toast({
          title: "Error",
          description: err.response.data,
        });
      }
    })()
  }, [user])

  const handleRecoverState = async () => {
    const recovered = recoverUserState(updateProgressState);

    if (recovered) {
      setDashboardKey(prev => prev + 1);
      setShowRecoveryBanner(false);
      toast({
        title: "State Recovered Successfully",
        description: "Your agent has been restored and features should now be unlocked.",
      });
    } else {
      toast({
        title: "No Recoverable State Found",
        description: "Please create a new agent to access dashboard features.",
        variant: "destructive"
      });
    }
  };

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
            {/* Enhanced Onboarding Success Banner */}
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

            {/* State Recovery Banner */}
            {showRecoveryBanner && (
              <div className="mb-6">
                <Alert className="bg-yellow-50 border-yellow-200">
                  <RefreshCw className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">State Recovery Available</AlertTitle>
                  <AlertDescription className="text-yellow-700 flex items-center justify-between">
                    <span>
                      We detected you may have previously created an agent. Would you like to restore your settings?
                    </span>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        onClick={handleRecoverState}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        Recover Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowRecoveryBanner(false)}
                      >
                        Dismiss
                      </Button>
                    </div>
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
