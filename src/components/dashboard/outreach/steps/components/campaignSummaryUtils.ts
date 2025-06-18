
import { OutreachData } from "../../types";
import { renderTargetAudience } from "./targetAudienceUtils";

export const createCampaignSummary = (outreachData: OutreachData | null) => {
  return {
    targetAudience: renderTargetAudience(outreachData?.targetAudience),
    leadCount: outreachData?.leadList?.length || 150,
    scriptType: outreachData?.script?.tone || "conversational",
    language: outreachData?.script?.language || "English",
    callScheduling: {
      timezone: outreachData?.scheduling?.timezone || "EST",
      hours: "9 AM - 5 PM", // Default hours since operatingHours is complex object
      daysPerWeek: "Monday - Friday"
    }
  };
};
