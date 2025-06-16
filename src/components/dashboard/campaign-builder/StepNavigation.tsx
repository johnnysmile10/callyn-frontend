
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
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
    <div className="flex justify-between items-center pt-8 border-t">
      <div>
        {currentStep > 1 && (
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>

      <div>
        {isLastStep ? (
          <Button 
            onClick={onComplete}
            disabled={!canProceed}
            className="bg-green-600 hover:bg-green-700"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Launch Campaign
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            disabled={!canProceed}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
