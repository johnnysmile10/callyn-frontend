
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  canProceed: boolean;
  isLastStep: boolean;
}

const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onComplete,
  canProceed,
  isLastStep
}: StepNavigationProps) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <div className="text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>
      
      {isLastStep ? (
        <Button 
          onClick={onComplete}
          disabled={!canProceed}
          className="bg-green-600 hover:bg-green-700"
        >
          Launch Campaign
        </Button>
      ) : (
        <Button 
          onClick={onNext}
          disabled={!canProceed}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
