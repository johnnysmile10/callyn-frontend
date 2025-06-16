
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
}

interface StepProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepProgressIndicator = ({ steps, currentStep }: StepProgressIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 mb-2",
                  isCompleted && "bg-green-500 border-green-500 text-white",
                  isCurrent && "bg-blue-600 border-blue-600 text-white",
                  isUpcoming && "bg-gray-100 border-gray-300 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>

              {/* Step Label */}
              <div className="text-center">
                <div
                  className={cn(
                    "text-sm font-medium",
                    isCompleted && "text-green-600",
                    isCurrent && "text-blue-600",
                    isUpcoming && "text-gray-400"
                  )}
                >
                  {step.title}
                </div>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 h-0.5 w-full",
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  )}
                  style={{
                    left: `${((index + 1) / steps.length) * 100}%`,
                    width: `${(1 / steps.length) * 100}%`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgressIndicator;
