
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Volume2, 
  Mic, 
  Settings as SettingsIcon, 
  Clock, 
  Play,
  Pause,
  Phone,
  Shield,
  Zap,
  HeadphonesIcon,
  Waves
} from "lucide-react";

interface AgentConfig {
  voiceId: string;
  language: string;
  tone: string;
  speakingRate: number;
  volume: number;
  maxCallDuration: number;
  responseSpeed: number;
  patience: number;
  enableCallRecording: boolean;
  enableObjectionHandling: boolean;
  enableTransferRules: boolean;
  enableFillerWords: boolean;
  enableBackgroundNoise: boolean;
  maxDailyCalls: number;
  callHours: {
    start: string;
    end: string;
  };
  transcriptionEnabled: boolean;
  sentimentAnalysis: boolean;
  autoDisconnectSilence: boolean;
  silenceTimeout: number;
}

const AgentSettings = () => {
  const [config, setConfig] = useState<AgentConfig>({
    voiceId: "9BWtsMINqrJLrRacOk9x", // Aria
    language: "en",
    tone: "professional",
    speakingRate: 1.0,
    volume: 0.8,
    maxCallDuration: 10,
    responseSpeed: 1.2,
    patience: 3.0,
    enableCallRecording: true,
    enableObjectionHandling: true,
    enableTransferRules: false,
    enableFillerWords: true,
    enableBackgroundNoise: false,
    maxDailyCalls: 100,
    callHours: {
      start: "09:00",
      end: "17:00"
    },
    transcriptionEnabled: true,
    sentimentAnalysis: true,
    autoDisconnectSilence: true,
    silenceTimeout: 15
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadExistingSettings();
  }, []);

  const loadExistingSettings = () => {
    const savedConfig = localStorage.getItem('agent_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('agent_config', JSON.stringify(config));
      toast({
        title: "Settings Saved",
        description: "Your agent configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = (key: keyof AgentConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateCallHours = (field: 'start' | 'end', value: string) => {
    setConfig(prev => ({
      ...prev,
      callHours: { ...prev.callHours, [field]: value }
    }));
  };

  const playVoiceDemo = async (voiceId: string) => {
    setIsPlaying(true);
    setSelectedVoice(voiceId);
    
    try {
      // Simulate voice demo playback
      setTimeout(() => {
        setIsPlaying(false);
        setSelectedVoice("");
        toast({
          title: "Voice Demo",
          description: "This is how your agent will sound with the selected voice.",
        });
      }, 3000);
    } catch (error) {
      setIsPlaying(false);
      setSelectedVoice("");
      toast({
        title: "Demo Failed",
        description: "Could not play voice demo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const voices = [
    { 
      id: "9BWtsMINqrJLrRacOk9x", 
      name: "Aria", 
      description: "Professional female voice",
      accent: "American",
      category: "Professional"
    },
    { 
      id: "CwhRBWXzGAHq8TQ4Fs17", 
      name: "Roger", 
      description: "Professional male voice",
      accent: "American", 
      category: "Professional"
    },
    { 
      id: "EXAVITQu4vr4xnSDxMaL", 
      name: "Sarah", 
      description: "Warm female voice",
      accent: "British",
      category: "Warm"
    },
    { 
      id: "IKne3meq5aSn9XLyUdCD", 
      name: "Charlie", 
      description: "Friendly male voice",
      accent: "American",
      category: "Friendly"
    },
    { 
      id: "TX3LPaxmHKxFdv7VOQHJ", 
      name: "Liam", 
      description: "Clear male voice",
      accent: "Australian",
      category: "Clear"
    },
  ];

  const getResponseSpeedLabel = (speed: number) => {
    if (speed < 1) return "Slower";
    if (speed > 1.5) return "Very Fast";
    if (speed > 1.2) return "Fast";
    return "Normal";
  };

  const getPatienceLabel = (patience: number) => {
    if (patience < 2) return "Impatient";
    if (patience > 4) return "Very Patient";
    if (patience > 3) return "Patient";
    return "Normal";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Advanced Agent Settings</h2>
        <p className="text-muted-foreground">
          Fine-tune voice, behavior, and call management settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice & Audio Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Voice & Audio Settings
            </CardTitle>
            <CardDescription>
              Customize your agent's voice and speech patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Voice Selection with Demo */}
            <div className="space-y-3">
              <Label htmlFor="voice">Voice Selection</Label>
              <div className="space-y-2">
                {voices.map((voice) => (
                  <div key={voice.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{voice.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {voice.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {voice.accent}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{voice.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playVoiceDemo(voice.id)}
                        disabled={isPlaying}
                      >
                        {isPlaying && selectedVoice === voice.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Switch
                        checked={config.voiceId === voice.id}
                        onCheckedChange={(checked) => {
                          if (checked) updateConfig('voiceId', voice.id);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language & Tone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={config.language} onValueChange={(value) => updateConfig('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Conversation Tone</Label>
                <Select value={config.tone} onValueChange={(value) => updateConfig('tone', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="energetic">Energetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Speech Controls */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Speaking Rate: {config.speakingRate}x</Label>
                <Slider
                  value={[config.speakingRate]}
                  onValueChange={(value) => updateConfig('speakingRate', value[0])}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Adjust how fast your agent speaks
                </p>
              </div>

              <div className="space-y-2">
                <Label>Volume: {Math.round(config.volume * 100)}%</Label>
                <Slider
                  value={[config.volume]}
                  onValueChange={(value) => updateConfig('volume', value[0])}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Audio Features */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Waves className="h-4 w-4" />
                    Natural Filler Words
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Add "um", "uh", etc. for natural speech
                  </p>
                </div>
                <Switch
                  checked={config.enableFillerWords}
                  onCheckedChange={(checked) => updateConfig('enableFillerWords', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <HeadphonesIcon className="h-4 w-4" />
                    Background Noise Reduction
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Filter ambient sounds during calls
                  </p>
                </div>
                <Switch
                  checked={config.enableBackgroundNoise}
                  onCheckedChange={(checked) => updateConfig('enableBackgroundNoise', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response & Behavior Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Response & Behavior
            </CardTitle>
            <CardDescription>
              Control how your agent responds and behaves during calls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Response Timing */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>
                  Response Speed: {getResponseSpeedLabel(config.responseSpeed)} ({config.responseSpeed}x)
                </Label>
                <Slider
                  value={[config.responseSpeed]}
                  onValueChange={(value) => updateConfig('responseSpeed', value[0])}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  How quickly agent responds after user stops speaking
                </p>
              </div>

              <div className="space-y-2">
                <Label>
                  Patience Level: {getPatienceLabel(config.patience)} ({config.patience}s)
                </Label>
                <Slider
                  value={[config.patience]}
                  onValueChange={(value) => updateConfig('patience', value[0])}
                  min={1}
                  max={6}
                  step={0.5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  How long agent waits for user responses before prompting
                </p>
              </div>
            </div>

            {/* Behavioral Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Smart Objection Handling</Label>
                  <p className="text-sm text-muted-foreground">
                    AI-powered responses to common objections
                  </p>
                </div>
                <Switch
                  checked={config.enableObjectionHandling}
                  onCheckedChange={(checked) => updateConfig('enableObjectionHandling', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Human Transfer</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow agent to transfer difficult calls
                  </p>
                </div>
                <Switch
                  checked={config.enableTransferRules}
                  onCheckedChange={(checked) => updateConfig('enableTransferRules', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Disconnect on Silence</Label>
                  <p className="text-sm text-muted-foreground">
                    End call after prolonged silence
                  </p>
                </div>
                <Switch
                  checked={config.autoDisconnectSilence}
                  onCheckedChange={(checked) => updateConfig('autoDisconnectSilence', checked)}
                />
              </div>
            </div>

            {config.autoDisconnectSilence && (
              <div className="space-y-2">
                <Label>Silence Timeout: {config.silenceTimeout}s</Label>
                <Slider
                  value={[config.silenceTimeout]}
                  onValueChange={(value) => updateConfig('silenceTimeout', value[0])}
                  min={5}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Call Management Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call Management & Limits
          </CardTitle>
          <CardDescription>
            Configure call duration, scheduling, and daily limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Call Duration */}
            <div className="space-y-2">
              <Label>Max Call Duration: {config.maxCallDuration} min</Label>
              <Slider
                value={[config.maxCallDuration]}
                onValueChange={(value) => updateConfig('maxCallDuration', value[0])}
                min={1}
                max={60}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Calls auto-end after this duration
              </p>
            </div>

            {/* Daily Call Limit */}
            <div className="space-y-2">
              <Label htmlFor="daily-calls">Daily Call Limit</Label>
              <Input
                id="daily-calls"
                type="number"
                value={config.maxDailyCalls}
                onChange={(e) => updateConfig('maxDailyCalls', parseInt(e.target.value) || 0)}
                min={1}
                max={1000}
              />
              <p className="text-xs text-muted-foreground">
                Maximum calls per day
              </p>
            </div>

            {/* Call Hours */}
            <div className="space-y-2">
              <Label>Operating Hours</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  value={config.callHours.start}
                  onChange={(e) => updateCallHours('start', e.target.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="time"
                  value={config.callHours.end}
                  onChange={(e) => updateCallHours('end', e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Agent only calls during these hours
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recording & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Recording & Analytics
          </CardTitle>
          <CardDescription>
            Configure call recording, transcription, and analysis features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Call Recording</Label>
                  <p className="text-sm text-muted-foreground">
                    Record all calls for quality and training
                  </p>
                </div>
                <Switch
                  checked={config.enableCallRecording}
                  onCheckedChange={(checked) => updateConfig('enableCallRecording', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Live Transcription</Label>
                  <p className="text-sm text-muted-foreground">
                    Real-time speech-to-text conversion
                  </p>
                </div>
                <Switch
                  checked={config.transcriptionEnabled}
                  onCheckedChange={(checked) => updateConfig('transcriptionEnabled', checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sentiment Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Track conversation mood and engagement
                  </p>
                </div>
                <Switch
                  checked={config.sentimentAnalysis}
                  onCheckedChange={(checked) => updateConfig('sentimentAnalysis', checked)}
                />
              </div>

              {!config.enableCallRecording && (
                <Alert>
                  <AlertDescription>
                    Some features require call recording to be enabled for full functionality.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AgentSettings;
