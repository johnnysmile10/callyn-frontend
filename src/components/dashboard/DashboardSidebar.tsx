
import { useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent,
  SidebarRail
} from "@/components/ui/sidebar";
import { useAuth } from "@/context";
import SidebarUserHeader from "./sidebar/SidebarUserHeader";
import SidebarMenuSection from "./sidebar/SidebarMenuSection";
import SidebarLogoutFooter from "./sidebar/SidebarLogoutFooter";
import { 
  getMainMenuItems, 
  getAgentBuilderItems, 
  getCampaignManagerItems,
  getCallCenterItems,
  getGatewaySetupItems,
  getSettingsItems 
} from "./sidebar/menuItems";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, setActiveTab }: DashboardSidebarProps) => {
  const { user, logout, userAgent, progressState } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const mainMenuItems = getMainMenuItems();
  const agentBuilderItems = getAgentBuilderItems();
  const campaignManagerItems = getCampaignManagerItems();
  const callCenterItems = getCallCenterItems();
  const gatewaySetupItems = getGatewaySetupItems();
  const settingsItems = getSettingsItems();
  
  return (
    <Sidebar>
      <SidebarRail />
      
      <SidebarUserHeader user={user} />
      
      <SidebarContent>
        <SidebarMenuSection
          items={mainMenuItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
          progressState={progressState}
        />

        <SidebarMenuSection
          title="Agent Builder"
          items={agentBuilderItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
          progressState={progressState}
        />

        <SidebarMenuSection
          title="Campaign Manager"
          items={campaignManagerItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
          progressState={progressState}
        />

        <SidebarMenuSection
          title="Call Center"
          items={callCenterItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
          progressState={progressState}
        />

        <SidebarMenuSection
          title="Gateway Setup"
          items={gatewaySetupItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
          progressState={progressState}
        />

        <SidebarMenuSection
          items={settingsItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
          progressState={progressState}
        />
      </SidebarContent>
      
      <SidebarLogoutFooter onLogout={handleLogout} />
    </Sidebar>
  );
};

export default DashboardSidebar;
