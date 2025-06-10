
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Globe, MessageSquare, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VoiceLanguageTab from "./agent-config/VoiceLanguageTab";
import ScriptPersonalityTab from "./agent-config/ScriptPersonalityTab";
import PhoneCallTab from "./agent-config/PhoneCallTab";

const AgentConfigurationDashboard = () => {
  const { userAgent, onboardingData, hasCompletedSetup } = useAuth();
  const [activeTab, setActiveTab] = useState("voice-language");
  const navigate = useNavigate();

  // Show setup prompt if no agent or onboarding data exists
  if (!userAgent && !onboardingData && !hasCompletedSetup()) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Configuration</h1>
            <p className="text-gray-600">
              Configure your AI agent's voice, personality, and call settings
            </p>
          </div>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Bot className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Complete Setup First</AlertTitle>
          <AlertDescription className="text-blue-700 flex items-center justify-between">
            <span>Complete your initial setup to access agent configuration options.</span>
            <Button 
              onClick={() => navigate('/onboarding')} 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white ml-4"
            >
              Complete Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Bot className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Configuration</h1>
          <p className="text-gray-600">
            Configure your AI agent's voice, personality, and call settings
          </p>
        </div>
      </div>

      {/* Configuration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="voice-language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Voice & Language
          </TabsTrigger>
          <TabsTrigger value="script-personality" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Script & Personality
          </TabsTrigger>
          <TabsTrigger value="phone-call" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone & Call Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice-language" className="space-y-6">
          <VoiceLanguageTab />
        </TabsContent>

        <TabsContent value="script-personality" className="space-y-6">
          <ScriptPersonalityTab />
        </TabsContent>

        <TabsContent value="phone-call" className="space-y-6">
          <PhoneCallTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentConfigurationDashboard;
