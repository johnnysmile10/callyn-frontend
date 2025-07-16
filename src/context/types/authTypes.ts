
import { ScenarioProps } from '@/components/onboarding/types';
import { OutreachData, LanguageConfig } from '@/components/dashboard/outreach/types';

export interface User {
  id?: string;
  email: string;
  name?: string;
  photoURL?: string;
}

export interface OnboardingData {
  // Step 1 data
  selectedRole?: string;
  timeframe?: string;

  // Step 2 data  
  businessName?: string;
  industry?: string;
  targetAudience?: string;
  mainGoal?: string;

  // Step 3 data
  scriptMethod?: string;
  websiteUrl?: string;
  uploadedFile?: File | null;
  customScript?: string;

  // Step 4 data
  selectedVoice?: string;
  personality?: string;
  speakingSpeed?: number;
  enthusiasm?: number;
  useSmallTalk?: boolean;
  handleObjections?: boolean;

  // Language configuration
  languageConfig?: LanguageConfig;

  // Legacy data for backward compatibility
  selectedScenario?: ScenarioProps | null;
  trainingMethod?: string | null;
  voicePreview?: {
    greeting: string;
    message: string;
  };
}

export interface UserAgent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'training';
  createdAt: string;
  other: {
    userId: string;
    assistantId: string;
  }
  configuration: {
    voice: string;
    model: string;
    personality: string;
    script: string;
    instructions: string;
    speakingSpeed: number;
    enthusiasm: number;
    useSmallTalk: boolean;
    handleObjections: boolean;
    formality: string;
    scriptMethod: string;
    websiteUrl: string | null;
    uploadedFile: string | null;
    businessInfo: {
      name: string;
      industry: string;
      targetAudience: string;
      mainGoal: string;
    };
  };
}

export interface ProgressState {
  hasLeads: boolean;
  hasVoiceIntegration: boolean;
  hasCampaigns: boolean;
  agentConfigurationLevel: 'none' | 'basic' | 'complete';
}

export interface AuthContextType {
  user: User | null;
  onboardingData: OnboardingData | null;
  userAgent: UserAgent | null;
  outreachData: OutreachData | null;
  campaignBuilderData: any;
  setupCompleted: boolean;
  progressState: ProgressState;
  login: (email: string, password: string) => Promise<void>;
  loginByToken: (token: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setOnboardingData: (data: OnboardingData) => void;
  setUserAgent: (agent: UserAgent) => void;
  setOutreachData: (data: OutreachData) => void;
  setCampaignBuilderData: (data: any) => void;
  updateProgressState: (updates: Partial<ProgressState>) => void;
  createUserAgent: (onboardingData: OnboardingData) => Promise<UserAgent>;
  hasCompletedSetup: () => boolean;
  markSetupCompleted: () => void;
}
