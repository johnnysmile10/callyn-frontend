
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, ArrowRight, CheckCircle, Loader2, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context";
import { OnboardingData, UserAgent } from "@/context/types/authTypes";
import QuickStartWizard from "../shared/QuickStartWizard";
import QuickStartErrorBoundary from "../shared/QuickStartErrorBoundary";

interface QuickStartIntegrationProps {
  hasAgent?: boolean;
  onAgentCreated?: () => void;
}

const QuickStartIntegration = ({ hasAgent = false, onAgentCreated }: QuickStartIntegrationProps) => {
  const [showWizard, setShowWizard] = useState(false);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const { setUserAgent, setOnboardingData, markSetupCompleted, updateProgressState } = useAuth();

  const handleWizardComplete = async (data: any) => {
    console.log("Quick Start wizard completed with enhanced data:", data);
    setIsCreatingAgent(true);
    
    try {
      const agentId = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const currentTime = new Date().toISOString();
      
      const newAgent: UserAgent = {
        id: agentId,
        name: data.businessName || "My AI Agent",
        status: 'active',
        createdAt: currentTime,
        configuration: {
          voice: data.selectedVoice || data.languageConfig?.voiceId || "9BWtsMINqrJLrRacOk9x",
          personality: "professional",
          script: data.script || "",
          businessInfo: {
            name: data.businessName || "",
            industry: data.industry || "",
            targetAudience: "prospects",
            mainGoal: "generate leads"
          }
        }
      };

      console.log("Created UserAgent object with language support:", newAgent);

      const onboardingData: OnboardingData = {
        businessName: data.businessName || "",
        industry: data.industry || "",
        selectedVoice: data.selectedVoice || data.languageConfig?.voiceId || "9BWtsMINqrJLrRacOk9x",
        customScript: data.script || "",
        scriptMethod: "custom",
        personality: "professional",
        speakingSpeed: 1,
        enthusiasm: 0.5,
        useSmallTalk: true,
        handleObjections: true,
        targetAudience: "prospects",
        mainGoal: "generate leads",
        languageConfig: data.languageConfig
      };

      console.log("Setting enhanced onboarding data with language config:", onboardingData);

      setOnboardingData(onboardingData);
      setUserAgent(newAgent);
      markSetupCompleted();
      
      updateProgressState({
        hasVoiceIntegration: true,
        agentConfigurationLevel: 'complete'
      });
      
      console.log("Agent creation completed successfully with language support");
      
      setShowWizard(false);
      
      const languageInfo = data.languageConfig?.primaryLanguage !== 'en' 
        ? ` with ${data.languageConfig.primaryLanguage.toUpperCase()} language support`
        : '';
      
      toast({
        title: "Agent Created Successfully!",
        description: `Your AI calling agent is ready to start making calls${languageInfo}.`,
      });

      setTimeout(() => {
        if (onAgentCreated) {
          onAgentCreated();
        }
      }, 100);

    } catch (error) {
      console.error("Error creating agent:", error);
      toast({
        title: "Error Creating Agent",
        description: "Something went wrong while creating your agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingAgent(false);
    }
  };

  const handleWizardSkip = () => {
    setShowWizard(false);
    toast({
      title: "Quick Start Skipped",
      description: "You can always run the setup wizard later from your agent settings.",
    });
  };

  const handleRetryWizard = () => {
    setShowWizard(false);
    setIsCreatingAgent(false);
    setTimeout(() => setShowWizard(true), 100);
  };

  if (showWizard) {
    return (
      <QuickStartErrorBoundary onRetry={handleRetryWizard}>
        <div className={isCreatingAgent ? "pointer-events-none opacity-50" : ""}>
          <QuickStartWizard 
            onComplete={handleWizardComplete}
            onSkip={handleWizardSkip}
          />
        </div>
        {isCreatingAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin" />
                <div>
                  <p className="font-medium">Creating Your Agent...</p>
                  <p className="text-sm text-gray-600">Setting up language preferences and voice</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </QuickStartErrorBoundary>
    );
  }

  return (
    <div className="space-y-6">
      {!hasAgent && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-blue-600" />
              Get Started in 6 Minutes
            </CardTitle>
            <CardDescription>
              Create your first AI calling agent with our guided setup wizard including full language support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Business Setup</p>
                  <p className="text-xs text-gray-600">Tell us about your business</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Language Settings</p>
                  <p className="text-xs text-gray-600">Choose your languages</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Choose Voice</p>
                  <p className="text-xs text-gray-600">Select your AI agent's voice</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">4</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Create Script</p>
                  <p className="text-xs text-gray-600">Generate your call script</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                Multi-Language Support:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <span className="text-gray-600">🇺🇸 English</span>
                <span className="text-gray-600">🇳🇴 Norwegian</span>
                <span className="text-gray-600">🇸🇪 Swedish</span>
                <span className="text-gray-600">🇩🇰 Danish</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => setShowWizard(true)}
                disabled={isCreatingAgent}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                {isCreatingAgent ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Agent...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    Start Quick Setup
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleWizardSkip} disabled={isCreatingAgent}>
                Skip for Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {hasAgent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Your Agent is Ready!
            </CardTitle>
            <CardDescription>
              Your AI calling agent has been successfully configured with language support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm text-green-800">Agent Configured</p>
                  <p className="text-xs text-green-600">Voice and personality set</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm text-green-800">Language Ready</p>
                  <p className="text-xs text-green-600">Multi-language support active</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setShowWizard(true)}
                variant="outline"
                size="sm"
                disabled={isCreatingAgent}
              >
                Update Settings
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Ready for Calls
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuickStartIntegration;
