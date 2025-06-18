
import { useAuth } from "@/context";
import Step5LaunchCampaign from "../../outreach/steps/Step5LaunchCampaign";

interface Step8LaunchCampaignProps {
  data: any;
  onUpdate: (data: any) => void;
  campaignData: any;
  onLaunch: () => void;
}

const Step8LaunchCampaign = ({ data, onUpdate, campaignData, onLaunch }: Step8LaunchCampaignProps) => {
  const { updateProgressState } = useAuth();

  const handleLaunch = () => {
    // Mark campaign as created when launching
    updateProgressState({ hasCampaigns: true });
    onLaunch();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Step5LaunchCampaign 
        data={data} 
        onUpdate={onUpdate} 
        outreachData={campaignData} 
        onLaunch={handleLaunch} 
      />
    </div>
  );
};

export default Step8LaunchCampaign;
