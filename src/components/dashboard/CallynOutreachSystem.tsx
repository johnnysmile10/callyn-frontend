
import { useState } from "react";
import { 
  Target, 
  Users, 
  MessageSquare, 
  Calendar, 
  Rocket
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Step1TargetAudience from "./outreach/steps/Step1TargetAudience";
import Step2LeadList from "./outreach/steps/Step2LeadList";
import Step3ScriptLanguage from "./outreach/steps/Step3ScriptLanguage";
import Step4CallScheduling from "./outreach/steps/Step4CallScheduling";
import Step5LaunchCampaign from "./outreach/steps/Step5LaunchCampaign";
import StepNavigation from "./outreach/steps/StepNavigation";
import OutreachHeader from "./outreach/OutreachHeader";
import StepProgressIndicator from "./outreach/StepProgressIndicator";
import StepRenderer from "./outreach/StepRenderer";
import { useOutreachFlow } from "./outreach/hooks/useOutreachFlow";

const CallynOutreachSystem = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { canProceedFromStep, getCurrentStepData, handleStepDataUpdate, outreachData } = useOutreachFlow();
  
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
      description: "Configure availability and calendar booking",
      icon: Calendar,
      component: Step4CallScheduling
    },
    {
      id: 5,
      title: "Launch Campaign",
      description: "Go live with AI-powered outreach",
      icon: Rocket,
      component: Step5LaunchCampaign
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
      title: "🎉 Campaign Launched!",
      description: "Your AI outreach campaign is now live and making calls.",
    });
    console.log("Launching campaign with outreach data", outreachData);
    
    // Navigate to call log to show activity
    setTimeout(() => {
      navigate('/dashboard', { state: { activeTab: 'call-log' } });
    }, 2000);
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
        {currentStep === 5 ? (
          <Step5LaunchCampaign
            data={getCurrentStepData(currentStep)}
            onUpdate={(data) => handleStepDataUpdate(currentStep, data)}
            outreachData={outreachData}
            onLaunch={handleLaunchCampaign}
          />
        ) : (
          <StepRenderer
            step={currentStepObj}
            data={getCurrentStepData(currentStep)}
            onUpdate={(data) => handleStepDataUpdate(currentStep, data)}
          />
        )}
        
        {currentStep !== 5 && (
          <StepNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onComplete={handleLaunchCampaign}
            canProceed={canProceedFromStep(currentStep)}
            isLastStep={currentStep === steps.length}
          />
        )}
      </div>
    </div>
  );
};

export default CallynOutreachSystem;
