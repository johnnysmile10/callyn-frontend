
import { useState } from "react";
import { 
  Target, 
  Users, 
  MessageSquare, 
  Calendar, 
  Phone, 
  Rocket
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Step1TargetAudience from "./outreach/steps/Step1TargetAudience";
import Step2LeadList from "./outreach/steps/Step2LeadList";
import Step3ScriptLanguage from "./outreach/steps/Step3ScriptLanguage";
import StepNavigation from "./outreach/steps/StepNavigation";
import OutreachIntegrations from "./outreach/OutreachIntegrations";
import OutreachHeader from "./outreach/OutreachHeader";
import StepProgressIndicator from "./outreach/StepProgressIndicator";
import StepRenderer from "./outreach/StepRenderer";
import { useOutreachFlow } from "./outreach/hooks/useOutreachFlow";

const CallynOutreachSystem = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const { canProceedFromStep, getCurrentStepData, handleStepDataUpdate } = useOutreachFlow();
  
  const steps = [
    {
      id: 1,
      title: "Define Target Audience",
      description: "Set up your ideal customer profile",
      icon: Target,
      component: Step1TargetAudience
    },
    {
      id: 2,
      title: "Build Lead List", 
      description: "Import or create your prospect database",
      icon: Users,
      component: Step2LeadList
    },
    {
      id: 3,
      title: "Craft Outreach Script",
      description: "Design compelling conversation flows with language support",
      icon: MessageSquare,
      component: Step3ScriptLanguage
    },
    {
      id: 4,
      title: "Set Call Scheduling",
      description: "Configure availability and booking",
      icon: Calendar,
      component: null
    },
    {
      id: 5,
      title: "Test Your Setup",
      description: "Run test calls for optimization",
      icon: Phone,
      component: null
    },
    {
      id: 6,
      title: "Launch Campaign",
      description: "Go live with AI-powered outreach",
      icon: Rocket,
      component: null
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunchCampaign = () => {
    toast({
      title: "Campaign Launched!",
      description: "Your AI outreach campaign is now live and making calls.",
    });
    console.log("Launching campaign with outreach data");
  };

  const currentStepObj = steps[currentStep - 1];

  return (
    <div className="space-y-6">
      <OutreachHeader 
        currentStep={currentStep}
        totalSteps={steps.length}
      />

      <StepProgressIndicator 
        steps={steps}
        currentStep={currentStep}
      />

      <div className="space-y-6">
        <StepRenderer
          step={currentStepObj}
          data={getCurrentStepData(currentStep)}
          onUpdate={(data) => handleStepDataUpdate(currentStep, data)}
        />
        
        <StepNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onComplete={handleLaunchCampaign}
          canProceed={canProceedFromStep(currentStep)}
          isLastStep={currentStep === steps.length}
        />
      </div>

      <OutreachIntegrations />
    </div>
  );
};

export default CallynOutreachSystem;
