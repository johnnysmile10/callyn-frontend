
import { useAuth } from "@/context/AuthContext";
import { OutreachData, TargetAudience, LeadRecord } from "../types";

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
        return !!(outreachData?.script?.greeting);
      case 4:
        return !!(outreachData?.scheduling?.timezone);
      case 5:
        return !!(outreachData?.testResults?.callCount);
      case 6:
        return true;
      default:
        return false;
    }
  };

  const getCurrentStepData = (currentStep: number) => {
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
