
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, Rocket } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QuickStartErrorBoundary from "./QuickStartErrorBoundary";
import { BusinessSetupStep, VoiceSelectionStep, ScriptCreationStep } from "./QuickStartWizardSteps";

interface QuickStartData {
  businessName: string;
  industry: string;
  selectedVoice: string;
  script: string;
}

interface QuickStartWizardProps {
  onComplete: (data: QuickStartData) => void;
  onSkip: () => void;
}

const STEPS = [
  { id: 'business', title: 'Business Setup', description: 'Tell us about your business' },
  { id: 'voice', title: 'Choose Voice', description: 'Select your AI agent voice' },
  { id: 'script', title: 'Create Script', description: 'Create your call script' }
];

const QuickStartWizard = ({ onComplete, onSkip }: QuickStartWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuickStartData>({
    businessName: '',
    industry: '',
    selectedVoice: '',
    script: ''
  });

  const updateFormData = (field: keyof QuickStartData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    try {
      onComplete(formData);
      toast({
        title: "Quick Start Complete!",
        description: "Your AI agent is ready to start making calls.",
      });
    } catch (error) {
      console.error('Quick Start completion error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: nextStep,
      onPrev: currentStep > 0 ? prevStep : undefined,
      data: formData,
      updateData: updateFormData
    };

    switch (currentStep) {
      case 0:
        return <BusinessSetupStep {...stepProps} />;
      case 1:
        return <VoiceSelectionStep {...stepProps} />;
      case 2:
        return <ScriptCreationStep {...stepProps} />;
      default:
        return <BusinessSetupStep {...stepProps} />;
    }
  };

  return (
    <QuickStartErrorBoundary onRetry={() => setCurrentStep(0)}>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-blue-600" />
              Quick Start Wizard
            </CardTitle>
            <CardDescription>
              Get your AI calling agent set up in just a few minutes
            </CardDescription>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Step {currentStep + 1} of {STEPS.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStep 
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {renderCurrentStep()}
            </div>

            {/* Skip Option */}
            <div className="flex justify-center pt-4 border-t">
              <Button variant="ghost" onClick={onSkip} className="text-gray-500">
                Skip Setup for Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </QuickStartErrorBoundary>
  );
};

export default QuickStartWizard;
