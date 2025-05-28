
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, X } from "lucide-react";
import { AgentData } from "@/pages/CreateAgent";
import Step1AgentType from "./steps/Step1AgentType";
import Step2BasicInfo from "./steps/Step2BasicInfo";
import Step3VoiceLanguage from "./steps/Step3VoiceLanguage";
import Step4TrainingMethod from "./steps/Step4TrainingMethod";
import Step5CallBehavior from "./steps/Step5CallBehavior";
import Step6Integration from "./steps/Step6Integration";

interface CreateAgentWizardProps {
  onAgentCreated: (agentData: AgentData) => void;
  onCancel: () => void;
}

const CreateAgentWizard = ({ onAgentCreated, onCancel }: CreateAgentWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agentData, setAgentData] = useState<AgentData>({
    agentType: null,
    agentName: "",
    agentRole: "",
    businessContext: "",
    voiceId: "",
    primaryLanguage: "en",
    additionalLanguages: [],
    trainingMethod: null,
    callObjectives: [],
    objectionHandling: "",
    transferRules: "",
    maxCallDuration: 10,
    crmIntegration: "",
    leadSources: []
  });

  const totalSteps = 6;

  const updateAgentData = (updates: Partial<AgentData>) => {
    setAgentData(prev => ({ ...prev, ...updates }));
  };

  const goNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - create agent
      onAgentCreated(agentData);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Choose Agent Type";
      case 2: return "Basic Information";
      case 3: return "Voice & Language";
      case 4: return "Training Method";
      case 5: return "Call Behavior";
      case 6: return "Integration Settings";
      default: return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1AgentType data={agentData} updateData={updateAgentData} onNext={goNext} />;
      case 2:
        return <Step2BasicInfo data={agentData} updateData={updateAgentData} onNext={goNext} />;
      case 3:
        return <Step3VoiceLanguage data={agentData} updateData={updateAgentData} onNext={goNext} />;
      case 4:
        return <Step4TrainingMethod data={agentData} updateData={updateAgentData} onNext={goNext} />;
      case 5:
        return <Step5CallBehavior data={agentData} updateData={updateAgentData} onNext={goNext} />;
      case 6:
        return <Step6Integration data={agentData} updateData={updateAgentData} onNext={goNext} />;
      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {currentStep > 1 && (
            <Button variant="ghost" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-callyn-darkBlue">Create New Agent</h1>
            <p className="text-gray-600 mt-1">Step {currentStep} of {totalSteps}: {getStepTitle()}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Step {currentStep}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8">
        {renderStep()}
      </Card>
    </div>
  );
};

export default CreateAgentWizard;
