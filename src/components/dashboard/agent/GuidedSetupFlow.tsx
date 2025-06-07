
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, FileText, Play, Rocket } from "lucide-react";
import PersonalAgentManager from "../PersonalAgentManager";
import AgentPromptScript from "./AgentPromptScript";

interface GuidedSetupFlowProps {
  currentStep: number;
  onStepComplete: (stepId: number) => void;
  completedSteps: number[];
}

const GuidedSetupFlow = ({ currentStep, onStepComplete, completedSteps }: GuidedSetupFlowProps) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                Step 1: Create Your Agent Profile
              </CardTitle>
              <CardDescription>
                Set up your AI agent's identity, personality, and basic information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalAgentManager />
              <div className="mt-6 flex justify-end">
                <Button onClick={() => onStepComplete(1)}>
                  Continue to Script Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Step 2: Configure Script & Voice
              </CardTitle>
              <CardDescription>
                Create conversation flows, objection handling, and select your agent's voice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AgentPromptScript />
              <div className="mt-6 flex justify-end">
                <Button onClick={() => onStepComplete(2)}>
                  Continue to Testing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-600" />
                Step 3: Test Your Agent
              </CardTitle>
              <CardDescription>
                Try a sample call to ensure your agent sounds and behaves correctly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Play className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready for Testing</h3>
                <p className="text-gray-600 mb-6">
                  Your agent is configured and ready for a test call. Use the preview feature below to try it out.
                </p>
                <Button onClick={() => onStepComplete(3)} size="lg">
                  Mark Testing Complete
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-600" />
                Step 4: Deploy Your Agent
              </CardTitle>
              <CardDescription>
                Launch your AI agent and start your first calling campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Rocket className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Go Live!</h3>
                <p className="text-gray-600 mb-6">
                  Your AI agent is fully configured and tested. You're ready to start your first campaign.
                </p>
                <div className="space-y-4">
                  <Button onClick={() => onStepComplete(4)} size="lg" className="w-full">
                    Complete Setup & Go Live
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-gray-500">
                    This will mark your agent as ready for production use
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderStepContent()}
    </div>
  );
};

export default GuidedSetupFlow;
