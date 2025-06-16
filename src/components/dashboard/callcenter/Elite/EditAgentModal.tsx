
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Bot, Save, Volume2, Settings, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AgentSettings {
  name: string;
  voice: string;
  language: string;
  speakingSpeed: number;
  enthusiasm: number;
  personality: string;
  useSmallTalk: boolean;
  handleObjections: boolean;
}

interface EditAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSettings?: Partial<AgentSettings>;
  onSave: (settings: AgentSettings) => void;
}

const VOICE_OPTIONS = [
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria", gender: "Female" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", gender: "Male" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", gender: "Female" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", gender: "Female" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", gender: "Male" },
];

const PERSONALITY_OPTIONS = [
  { 
    id: "professional", 
    name: "Professional", 
    description: "Formal, courteous, and business-focused",
    icon: "👔"
  },
  { 
    id: "friendly", 
    name: "Friendly", 
    description: "Warm, approachable, and conversational",
    icon: "😊"
  },
  { 
    id: "enthusiastic", 
    name: "Enthusiastic", 
    description: "Energetic, passionate, and motivating",
    icon: "🚀"
  },
  { 
    id: "consultative", 
    name: "Consultative", 
    description: "Advisory, helpful, and solution-oriented",
    icon: "🤝"
  }
];

const EditAgentModal = ({ isOpen, onClose, initialSettings = {}, onSave }: EditAgentModalProps) => {
  const [settings, setSettings] = useState<AgentSettings>({
    name: initialSettings.name || "Sales Agent",
    voice: initialSettings.voice || "9BWtsMINqrJLrRacOk9x",
    language: initialSettings.language || "en",
    speakingSpeed: initialSettings.speakingSpeed || 1.0,
    enthusiasm: initialSettings.enthusiasm || 5,
    personality: initialSettings.personality || "professional",
    useSmallTalk: initialSettings.useSmallTalk || false,
    handleObjections: initialSettings.handleObjections || false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = <K extends keyof AgentSettings>(key: K, value: AgentSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(settings);
    setHasChanges(false);
    toast({
      title: "Agent Settings Saved",
      description: "Your agent configuration has been updated successfully.",
    });
  };

  const testVoice = () => {
    const selectedVoice = VOICE_OPTIONS.find(v => v.id === settings.voice);
    toast({
      title: "Voice Test",
      description: `Testing ${selectedVoice?.name} voice at ${settings.speakingSpeed}x speed...`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Edit Agent Configuration
            {hasChanges && <Badge variant="outline" className="text-orange-600">Unsaved Changes</Badge>}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="voice">Voice & Language</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Agent Identity
                </CardTitle>
                <CardDescription>
                  Configure your agent's basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input
                    id="agent-name"
                    value={settings.name}
                    onChange={(e) => updateSetting('name', e.target.value)}
                    placeholder="Enter agent name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Primary Language</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-blue-600" />
                  Voice Selection
                </CardTitle>
                <CardDescription>
                  Choose your agent's voice and speaking style
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Voice</Label>
                  <Select value={settings.voice} onValueChange={(value) => updateSetting('voice', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {VOICE_OPTIONS.map((voice) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            <span>{voice.name}</span>
                            <Badge variant="outline" className="capitalize">
                              {voice.gender}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline" onClick={testVoice} className="mt-2">
                    Test Voice
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label>Speaking Speed: {settings.speakingSpeed}x</Label>
                  <Slider
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    value={[settings.speakingSpeed]}
                    onValueChange={(value) => updateSetting('speakingSpeed', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Slower (0.5x)</span>
                    <span>Normal (1.0x)</span>
                    <span>Faster (2.0x)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Enthusiasm Level: {settings.enthusiasm}/10</Label>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[settings.enthusiasm]}
                    onValueChange={(value) => updateSetting('enthusiasm', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Calm & Professional</span>
                    <span>Energetic & Enthusiastic</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Personality & Behavior
                </CardTitle>
                <CardDescription>
                  Configure how your agent interacts with prospects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Personality Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {PERSONALITY_OPTIONS.map((p) => (
                      <div
                        key={p.id}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          settings.personality === p.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => updateSetting('personality', p.id)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{p.icon}</span>
                          <div className="font-medium text-sm">{p.name}</div>
                        </div>
                        <div className="text-xs text-gray-600">{p.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="small-talk">Enable Small Talk</Label>
                      <p className="text-sm text-gray-600">
                        Allow the agent to engage in brief small talk to build rapport
                      </p>
                    </div>
                    <Switch
                      id="small-talk"
                      checked={settings.useSmallTalk}
                      onCheckedChange={(checked) => updateSetting('useSmallTalk', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="handle-objections">Handle Objections</Label>
                      <p className="text-sm text-gray-600">
                        Enable the agent to respond to common objections and concerns
                      </p>
                    </div>
                    <Switch
                      id="handle-objections"
                      checked={settings.handleObjections}
                      onCheckedChange={(checked) => updateSetting('handleObjections', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            Agent: {settings.name} • Voice: {VOICE_OPTIONS.find(v => v.id === settings.voice)?.name}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAgentModal;
