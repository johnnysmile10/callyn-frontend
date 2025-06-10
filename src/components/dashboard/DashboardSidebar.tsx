
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Bot, 
  Target, 
  LogOut,
  BarChart,
  Users,
  Calendar,
  Eye,
  PhoneCall,
  Settings
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

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
  
  const mainMenuItems = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      id: "overview",
    }
  ];

  const agentBuilderItems = [
    // Show "Your Agent" if user has completed onboarding or has an agent
    ...(userAgent || onboardingData ? [{
      name: "Your Agent",
      icon: Eye,
      id: "your-agent",
    }] : []),
    {
      name: userAgent ? "Agent Configuration" : "Create Agent",
      icon: userAgent ? Settings : Bot,
      id: "agent-setup",
    },
    {
      name: "Outreach System",
      icon: Target,
      id: "outreach-system",
    }
  ];

  const campaignManagerItems = [
    {
      name: "Lead Lists",
      icon: Users,
      id: "lead-lists",
    },
    {
      name: "Call Log",
      icon: PhoneCall,
      id: "call-log",
    },
    {
      name: "Campaigns",
      icon: Calendar,
      id: "campaigns",
    },
    {
      name: "Call Analytics",
      icon: BarChart,
      id: "analytics",
    }
  ];

  const settingsItems = [
    // Only show Settings & Integrations if user has agent or onboarding data
    ...(userAgent || onboardingData ? [{
      name: "Settings & Integrations",
      icon: Settings,
      id: "settings-integrations",
    }] : [])
  ];
  
  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.photoURL || ""} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">
              {user?.name || "User"}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.name}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Agent Builder</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {agentBuilderItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.name}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Campaign Manager</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {campaignManagerItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.name}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section at the bottom */}
        {settingsItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      onClick={() => setActiveTab(item.id)}
                      isActive={activeTab === item.id}
                      tooltip={item.name}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
