
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Zap, Shield, Bot, ArrowRight, Play } from "lucide-react";
import GuidedSetupFlow from "./GuidedSetupFlow";
import TrustBuildingFeatures from "./TrustBuildingFeatures";
import InstantPreviewCall from "./InstantPreviewCall";

const AgentSetupTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { id: 1, title: "Agent Profile", description: "Set up your AI agent's identity and personality" },
    { id: 2, title: "Script & Voice", description: "Create conversation flows and select voice" },
    { id: 3, title: "Test & Preview", description: "Try your agent with a sample call" },
    { id: 4, title: "Go Live", description: "Deploy your agent and start calling leads" }
  ];

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    // Auto-advance to next step
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: number) => currentStep === stepId;

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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isStepCurrent(step.id)
                    ? "border-blue-500 bg-blue-50"
                    : isStepCompleted(step.id)
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isStepCompleted(step.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isStepCurrent(step.id) ? (
                    <Clock className="h-5 w-5 text-blue-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className="font-medium text-sm">{step.title}</span>
                </div>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trust Building Features */}
      <TrustBuildingFeatures />

      {/* Guided Setup Flow */}
      <GuidedSetupFlow 
        currentStep={currentStep}
        onStepComplete={handleStepComplete}
        completedSteps={completedSteps}
      />

      {/* Instant Preview Call */}
      {(currentStep >= 3 || completedSteps.includes(2)) && (
        <InstantPreviewCall 
          show={showPreview}
          onToggle={setShowPreview}
        />
      )}

      {/* Smart CTA */}
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
