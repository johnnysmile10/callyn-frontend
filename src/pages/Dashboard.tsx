
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

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [campaignActive, setCampaignActive] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview onCampaignToggle={setCampaignActive} campaignActive={campaignActive} />;
      
      // Agent Builder sections
      case "agent-setup":
      case "agent-settings":
      case "test-preview":
        return <DashboardAgentBuilder />;
      
      // Campaign Manager sections  
      case "lead-lists":
      case "campaigns":
      case "analytics":
        return <DashboardCampaignManager />;
      
      // Legacy actions route (now part of Agent Builder)
      case "actions":
        return <DashboardActions />;
      
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
            {renderActiveTab()}
          </div>
        </div>
        <CallControlBar isActive={campaignActive} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
