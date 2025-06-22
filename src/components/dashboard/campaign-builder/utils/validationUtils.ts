
import { CampaignBuilderData } from "../types/campaignBuilderTypes";

export const canProceedFromStep = (stepId: number, campaignBuilderData?: CampaignBuilderData): boolean => {
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
      // Fixed validation to check for leadList array length
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
