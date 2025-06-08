
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Users, 
  MessageSquare, 
  Calendar, 
  Phone, 
  Rocket,
  CheckCircle,
  Building2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Step1TargetAudience from "./outreach/steps/Step1TargetAudience";
import Step2LeadList from "./outreach/steps/Step2LeadList";
import StepNavigation from "./outreach/steps/StepNavigation";
import OutreachIntegrations from "./outreach/OutreachIntegrations";
import { OutreachData, TargetAudience, LeadRecord } from "./outreach/types";
import { useToast } from "@/hooks/use-toast";

const CallynOutreachSystem = () => {
  const { user, outreachData, setOutreachData } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
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
      description: "Design compelling conversation flows",
      icon: MessageSquare,
      component: null // Will implement in next iteration
    },
    {
      id: 4,
      title: "Set Call Scheduling",
      description: "Configure availability and booking",
      icon: Calendar,
      component: null // Will implement in next iteration
    },
    {
      id: 5,
      title: "Test Your Setup",
      description: "Run test calls for optimization",
      icon: Phone,
      component: null // Will implement in next iteration
    },
    {
      id: 6,
      title: "Launch Campaign",
      description: "Go live with AI-powered outreach",
      icon: Rocket,
      component: null // Will implement in next iteration
    }
  ];

  const progressPercentage = ((currentStep - 1) / steps.length) * 100;

  const updateOutreachData = (updates: Partial<OutreachData>) => {
    const newData = { ...outreachData, ...updates };
    setOutreachData(newData);
  };

  const canProceedFromStep = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return !!(outreachData?.targetAudience?.industry?.length && 
                 outreachData?.targetAudience?.companySize?.length);
      case 2:
        return !!(outreachData?.leadList?.length && outreachData.leadList.length > 0);
      case 3:
        return !!(outreachData?.script?.greeting);
      case 4:
        return !!(outreachData?.scheduling?.timezone);
      case 5:
        return !!(outreachData?.testResults?.callCount);
      case 6:
        return true;
      default:
        return false;
    }
  };

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
    console.log("Launching campaign with data:", outreachData);
  };

  const getCurrentStepData = () => {
    switch (currentStep) {
      case 1:
        return outreachData?.targetAudience || {
          industry: [],
          companySize: [],
          jobTitles: [],
          location: []
        };
      case 2:
        return outreachData?.leadList || [];
      default:
        return {};
    }
  };

  const handleStepDataUpdate = (data: any) => {
    switch (currentStep) {
      case 1:
        updateOutreachData({ targetAudience: data as TargetAudience });
        break;
      case 2:
        updateOutreachData({ leadList: data as LeadRecord[] });
        break;
    }
  };

  const renderCurrentStep = () => {
    const step = steps[currentStep - 1];
    const Component = step.component;
    
    if (!Component) {
      return (
        <Card>
          <CardContent className="text-center py-12">
            <step.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 mb-6">{step.description}</p>
            <p className="text-sm text-gray-500">This step will be implemented in the next update.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Component 
        data={getCurrentStepData()}
        onUpdate={handleStepDataUpdate}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Purpose Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-blue-900">Callyn Outreach System</CardTitle>
              <CardDescription className="text-blue-700">
                Complete setup to launch your AI-powered outreach campaigns
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-blue-700 mb-2">
                <span>Setup Progress</span>
                <span>{currentStep - 1} of {steps.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : isCurrent 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      isCurrent ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block absolute h-0.5 w-16 mt-5 ml-16 ${
                      isCompleted ? 'bg-green-200' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <div className="space-y-6">
        {renderCurrentStep()}
        
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

      {/* Integrations Panel */}
      <OutreachIntegrations />
    </div>
  );
};

export default CallynOutreachSystem;
