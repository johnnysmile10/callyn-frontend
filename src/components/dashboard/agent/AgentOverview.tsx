
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Clock, 
  Phone, 
  Bot, 
  FileText, 
  Mic, 
  Settings, 
  Edit,
  Building2,
  Target,
  Users
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LanguageConfigPanel from "./LanguageConfigPanel";
import UnifiedScriptEditor from "../shared/UnifiedScriptEditor";
import AgentProfileEditModal from "./AgentProfileEditModal";
import VoicePersonalityEditModal from "./VoicePersonalityEditModal";
import { LanguageConfig } from "../outreach/types";

const AgentOverview = () => {
  const { userAgent, onboardingData, setOnboardingData, setUserAgent } = useAuth();
  const [showScriptEditor, setShowScriptEditor] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showVoiceEdit, setShowVoiceEdit] = useState(false);

  const handleLanguageConfigChange = (languageConfig: LanguageConfig) => {
    // Store language config in onboarding data for now
    // In a real app, this would be stored with the agent configuration
    if (setOnboardingData && onboardingData) {
      setOnboardingData({
        ...onboardingData,
        languageConfig
      });
    }
  };

  const handleProfileSave = (businessInfo: {
    name: string;
    industry: string;
    targetAudience: string;
    mainGoal: string;
  }) => {
    if (userAgent && setUserAgent) {
      const updatedAgent = {
        ...userAgent,
        configuration: {
          ...userAgent.configuration,
          businessInfo
        }
      };
      setUserAgent(updatedAgent);
    }
  };

  const handleVoicePersonalitySave = (voice: string, personality: string) => {
    if (userAgent && setUserAgent) {
      const updatedAgent = {
        ...userAgent,
        configuration: {
          ...userAgent.configuration,
          voice,
          personality
        }
      };
      setUserAgent(updatedAgent);
    }
  };

  const handleScriptSave = (data: {
    script: string;
    personality: string;
    useSmallTalk: boolean;
    handleObjections: boolean;
  }) => {
    if (userAgent && setUserAgent) {
      const updatedAgent = {
        ...userAgent,
        configuration: {
          ...userAgent.configuration,
          script: data.script,
          personality: data.personality
        }
      };
      setUserAgent(updatedAgent);
    }
  };

  if (!userAgent) {
    return (
      <div className="space-y-6">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-900">No Agent Configured</CardTitle>
            </div>
            <CardDescription className="text-yellow-700">
              Complete the onboarding process to create your AI agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-yellow-600 hover:bg-yellow-700" asChild>
              <a href="/onboarding">
                <Bot className="mr-2 h-4 w-4" />
                Create Agent
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { configuration } = userAgent;

  return (
    <div className="space-y-6">
      {/* Agent Status Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-900">{userAgent.name}</CardTitle>
                <CardDescription className="text-green-700">
                  Created on {new Date(userAgent.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <CheckCircle className="mr-1 h-3 w-3" />
              {userAgent.status === 'active' ? 'Active' : userAgent.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <CardTitle>Business Information</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowProfileEdit(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Business Name</label>
              <p className="text-sm text-gray-900 mt-1">
                {configuration.businessInfo.name || 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Industry</label>
              <p className="text-sm text-gray-900 mt-1">
                {configuration.businessInfo.industry || 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Target Audience</label>
              <p className="text-sm text-gray-900 mt-1">
                {configuration.businessInfo.targetAudience || 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Main Goal</label>
              <p className="text-sm text-gray-900 mt-1">
                {configuration.businessInfo.mainGoal || 'Not specified'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice & Personality */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-purple-600" />
              <CardTitle>Voice & Personality</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowVoiceEdit(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Voice</label>
              <p className="text-sm text-gray-900 mt-1">{configuration.voice}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Personality</label>
              <p className="text-sm text-gray-900 mt-1 capitalize">{configuration.personality}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Configuration */}
      <LanguageConfigPanel
        config={onboardingData?.languageConfig}
        onConfigChange={handleLanguageConfigChange}
      />

      {/* Script Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <CardTitle>Script Configuration</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowScriptEditor(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <label className="text-sm font-medium text-gray-500">Current Script</label>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 line-clamp-3">
                {configuration.script || 'No script configured'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Made Today</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No calls made yet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              No data available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              No data available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modals */}
      <AgentProfileEditModal
        isOpen={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        businessInfo={configuration.businessInfo}
        onSave={handleProfileSave}
      />

      <VoicePersonalityEditModal
        isOpen={showVoiceEdit}
        onClose={() => setShowVoiceEdit(false)}
        voice={configuration.voice}
        personality={configuration.personality}
        onSave={handleVoicePersonalitySave}
      />

      <UnifiedScriptEditor
        isOpen={showScriptEditor}
        onClose={() => setShowScriptEditor(false)}
        initialScript={configuration.script || ''}
        initialPersonality={configuration.personality}
        initialUseSmallTalk={false}
        initialHandleObjections={false}
        onSave={handleScriptSave}
      />
    </div>
  );
};

export default AgentOverview;
