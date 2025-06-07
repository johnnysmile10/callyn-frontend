
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Zap, Shield, Bot, ArrowRight, Play } from "lucide-react";
import AgentProfileStep from "./steps/AgentProfileStep";
import ScriptStarterStep from "./steps/ScriptStarterStep";
import BehaviorSettingsStep from "./steps/BehaviorSettingsStep";
import VoiceTestStep from "./steps/VoiceTestStep";
import FinalReviewStep from "./steps/FinalReviewStep";
import TrustBuildingFeatures from "./TrustBuildingFeatures";

const AgentSetupTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [agentData, setAgentData] = useState({
    profile: {},
    script: {},
    behavior: {},
    voice: {},
    final: {}
  });

  const steps = [
    { id: 1, title: "Agent Profile", description: "Define your AI agent's identity and role", component: AgentProfileStep },
    { id: 2, title: "Script Starter", description: "Quick script templates and customization", component: ScriptStarterStep },
    { id: 3, title: "Behavior & Intelligence", description: "Configure AI personality and responses", component: BehaviorSettingsStep },
    { id: 4, title: "Voice Test Zone", description: "Select voice and test your agent live", component: VoiceTestStep },
    { id: 5, title: "Final Review + Launch", description: "Review settings and deploy your agent", component: FinalReviewStep }
  ];

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  const handleStepComplete = (stepId: number, data: any) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    // Update agent data
    const stepKey = ['profile', 'script', 'behavior', 'voice', 'final'][stepId - 1];
    setAgentData(prev => ({ ...prev, [stepKey]: data }));
    
    // Auto-advance to next step
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleStepChange = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: number) => currentStep === stepId;
  const isStepAccessible = (stepId: number) => stepId <= currentStep || isStepCompleted(stepId);

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="space-y-8">
      {/* Motivational Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          <Zap className="h-4 w-4" />
          Your AI Sales Team Awaits
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Build Your AI Agent in Minutes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create a personalized AI sales agent that sounds like you, follows your script, 
          and converts leads 24/7. No technical skills required.
        </p>
      </div>

      {/* Trust Building Features */}
      <TrustBuildingFeatures />

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                Setup Progress
              </CardTitle>
              <CardDescription>
                {completedSteps.length} of {steps.length} steps completed
              </CardDescription>
            </div>
            <Badge variant={completedSteps.length === steps.length ? "default" : "secondary"}>
              {Math.round(progressPercentage)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isStepCurrent(step.id)
                    ? "border-blue-500 bg-blue-50"
                    : isStepCompleted(step.id)
                    ? "border-green-500 bg-green-50"
                    : isStepAccessible(step.id)
                    ? "border-gray-200 bg-gray-50 hover:border-gray-300"
                    : "border-gray-100 bg-gray-25 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => isStepAccessible(step.id) && handleStepChange(step.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isStepCompleted(step.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isStepCurrent(step.id) ? (
                    <Clock className="h-5 w-5 text-blue-600" />
                  ) : (
                    <div className={`h-5 w-5 rounded-full border-2 ${
                      isStepAccessible(step.id) ? "border-gray-300" : "border-gray-200"
                    }`} />
                  )}
                  <span className="font-medium text-sm">{step.title}</span>
                </div>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      {CurrentStepComponent && (
        <CurrentStepComponent 
          onComplete={(data: any) => handleStepComplete(currentStep, data)}
          initialData={agentData}
          isCompleted={isStepCompleted(currentStep)}
        />
      )}

      {/* Final Success State */}
      {completedSteps.length === steps.length && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              🎉 Your AI Agent is Ready!
            </h3>
            <p className="text-green-700 mb-6">
              Congratulations! Your AI sales agent is configured and ready to start calling leads.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Start First Campaign
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentSetupTab;
