
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mt-8 max-w-md mx-auto">
      <Progress value={progressPercentage} className="h-2" />
      <p className="text-sm text-gray-500 mt-2">Step {currentStep} of {totalSteps}</p>
    </div>
  );
};

export default ProgressIndicator;
