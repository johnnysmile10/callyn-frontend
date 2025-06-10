
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Volume2, Globe, Play, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import EnhancedLanguageSelector from "../language/EnhancedLanguageSelector";
import LanguagePreviewSystem from "../language/LanguagePreviewSystem";
import { LanguageConfig } from "../outreach/types";

const VoiceLanguageTab = () => {
  const { userAgent, onboardingData, setOnboardingData } = useAuth();
  const { toast } = useToast();
  
  // Get current settings from agent or onboarding data
  const currentVoice = userAgent?.configuration?.voice || onboardingData?.selectedVoice || "Aria";
  const currentLanguage = onboardingData?.languageConfig?.primaryLanguage || "en";
  const currentSpeed = onboardingData?.speakingSpeed || 1.0;
  const currentEnthusiasm = onboardingData?.enthusiasm || 5;

  const [selectedVoice, setSelectedVoice] = useState(currentVoice);
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>({
    primaryLanguage: currentLanguage,
    secondaryLanguages: onboardingData?.languageConfig?.secondaryLanguages || [],
    voiceId: onboardingData?.languageConfig?.voiceId || "9BWtsMINqrJLrRacOk9x",
    model: onboardingData?.languageConfig?.model || "eleven_multilingual_v2",
    tone: onboardingData?.languageConfig?.tone || "professional",
    formality: onboardingData?.languageConfig?.formality || "balanced",
    culturalAdaptation: onboardingData?.languageConfig?.culturalAdaptation || false,
    localExpressions: onboardingData?.languageConfig?.localExpressions || false
  });
  const [speakingSpeed, setSpeakingSpeed] = useState([currentSpeed]);
  const [enthusiasm, setEnthusiasm] = useState([currentEnthusiasm]);
  const [isPlaying, setIsPlaying] = useState(false);

  const voices = [
    { id: "Aria", name: "Aria", gender: "female", accent: "American" },
    { id: "Roger", name: "Roger", gender: "male", accent: "American" },
    { id: "Sarah", name: "Sarah", gender: "female", accent: "British" },
    { id: "Charlie", name: "Charlie", gender: "male", accent: "British" },
    { id: "Laura", name: "Laura", gender: "female", accent: "American" },
    { id: "Liam", name: "Liam", gender: "male", accent: "Irish" }
  ];

  const handleVoiceTest = () => {
    setIsPlaying(true);
    // Simulate voice playback
    setTimeout(() => setIsPlaying(false), 3000);
    toast({
      title: "Voice Preview",
      description: `Playing sample with ${selectedVoice} voice at ${speakingSpeed[0]}x speed`,
    });
  };

  const handleLanguageConfigChange = (newConfig: LanguageConfig) => {
    setLanguageConfig(newConfig);
  };

  const handleSaveSettings = () => {
    const updatedData = {
      ...onboardingData,
      selectedVoice,
      speakingSpeed: speakingSpeed[0],
      enthusiasm: enthusiasm[0],
      languageConfig
    };

    setOnboardingData(updatedData);
    
    toast({
      title: "Settings Saved",
      description: "Voice and language settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <EnhancedLanguageSelector
        config={languageConfig}
        onConfigChange={handleLanguageConfigChange}
        showVoiceSelection={true}
      />

      <LanguagePreviewSystem
        selectedLanguage={languageConfig.primaryLanguage}
        selectedVoice={languageConfig.voiceId}
        onLanguageChange={(language) => 
          setLanguageConfig(prev => ({ ...prev, primaryLanguage: language }))
        }
        onVoiceChange={(voiceId) => 
          setLanguageConfig(prev => ({ ...prev, voiceId }))
        }
      />

      {/* Voice Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-blue-600" />
            Voice Selection
          </CardTitle>
          <CardDescription>
            Choose the voice that represents your brand
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedVoice === voice.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedVoice(voice.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{voice.name}</span>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs capitalize">
                      {voice.gender}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {voice.accent}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVoiceTest();
                  }}
                  disabled={isPlaying}
                >
                  <Play className="mr-1 h-3 w-3" />
                  {isPlaying && selectedVoice === voice.id ? 'Playing...' : 'Test Voice'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Voice Settings
          </CardTitle>
          <CardDescription>
            Fine-tune how your agent speaks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="speaking-speed">
              Speaking Speed: {speakingSpeed[0]}x
            </Label>
            <Slider
              id="speaking-speed"
              min={0.5}
              max={2.0}
              step={0.1}
              value={speakingSpeed}
              onValueChange={setSpeakingSpeed}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slower (0.5x)</span>
              <span>Normal (1.0x)</span>
              <span>Faster (2.0x)</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="enthusiasm">
              Enthusiasm Level: {enthusiasm[0]}/10
            </Label>
            <Slider
              id="enthusiasm"
              min={1}
              max={10}
              step={1}
              value={enthusiasm}
              onValueChange={setEnthusiasm}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Calm & Professional</span>
              <span>Energetic & Enthusiastic</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          Save Voice & Language Settings
        </Button>
      </div>
    </div>
  );
};

export default VoiceLanguageTab;
