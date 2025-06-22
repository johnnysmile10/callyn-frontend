
import { useAuth } from "@/context";
import { OutreachData, TargetAudience, LeadRecord, ScriptConfig } from "../types";

export const useOutreachFlow = () => {
  const { outreachData, setOutreachData } = useAuth();

  const updateOutreachData = (updates: Partial<OutreachData>) => {
    const newData = { ...outreachData, ...updates };
    setOutreachData(newData);
  };

  const canProceedFromStep = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return !!(outreachData?.targetAudience?.description && 
                 outreachData.targetAudience.description.trim().length > 0);
      case 2:
        return !!(outreachData?.leadList?.length && outreachData.leadList.length > 0);
      case 3:
        return !!(outreachData?.script?.greeting && outreachData?.script?.mainPitch);
      case 4:
        return !!(outreachData?.scheduling?.calendarIntegration?.connected && 
                 outreachData?.scheduling?.timezone);
      case 5:
        return true;
      default:
        return false;
    }
  };

  const getCurrentStepData = (currentStep: number): any => {
    switch (currentStep) {
      case 1:
        return outreachData?.targetAudience || {
          description: ''
        };
      case 2:
        return outreachData?.leadList || [];
      case 3:
        return outreachData?.script || {
          greeting: '',
          mainPitch: '',
          objectionHandling: [],
          closingStatement: ''
        };
      case 4:
        return outreachData?.scheduling || {
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
      case 5:
        return outreachData?.campaign || {
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
        updateOutreachData({ targetAudience: data as TargetAudience });
        break;
      case 2:
        updateOutreachData({ leadList: data as LeadRecord[] });
        break;
      case 3:
        updateOutreachData({ script: data as ScriptConfig });
        break;
      case 4:
        updateOutreachData({ scheduling: data });
        break;
      case 5:
        updateOutreachData({ campaign: data });
        break;
    }
  };

  return {
    outreachData,
    updateOutreachData,
    canProceedFromStep,
    getCurrentStepData,
    handleStepDataUpdate
  };
};
