
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
  const campaignManagerItems = getCampaignManagerItems();
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
        />

        <SidebarMenuSection
          title="Agent Builder"
          items={agentBuilderItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <SidebarMenuSection
          title="Campaign Manager"
          items={campaignManagerItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <SidebarMenuSection
          items={settingsItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </SidebarContent>
      
      <SidebarLogoutFooter onLogout={handleLogout} />
    </Sidebar>
  );
};

export default DashboardSidebar;
