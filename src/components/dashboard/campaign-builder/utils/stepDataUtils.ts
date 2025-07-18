
import { CampaignBuilderData } from "../types/campaignBuilderTypes";

export const getCurrentStepData = (currentStep: number, campaignBuilderData?: CampaignBuilderData): any => {
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
      // Fixed to return proper structure for leadManagement
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

export const getStepDataUpdater = (
  currentStep: number, 
  updateCampaignData: (updates: Partial<CampaignBuilderData>) => void
) => {
  return (data: any) => {
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
};
