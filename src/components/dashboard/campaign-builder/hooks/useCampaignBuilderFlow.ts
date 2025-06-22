
import { useAuth } from "@/context";
import { CampaignBuilderData } from "../types/campaignBuilderTypes";
import { canProceedFromStep } from "../utils/validationUtils";
import { getCurrentStepData, getStepDataUpdater } from "../utils/stepDataUtils";

export const useCampaignBuilderFlow = () => {
  const { campaignBuilderData, setCampaignBuilderData } = useAuth();

  const updateCampaignData = (updates: Partial<CampaignBuilderData>) => {
    const newData = { ...campaignBuilderData, ...updates };
    setCampaignBuilderData(newData);
  };

  const handleStepDataUpdate = (currentStep: number, data: any) => {
    const updater = getStepDataUpdater(currentStep, updateCampaignData);
    updater(data);
  };

  return {
    campaignData: campaignBuilderData,
    updateCampaignData,
    canProceedFromStep: (stepId: number) => canProceedFromStep(stepId, campaignBuilderData),
    getCurrentStepData: (currentStep: number) => getCurrentStepData(currentStep, campaignBuilderData),
    handleStepDataUpdate
  };
};

export type { CampaignBuilderData };
