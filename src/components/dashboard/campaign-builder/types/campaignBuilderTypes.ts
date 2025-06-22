
import { LanguageConfig } from "../../outreach/types";

export interface CampaignBuilderData {
  agentProfile?: {
    name: string;
    role: string;
    businessContext: string;
    personality: string;
  };
  targetAudience?: {
    industry: string[];
    companySize: string[];
    jobTitles: string[];
    location: string[];
    customCriteria?: string;
  };
  script?: {
    greeting: string;
    mainPitch: string;
    objectionHandling: string[];
    closingStatement: string;
    language?: string;
    tone?: string;
  };
  voiceSettings?: {
    voiceId: string;
    speakingSpeed: number;
    enthusiasm: number;
    primaryLanguage: string;
    additionalLanguages: string[];
    languageConfig?: LanguageConfig;
  };
  leadManagement?: {
    leadList: any[];
    leadSources: string[];
    importMethod: string;
  };
  callScheduling?: {
    calendarIntegration?: {
      provider: string;
      connected: boolean;
      syncEnabled: boolean;
    };
    operatingHours: any;
    timezone: string;
    bufferTime: number;
    retryDelay: number;
    weekendCalling: boolean;
  };
  testValidation?: {
    testCallsCompleted: boolean;
    validationPassed: boolean;
    testResults?: any[];
  };
  campaign?: {
    isLive?: boolean;
    campaignStarted?: boolean;
    launchedAt?: string | null;
  };
}
