
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Globe, 
  Mic, 
  FileText, 
  Settings, 
  Play, 
  Pause, 
  Edit3, 
  BarChart3,
  Phone,
  Clock,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getLanguageByCode, getVoicesForLanguage } from "../language/languageConfig";
import LanguageConfigPanel from "./LanguageConfigPanel";
import { LanguageConfig } from "../outreach/types";

const YourAgentSection = () => {
  const { userAgent, onboardingData } = useAuth();
  const [isAgentLive, setIsAgentLive] = useState(false);
  const [showLanguageConfig, setShowLanguageConfig] = useState(false);
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>({
    primaryLanguage: onboardingData?.languageConfig?.primaryLanguage || onboardingData?.selectedVoice ? 'en' : 'en',
    secondaryLanguages: [],
    tone: 'professional',
    formality: 'balanced',
    culturalAdaptation: true,
    localExpressions: false,
    voiceId: onboardingData?.selectedVoice || '9BWtsMINqrJLrRacOk9x'
  });

  const primaryLanguage = getLanguageByCode(languageConfig.primaryLanguage);
  const selectedVoice = languageConfig.voiceId ? 
    getVoicesForLanguage(languageConfig.primaryLanguage).find(v => v.id === languageConfig.voiceId) : 
    null;

  const handleGoLiveToggle = (enabled: boolean) => {
    setIsAgentLive(enabled);
    // In real implementation, this would enable/disable the agent
    console.log(`Agent ${enabled ? 'activated' : 'deactivated'}`);
  };

  if (!userAgent && !onboardingData) {
    return (
      <div className="text-center py-12">
        <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Agent Found</h2>
        <p className="text-gray-600 mb-6">Complete the onboarding process to create your AI agent.</p>
        <Button onClick={() => window.location.href = '/onboarding'}>
          Start Onboarding
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Agent Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your AI Agent</h1>
          <p className="text-gray-600 mt-1">
            {onboardingData?.businessName || userAgent?.configuration?.businessInfo?.name || "Your Business"}'s AI Sales Representative
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isAgentLive ? "default" : "secondary"} className="px-3 py-1">
            {isAgentLive ? "Live" : "Offline"}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Go Live</span>
            <Switch 
              checked={isAgentLive} 
              onCheckedChange={handleGoLiveToggle}
            />
          </div>
        </div>
      </div>

      {/* Agent Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Agent Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <CardTitle>Agent Profile</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Business Name</label>
                  <p className="text-sm text-gray-900">{onboardingData?.businessName || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Industry</label>
                  <p className="text-sm text-gray-900">{onboardingData?.industry || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Agent Personality</label>
                  <p className="text-sm text-gray-900 capitalize">{onboardingData?.personality || "Professional"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Primary Language</label>
                  <div className="flex items-center gap-2">
                    <span>{primaryLanguage?.flag}</span>
                    <span className="text-sm text-gray-900">{primaryLanguage?.name}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language & Voice Configuration */}
          <LanguageConfigPanel 
            config={languageConfig}
            onConfigChange={setLanguageConfig}
          />

          {/* Script Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <CardTitle>Script Overview</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Script
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Script Source</label>
                <p className="text-sm text-gray-900">
                  {onboardingData?.scriptMethod === 'website' ? `Website: ${onboardingData.websiteUrl}` :
                   onboardingData?.scriptMethod === 'upload' ? `File: ${onboardingData.uploadedFile?.name}` :
                   'Custom script'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Call Behavior</label>
                <div className="flex gap-4 text-sm text-gray-900">
                  <span>Speed: {onboardingData?.speakingSpeed || 1}x</span>
                  <span>Energy: {Math.round((onboardingData?.enthusiasm || 0.5) * 100)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Total Calls</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">0%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">0m</div>
                  <div className="text-xs text-gray-600">Avg Duration</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Test Call
              </Button>
              <Button className="w-full" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Agent Settings
              </Button>
              <Button className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                Start Campaign
              </Button>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Free Trial</span>
              </div>
              <p className="text-xs text-amber-700 mb-3">
                45 minutes remaining. Upgrade for unlimited calling.
              </p>
              <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default YourAgentSection;
