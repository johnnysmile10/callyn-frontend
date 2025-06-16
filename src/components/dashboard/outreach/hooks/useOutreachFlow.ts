
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
        return !!(outreachData?.targetAudience?.industry?.length && 
                 outreachData?.targetAudience?.companySize?.length);
      case 2:
        return !!(outreachData?.leadList?.length && outreachData.leadList.length > 0);
      case 3:
        return !!(outreachData?.script?.greeting && outreachData?.script?.mainPitch);
      case 4:
        return !!(outreachData?.scheduling?.timezone);
      case 5:
        return true;
      default:
        return false;
    }
  };

  const getCurrentStepData = (currentStep: number): TargetAudience | LeadRecord[] | ScriptConfig => {
    switch (currentStep) {
      case 1:
        return outreachData?.targetAudience || {
          industry: [],
          companySize: [],
          jobTitles: [],
          location: []
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
      default:
        // Return a default TargetAudience for other steps
        return {
          industry: [],
          companySize: [],
          jobTitles: [],
          location: []
        };
    }
  };

  const handleStepDataUpdate = (currentStep: number, data: TargetAudience | LeadRecord[] | ScriptConfig) => {
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
