
import { 
  LayoutDashboard, 
  Bot, 
  Target, 
  BarChart,
  Users,
  Calendar,
  Eye,
  PhoneCall,
  Settings,
  Phone,
  User,
  Rocket,
  Database,
  HeadphonesIcon
} from "lucide-react";

export interface MenuItem {
  name: string;
  icon: any;
  id: string;
  requiresAgent?: boolean;
}

export const getMainMenuItems = (): MenuItem[] => [
  {
    name: "Overview",
    icon: LayoutDashboard,
    id: "overview",
  }
];

export const getAgentBuilderItems = (userAgent: any, onboardingData: any): MenuItem[] => [
  {
    name: "Your Agent",
    icon: Eye,
    id: "your-agent",
  },
  {
    name: "My Agent",
    icon: User,
    id: "my-agent",
    requiresAgent: true,
  },
  {
    name: "AI Campaign Builder",
    icon: Rocket,
    id: "ai-campaign-builder",
    requiresAgent: true,
  }
];

export const getCampaignManagerItems = (userAgent: any): MenuItem[] => [
  {
    name: "Campaign Manager",
    icon: Target,
    id: "campaigns",
    requiresAgent: true,
  },
  {
    name: "Call Log",
    icon: PhoneCall,
    id: "call-log",
    requiresAgent: true,
  }
];

export const getCallCenterItems = (userAgent: any): MenuItem[] => [
  {
    name: "Live Call Center",
    icon: Phone,
    id: "live-call-center",
    requiresAgent: true,
  },
  {
    name: "Call Analytics",
    icon: BarChart,
    id: "call-analytics",
    requiresAgent: true,
  }
];

export const getSettingsItems = (userAgent: any, onboardingData: any): MenuItem[] => [
  {
    name: "User Database",
    icon: Database,
    id: "user-database",
  },
  {
    name: "Settings & Integrations",
    icon: Settings,
    id: "settings-integrations",
    requiresAgent: true,
  }
];
