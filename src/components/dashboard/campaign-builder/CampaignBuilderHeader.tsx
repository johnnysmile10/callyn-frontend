
import { Rocket } from "lucide-react";

interface CampaignBuilderHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const CampaignBuilderHeader = ({ currentStep, totalSteps }: CampaignBuilderHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <Rocket className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        AI Campaign Builder
      </h1>
      <p className="text-xl text-gray-600 mb-4">
        Create and launch your AI-powered sales campaign in 8 simple steps
      </p>
      <div className="text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default CampaignBuilderHeader;
