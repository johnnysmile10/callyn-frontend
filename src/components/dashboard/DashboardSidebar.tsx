
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
  getSettingsItems 
} from "./sidebar/menuItems";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, setActiveTab }: DashboardSidebarProps) => {
  const { user, logout, userAgent, onboardingData } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const mainMenuItems = getMainMenuItems();
  const agentBuilderItems = getAgentBuilderItems(userAgent, onboardingData);
  const campaignManagerItems = getCampaignManagerItems(userAgent);
  const callCenterItems = getCallCenterItems(userAgent);
  const settingsItems = getSettingsItems(userAgent, onboardingData);
  
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
        />

        <SidebarMenuSection
          title="Agent Builder"
          items={agentBuilderItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
        />

        <SidebarMenuSection
          title="Campaign Manager"
          items={campaignManagerItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
        />

        <SidebarMenuSection
          title="Call Center"
          items={callCenterItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
        />

        <SidebarMenuSection
          items={settingsItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAgent={userAgent}
        />
      </SidebarContent>
      
      <SidebarLogoutFooter onLogout={handleLogout} />
    </Sidebar>
  );
};

export default DashboardSidebar;
