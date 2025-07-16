
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Target, User, MessageSquare, Phone, Calendar, TestTube, Play } from "lucide-react";
import { useAuth } from "@/context";
import CampaignBuilderHeader from "./campaign-builder/CampaignBuilderHeader";
import StepProgressIndicator from "./campaign-builder/StepProgressIndicator";
import StepRenderer from "./campaign-builder/StepRenderer";
import StepNavigation from "./campaign-builder/StepNavigation";
import { useCampaignBuilderFlow } from "./campaign-builder/hooks/useCampaignBuilderFlow";

// Import step components
import Step1AgentProfile from "./campaign-builder/steps/Step1AgentProfile";
import Step2TargetAudience from "./campaign-builder/steps/Step2TargetAudience";
import Step3ScriptCreation from "./campaign-builder/steps/Step3ScriptCreation";
import Step4VoiceSettings from "./campaign-builder/steps/Step4VoiceSettings";
import Step5LeadManagement from "./campaign-builder/steps/Step5LeadManagement";
import Step6CallScheduling from "./campaign-builder/steps/Step6CallScheduling";
import Step7TestValidate from "./campaign-builder/steps/Step7TestValidate";
import Step8LaunchCampaign from "./campaign-builder/steps/Step8LaunchCampaign";
import ApiService from "@/context/services/apiService";

const steps = [
  {
    id: 1,
    title: "Agent Profile",
    description: "Define your AI agent's identity and role",
    icon: User,
    component: Step1AgentProfile
  },
  {
    id: 2,
    title: "Target Audience",
    description: "Set up your ideal customer profile",
    icon: Target,
    component: Step2TargetAudience
  },
  {
    id: 3,
    title: "Script Creation",
    description: "Design compelling conversation flows",
    icon: MessageSquare,
    component: Step3ScriptCreation
  },
  {
    id: 4,
    title: "Voice Settings",
    description: "Configure voice and personality",
    icon: Phone,
    component: Step4VoiceSettings
  },
  {
    id: 5,
    title: "Lead Management",
    description: "Import and manage your prospect database",
    icon: Target,
    component: Step5LeadManagement
  },
  {
    id: 6,
    title: "Call Scheduling",
    description: "Configure availability and calendar booking",
    icon: Calendar,
    component: Step6CallScheduling
  },
  {
    id: 7,
    title: "Test & Validate",
    description: "Test your agent before going live",
    icon: TestTube,
    component: Step7TestValidate
  },
  {
    id: 8,
    title: "Launch Campaign",
    description: "Go live with AI-powered outreach",
    icon: Rocket,
    component: Step8LaunchCampaign
  }
];

const AICampaignBuilder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { canProceedFromStep, getCurrentStepData, handleStepDataUpdate, campaignData } = useCampaignBuilderFlow();

  const canProceedNavigation = useMemo(() => {
    return canProceedFromStep(currentStep);
  }, [currentStep, canProceedFromStep]);

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

  const handleLaunchCampaign = async () => {
    console.log('Campaign data', campaignData)

    const payload = {
      agent: campaignData.agentProfile,
      target_audience: campaignData.targetAudience.description,
      voice_settings: campaignData.voiceSettings,
      script: `
        ${campaignData.script.greeting}
        ${campaignData.script.mainPitch}
        ${campaignData.script.closingStatement}
      `,
      customers: campaignData.leadManagement.leadList
    };

    try {
      await ApiService.post('/campaign', payload);

      toast({
        title: "🎉 Campaign Launched!",
        description: "Your AI campaign is now live and making calls.",
      });

      navigate('/dashboard', { state: { activeTab: 'campaigns' } });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data,
        variant: 'destructive'
      })
    }

    // Navigate to call log to show activity
    // setTimeout(() => {
    //   navigate('/dashboard', { state: { activeTab: 'call-log' } });
    // }, 2000);
  };

  const currentStepObj = steps[currentStep - 1];

  return (
    <div className="space-y-6">
      <CampaignBuilderHeader
        currentStep={currentStep}
        totalSteps={steps.length}
      />

      <StepProgressIndicator
        steps={steps}
        currentStep={currentStep}
      />

      <div className="space-y-6">
        {currentStep === 8 ? (
          <Step8LaunchCampaign
            data={getCurrentStepData(currentStep)}
            onUpdate={(data) => handleStepDataUpdate(currentStep, data)}
            campaignData={campaignData}
            onLaunch={handleLaunchCampaign}
          />
        ) : (
          <StepRenderer
            step={currentStepObj}
            data={getCurrentStepData(currentStep)}
            onUpdate={(data) => handleStepDataUpdate(currentStep, data)}
          />
        )}

        {currentStep !== 8 && (
          <StepNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onComplete={handleLaunchCampaign}
            canProceed={canProceedNavigation}
            isLastStep={currentStep === steps.length}
          />
        )}
      </div>
    </div>
  );
};

export default AICampaignBuilder;
