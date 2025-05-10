
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardSalesTools from "@/components/dashboard/DashboardSalesTools";
import DashboardAgentSettings from "@/components/dashboard/DashboardAgentSettings";
import DashboardInsights from "@/components/dashboard/DashboardInsights";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");
  
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
        return <DashboardOverview />;
      case "sales-tools":
        return <DashboardSalesTools />;
      case "agent-settings":
        return <DashboardAgentSettings />;
      case "insights":
        return <DashboardInsights />;
      default:
        return <DashboardOverview />;
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
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
