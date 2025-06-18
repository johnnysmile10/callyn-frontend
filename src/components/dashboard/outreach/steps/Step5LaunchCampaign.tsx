
import { useState } from "react";
import { useAuth } from "@/context";
import { OutreachData } from "../types";
import { renderTargetAudience } from "./components/targetAudienceUtils";
import LaunchHeader from "./components/LaunchHeader";
import ReadinessCheckList from "./components/ReadinessCheckList";
import CampaignSummary from "./components/CampaignSummary";
import LaunchSection from "./components/LaunchSection";
import { createCampaignSummary } from "./components/campaignSummaryUtils";

interface Step5LaunchCampaignProps {
  data: any;
  onUpdate: (data: any) => void;
  outreachData: OutreachData | null;
  onLaunch: () => void;
}

const Step5LaunchCampaign = ({ data, onUpdate, outreachData, onLaunch }: Step5LaunchCampaignProps) => {
  const { updateProgressState } = useAuth();
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchCampaign = async () => {
    setIsLaunching(true);
    
    // Mark campaign as created when launching
    updateProgressState({ hasCampaigns: true });
    
    // Simulate launch process
    setTimeout(() => {
      setIsLaunching(false);
      onLaunch();
    }, 2000);
  };

  const campaignSummary = createCampaignSummary(outreachData);

  const readinessChecks = [
    { 
      item: "Target Audience Defined", 
      status: !!outreachData?.targetAudience, 
      description: campaignSummary.targetAudience 
    },
    { 
      item: "Lead List Imported", 
      status: !!outreachData?.leadList && outreachData.leadList.length > 0, 
      description: `${campaignSummary.leadCount} qualified leads` 
    },
    { 
      item: "Script & Language", 
      status: !!outreachData?.script, 
      description: `${campaignSummary.scriptType} script in ${campaignSummary.language}` 
    },
    { 
      item: "Call Scheduling", 
      status: !!outreachData?.scheduling, 
      description: `${campaignSummary.callScheduling.hours}, ${campaignSummary.callScheduling.daysPerWeek}` 
    },
  ];

  const allChecksPass = readinessChecks.every(check => check.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <LaunchHeader />
      
      <ReadinessCheckList 
        outreachData={outreachData}
        campaignSummary={campaignSummary}
      />

      <CampaignSummary campaignSummary={campaignSummary} />

      <LaunchSection
        allChecksPass={allChecksPass}
        isLaunching={isLaunching}
        onLaunch={handleLaunchCampaign}
      />
    </div>
  );
};

export default Step5LaunchCampaign;
