import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  Volume2, 
  Play, 
  Settings, 
  Mic,
  Zap,
  Heart,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/context";
import { getLanguageByCode, getVoicesForLanguage } from "../language/languageConfig";
import { LanguageConfig } from "../outreach/types";

const LanguageVoiceSettings = () => {
  const { onboardingData } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>({
    primaryLanguage: onboardingData?.languageConfig?.primaryLanguage || 'en',
    secondaryLanguages: onboardingData?.languageConfig?.secondaryLanguages || [],
    tone: onboardingData?.languageConfig?.tone || 'professional',
    formality: onboardingData?.languageConfig?.formality || 'balanced',
    culturalAdaptation: onboardingData?.languageConfig?.culturalAdaptation || true,
    localExpressions: onboardingData?.languageConfig?.localExpressions || false,
    voiceId: onboardingData?.selectedVoice || '9BWtsMINqrJLrRacOk9x'
  });

  const [voiceSettings, setVoiceSettings] = useState({
    speakingSpeed: onboardingData?.speakingSpeed || 1,
    enthusiasm: onboardingData?.enthusiasm || 0.5,
    stability: 0.7,
    clarity: 0.8
  });

  const primaryLanguage = getLanguageByCode(languageConfig.primaryLanguage);
  const availableVoices = getVoicesForLanguage(languageConfig.primaryLanguage);
  const selectedVoice = availableVoices.find(v => v.id === languageConfig.voiceId);

  const handlePlayPreview = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const updateLanguageConfig = (updates: Partial<LanguageConfig>) => {
    setLanguageConfig(prev => ({ ...prev, ...updates }));
  };

  const updateVoiceSettings = (updates: Partial<typeof voiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...updates }));
  };

  const handleSaveSettings = () => {
    // In real implementation, this would save to backend
    console.log('Saving language and voice settings:', { languageConfig, voiceSettings });
  };

  return (
    <div className="space-y-6">
      {/* Current Settings Overview */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <CheckCircle className="h-5 w-5" />
            Current Voice Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-blue-800">Language</Label>
              <div className="flex items-center gap-2 text-blue-900">
                <span>{primaryLanguage?.flag}</span>
                <span>{primaryLanguage?.name}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-blue-800">Voice</Label>
              <div className="text-blue-900">{selectedVoice?.name}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-blue-800">Style</Label>
              <div className="text-blue-900 capitalize">{languageConfig.tone}</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <Button 
              onClick={handlePlayPreview}
              disabled={isPlaying}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              <Play className={`mr-2 h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
              {isPlaying ? 'Playing Preview...' : 'Preview Voice'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Voice Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-blue-600" />
            Voice Selection
          </CardTitle>
          <CardDescription>
            Choose the voice and language for your AI agent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Language</Label>
              <Select 
                value={languageConfig.primaryLanguage} 
                onValueChange={(value) => updateLanguageConfig({ primaryLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="fr">🇫🇷 French</SelectItem>
                  <SelectItem value="de">🇩🇪 German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Voice</Label>
              <Select 
                value={languageConfig.voiceId} 
                onValueChange={(value) => updateLanguageConfig({ voiceId: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      <div className="flex items-center gap-2">
                        <span>{voice.name}</span>
                        <Badge variant="outline" className="capitalize">
                          {voice.gender}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Communication Tone</Label>
              <Select 
                value={languageConfig.tone} 
                onValueChange={(value: any) => updateLanguageConfig({ tone: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formality Level</Label>
              <Select 
                value={languageConfig.formality} 
                onValueChange={(value: any) => updateLanguageConfig({ formality: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="informal">Informal</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Tuning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Voice Tuning
          </CardTitle>
          <CardDescription>
            Fine-tune your agent's speaking style and personality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  Speaking Speed
                </Label>
                <span className="text-sm text-gray-600">{voiceSettings.speakingSpeed}x</span>
              </div>
              <Slider
                value={[voiceSettings.speakingSpeed]}
                onValueChange={([value]) => updateVoiceSettings({ speakingSpeed: value })}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Slower</span>
                <span>Normal</span>
                <span>Faster</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Enthusiasm Level
                </Label>
                <span className="text-sm text-gray-600">{Math.round(voiceSettings.enthusiasm * 100)}%</span>
              </div>
              <Slider
                value={[voiceSettings.enthusiasm]}
                onValueChange={([value]) => updateVoiceSettings({ enthusiasm: value })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Monotone</span>
                <span>Balanced</span>
                <span>Energetic</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-blue-500" />
                  Voice Stability
                </Label>
                <span className="text-sm text-gray-600">{Math.round(voiceSettings.stability * 100)}%</span>
              </div>
              <Slider
                value={[voiceSettings.stability]}
                onValueChange={([value]) => updateVoiceSettings({ stability: value })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            Cultural Adaptation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Cultural Context Awareness</Label>
              <p className="text-sm text-muted-foreground">
                Adapt communication style based on cultural context
              </p>
            </div>
            <Switch 
              checked={languageConfig.culturalAdaptation}
              onCheckedChange={(checked) => updateLanguageConfig({ culturalAdaptation: checked })}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Local Expressions</Label>
              <p className="text-sm text-muted-foreground">
                Use region-specific phrases and expressions
              </p>
            </div>
            <Switch 
              checked={languageConfig.localExpressions}
              onCheckedChange={(checked) => updateLanguageConfig({ localExpressions: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg">
          <CheckCircle className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default LanguageVoiceSettings;
