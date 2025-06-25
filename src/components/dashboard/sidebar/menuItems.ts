
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
  HeadphonesIcon,
  CreditCard,
  Network
} from "lucide-react";
import { UnlockCondition } from './unlockConditions';

export interface MenuItem {
  name: string;
  icon: any;
  id: string;
  unlockConditions?: UnlockCondition[];
}

export const getMainMenuItems = (): MenuItem[] => [
  {
    name: "Overview",
    icon: LayoutDashboard,
    id: "overview",
    unlockConditions: []
  }
];

export const getAgentBuilderItems = (): MenuItem[] => [
  {
    name: "Your Agent",
    icon: Eye,
    id: "your-agent",
    unlockConditions: []
  },
  {
    name: "AI Campaign Builder",
    icon: Rocket,
    id: "ai-campaign-builder",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  }
];

export const getCampaignManagerItems = (): MenuItem[] => [
  {
    name: "Campaign Manager",
    icon: Target,
    id: "campaigns",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  },
  {
    name: "Call Log",
    icon: PhoneCall,
    id: "call-log",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  }
];

export const getCallCenterItems = (): MenuItem[] => [
  {
    name: "Live Call Center",
    icon: Phone,
    id: "live-call-center",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  },
  {
    name: "Call Analytics",
    icon: BarChart,
    id: "call-analytics",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  }
];

export const getGatewaySetupItems = (): MenuItem[] => [
  {
    name: "Gateway Setup",
    icon: Network,
    id: "gateway-setup",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  }
];

export const getSettingsItems = (): MenuItem[] => [
  {
    name: "User Database",
    icon: Database,
    id: "user-database",
    unlockConditions: []
  },
  {
    name: "Settings & Integrations",
    icon: Settings,
    id: "settings-integrations",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  },
  {
    name: "Price Plan",
    icon: CreditCard,
    id: "price-plan",
    unlockConditions: []
  }
];
