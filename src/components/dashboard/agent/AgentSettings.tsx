
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Save, Volume2, Mic, Settings as SettingsIcon, Clock } from "lucide-react";

interface AgentConfig {
  voiceId: string;
  language: string;
  tone: string;
  speakingRate: number;
  volume: number;
  maxCallDuration: number;
  enableCallRecording: boolean;
  enableObjectionHandling: boolean;
  enableTransferRules: boolean;
}

const AgentSettings = () => {
  const [config, setConfig] = useState<AgentConfig>({
    voiceId: "9BWtsMINqrJLrRacOk9x", // Aria
    language: "en",
    tone: "professional",
    speakingRate: 1.0,
    volume: 0.8,
    maxCallDuration: 10,
    enableCallRecording: true,
    enableObjectionHandling: true,
    enableTransferRules: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing settings from localStorage
    const savedConfig = localStorage.getItem('agent_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

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

  const voices = [
    { id: "9BWtsMINqrJLrRacOk9x", name: "Aria", description: "Professional female voice" },
    { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", description: "Professional male voice" },
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", description: "Warm female voice" },
    { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", description: "Friendly male voice" },
    { id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam", description: "Clear male voice" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Agent Settings</h2>
        <p className="text-muted-foreground">
          Configure voice, behavior, and call management settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Voice Settings
            </CardTitle>
            <CardDescription>
              Customize your agent's voice and speech patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voice">Voice Selection</Label>
              <Select value={config.voiceId} onValueChange={(value) => updateConfig('voiceId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      <div>
                        <div className="font-medium">{voice.name}</div>
                        <div className="text-sm text-muted-foreground">{voice.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={config.tone} onValueChange={(value) => updateConfig('tone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
          </CardContent>
        </Card>

        {/* Call Behavior Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Call Behavior
            </CardTitle>
            <CardDescription>
              Configure how your agent handles calls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Max Call Duration: {config.maxCallDuration} minutes</Label>
              <Slider
                value={[config.maxCallDuration]}
                onValueChange={(value) => updateConfig('maxCallDuration', value[0])}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Calls will automatically end after this duration
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Call Recording</Label>
                <p className="text-sm text-muted-foreground">
                  Record calls for quality and training
                </p>
              </div>
              <Switch
                checked={config.enableCallRecording}
                onCheckedChange={(checked) => updateConfig('enableCallRecording', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Objection Handling</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered objection responses
                </p>
              </div>
              <Switch
                checked={config.enableObjectionHandling}
                onCheckedChange={(checked) => updateConfig('enableObjectionHandling', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Transfer Rules</Label>
                <p className="text-sm text-muted-foreground">
                  Allow agent to transfer calls to humans
                </p>
              </div>
              <Switch
                checked={config.enableTransferRules}
                onCheckedChange={(checked) => updateConfig('enableTransferRules', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Integration Settings
          </CardTitle>
          <CardDescription>
            Connect your agent with external tools and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Integration settings will be available in future updates.</p>
            <p className="text-sm">Configure CRM connections, webhooks, and third-party tools.</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AgentSettings;
