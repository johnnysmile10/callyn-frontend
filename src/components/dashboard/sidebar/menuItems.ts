
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
  Rocket
} from "lucide-react";

export interface MenuItem {
  name: string;
  icon: any;
  id: string;
}

export const getMainMenuItems = (): MenuItem[] => [
  {
    name: "Overview",
    icon: LayoutDashboard,
    id: "overview",
  }
];

export const getAgentBuilderItems = (userAgent: any, onboardingData: any): MenuItem[] => [
  // Add "My Agent" as the first item for users with agents or onboarding data
  ...(userAgent || onboardingData ? [{
    name: "My Agent",
    icon: User,
    id: "my-agent",
  }] : []),
  // Show "Your Agent" if user has completed onboarding or has an agent
  ...(userAgent || onboardingData ? [{
    name: "Your Agent",
    icon: Eye,
    id: "your-agent",
  }] : []),
  {
    name: "AI Campaign Builder",
    icon: Rocket,
    id: "ai-campaign-builder",
  },
  {
    name: "Live Call Center",
    icon: Phone,
    id: "live-call-center",
  }
];

export const getCampaignManagerItems = (): MenuItem[] => [
  {
    name: "Campaign Manager",
    icon: Target,
    id: "campaigns",
  },
  {
    name: "Call Log",
    icon: PhoneCall,
    id: "call-log",
  }
];

export const getSettingsItems = (userAgent: any, onboardingData: any): MenuItem[] => [
  // Only show Settings & Integrations if user has agent or onboarding data
  ...(userAgent || onboardingData ? [{
    name: "Settings & Integrations",
    icon: Settings,
    id: "settings-integrations",
  }] : [])
];
