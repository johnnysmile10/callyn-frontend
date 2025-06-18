
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
    name: "My Agent",
    icon: User,
    id: "my-agent",
    unlockConditions: [
      { type: 'agent', description: 'Create your AI agent first' }
    ]
  },
  {
    name: "AI Campaign Builder",
    icon: Rocket,
    id: "ai-campaign-builder",
    unlockConditions: [
      { type: 'config_level', requirement: 'basic', description: 'Complete basic agent setup' }
    ]
  }
];

export const getCampaignManagerItems = (): MenuItem[] => [
  {
    name: "Campaign Manager",
    icon: Target,
    id: "campaigns",
    unlockConditions: [
      { type: 'config_level', requirement: 'basic', description: 'Complete basic agent setup' },
      { type: 'leads', description: 'Import leads to your database' }
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
      { type: 'config_level', requirement: 'complete', description: 'Complete full agent configuration' },
      { type: 'voice', description: 'Configure voice settings' }
    ]
  },
  {
    name: "Call Analytics",
    icon: BarChart,
    id: "call-analytics",
    unlockConditions: [
      { type: 'campaigns', description: 'Create your first campaign' }
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
  }
];
