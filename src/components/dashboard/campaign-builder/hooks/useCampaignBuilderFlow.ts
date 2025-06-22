
import { useAuth } from "@/context";
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

export const useCampaignBuilderFlow = () => {
  const { campaignBuilderData, setCampaignBuilderData } = useAuth();

  const updateCampaignData = (updates: Partial<CampaignBuilderData>) => {
    const newData = { ...campaignBuilderData, ...updates };
    setCampaignBuilderData(newData);
  };

  const canProceedFromStep = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return !!(campaignBuilderData?.agentProfile?.name && 
                 campaignBuilderData?.agentProfile?.role);
      case 2:
        return !!(campaignBuilderData?.targetAudience?.industry?.length && 
                 campaignBuilderData?.targetAudience?.companySize?.length);
      case 3:
        return !!(campaignBuilderData?.script?.greeting && 
                 campaignBuilderData?.script?.mainPitch);
      case 4:
        // Enhanced validation for voice settings - require voice ID and primary language
        return !!(campaignBuilderData?.voiceSettings?.voiceId && 
                 campaignBuilderData?.voiceSettings?.primaryLanguage);
      case 5:
        return !!(campaignBuilderData?.leadManagement?.leadList?.length);
      case 6:
        return !!(campaignBuilderData?.callScheduling?.calendarIntegration?.connected);
      case 7:
        return !!(campaignBuilderData?.testValidation?.validationPassed);
      case 8:
        return true;
      default:
        return false;
    }
  };

  const getCurrentStepData = (currentStep: number): any => {
    switch (currentStep) {
      case 1:
        return campaignBuilderData?.agentProfile || {
          name: '',
          role: '',
          businessContext: '',
          personality: 'professional'
        };
      case 2:
        return campaignBuilderData?.targetAudience || {
          industry: [],
          companySize: [],
          jobTitles: [],
          location: []
        };
      case 3:
        return campaignBuilderData?.script || {
          greeting: '',
          mainPitch: '',
          objectionHandling: [],
          closingStatement: ''
        };
      case 4:
        return campaignBuilderData?.voiceSettings || {
          voiceId: '9BWtsMINqrJLrRacOk9x',
          speakingSpeed: 1.0,
          enthusiasm: 5,
          primaryLanguage: 'en',
          additionalLanguages: [],
          languageConfig: {
            primaryLanguage: 'en',
            secondaryLanguages: [],
            voiceId: '9BWtsMINqrJLrRacOk9x',
            model: 'eleven_multilingual_v2',
            tone: 'professional',
            formality: 'balanced',
            culturalAdaptation: false,
            localExpressions: false
          }
        };
      case 5:
        return campaignBuilderData?.leadManagement || {
          leadList: [],
          leadSources: [],
          importMethod: ''
        };
      case 6:
        return campaignBuilderData?.callScheduling || {
          calendarIntegration: {
            provider: "",
            connected: false,
            syncEnabled: false
          },
          operatingHours: {
            monday: { enabled: true, start: '09:00', end: '17:00' },
            tuesday: { enabled: true, start: '09:00', end: '17:00' },
            wednesday: { enabled: true, start: '09:00', end: '17:00' },
            thursday: { enabled: true, start: '09:00', end: '17:00' },
            friday: { enabled: true, start: '09:00', end: '17:00' },
            saturday: { enabled: false, start: '09:00', end: '17:00' },
            sunday: { enabled: false, start: '09:00', end: '17:00' }
          },
          timezone: 'America/New_York',
          bufferTime: 15,
          retryDelay: 24,
          weekendCalling: false
        };
      case 7:
        return campaignBuilderData?.testValidation || {
          testCallsCompleted: false,
          validationPassed: false,
          testResults: []
        };
      case 8:
        return campaignBuilderData?.campaign || {
          isLive: false,
          campaignStarted: false,
          launchedAt: null
        };
      default:
        return {};
    }
  };

  const handleStepDataUpdate = (currentStep: number, data: any) => {
    switch (currentStep) {
      case 1:
        updateCampaignData({ agentProfile: data });
        break;
      case 2:
        updateCampaignData({ targetAudience: data });
        break;
      case 3:
        updateCampaignData({ script: data });
        break;
      case 4:
        updateCampaignData({ voiceSettings: data });
        break;
      case 5:
        updateCampaignData({ leadManagement: data });
        break;
      case 6:
        updateCampaignData({ callScheduling: data });
        break;
      case 7:
        updateCampaignData({ testValidation: data });
        break;
      case 8:
        updateCampaignData({ campaign: data });
        break;
    }
  };

  return {
    campaignData: campaignBuilderData,
    updateCampaignData,
    canProceedFromStep,
    getCurrentStepData,
    handleStepDataUpdate
  };
};
