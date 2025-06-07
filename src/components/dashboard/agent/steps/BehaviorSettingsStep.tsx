
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Brain, ArrowRight, Zap, Shield, Clock } from "lucide-react";

interface BehaviorSettingsStepProps {
  onComplete: (data: any) => void;
  initialData: any;
  isCompleted: boolean;
}

const BehaviorSettingsStep = ({ onComplete, initialData, isCompleted }: BehaviorSettingsStepProps) => {
  const [settings, setSettings] = useState({
    conversationStyle: initialData.behavior?.conversationStyle || "balanced",
    persistence: initialData.behavior?.persistence || [3],
    responseSpeed: initialData.behavior?.responseSpeed || [2],
    objectionHandling: initialData.behavior?.objectionHandling || "",
    transferRules: initialData.behavior?.transferRules || "",
    maxCallDuration: initialData.behavior?.maxCallDuration || [10],
    followUpEnabled: initialData.behavior?.followUpEnabled || true,
    sentimentAnalysis: initialData.behavior?.sentimentAnalysis || true,
    ...initialData.behavior
  });

  const handleSliderChange = (key: string, value: number[]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSwitchChange = (key: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onComplete(settings);
  };

  const conversationStyles = [
    { value: "friendly", label: "Friendly & Conversational", description: "Warm, personable approach" },
    { value: "professional", label: "Professional & Direct", description: "Business-focused, efficient" },
    { value: "consultative", label: "Consultative & Advisory", description: "Expert guidance approach" },
    { value: "balanced", label: "Balanced & Adaptive", description: "Adapts to prospect's style" }
  ];

  const getPersistenceLabel = (value: number) => {
    const labels = ["Gentle", "Moderate", "Standard", "Assertive", "Very Assertive"];
    return labels[value - 1] || "Standard";
  };

  const getSpeedLabel = (value: number) => {
    const labels = ["Slow & Deliberate", "Measured", "Natural", "Quick", "Very Fast"];
    return labels[value - 1] || "Natural";
  };

  const isFormValid = settings.objectionHandling.trim() && settings.transferRules.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          Step 3: Behavior & Intelligence
        </CardTitle>
        <CardDescription>
          Configure your agent's personality, responses, and conversation intelligence
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Conversation Style */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Conversation Style</Label>
          <Select value={settings.conversationStyle} onValueChange={(value) => handleInputChange("conversationStyle", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose conversation style" />
            </SelectTrigger>
            <SelectContent>
              {conversationStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  <div>
                    <div className="font-medium">{style.label}</div>
                    <div className="text-sm text-gray-500">{style.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Behavior Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Persistence Level</Label>
              <span className="text-sm text-blue-600 font-medium">{getPersistenceLabel(settings.persistence[0])}</span>
            </div>
            <Slider
              value={settings.persistence}
              onValueChange={(value) => handleSliderChange("persistence", value)}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-600">How persistent should your agent be with follow-ups?</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Response Speed</Label>
              <span className="text-sm text-blue-600 font-medium">{getSpeedLabel(settings.responseSpeed[0])}</span>
            </div>
            <Slider
              value={settings.responseSpeed}
              onValueChange={(value) => handleSliderChange("responseSpeed", value)}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-600">How quickly should your agent respond?</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Max Call Duration (minutes)</Label>
              <span className="text-sm text-blue-600 font-medium">{settings.maxCallDuration[0]} min</span>
            </div>
            <Slider
              value={settings.maxCallDuration}
              onValueChange={(value) => handleSliderChange("maxCallDuration", value)}
              max={30}
              min={5}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-600">Maximum duration for each call</p>
          </div>
        </div>

        {/* Objection Handling */}
        <div className="space-y-2">
          <Label htmlFor="objectionHandling">Objection Handling Strategy</Label>
          <Textarea
            id="objectionHandling"
            value={settings.objectionHandling}
            onChange={(e) => handleInputChange("objectionHandling", e.target.value)}
            placeholder="How should your agent handle common objections like 'not interested', 'too expensive', 'bad timing'?"
            className="min-h-20"
          />
        </div>

        {/* Transfer Rules */}
        <div className="space-y-2">
          <Label htmlFor="transferRules">Transfer to Human Rules</Label>
          <Textarea
            id="transferRules"
            value={settings.transferRules}
            onChange={(e) => handleInputChange("transferRules", e.target.value)}
            placeholder="When should your agent transfer to a human? (e.g., technical questions, pricing negotiations, complaints)"
            className="min-h-20"
          />
        </div>

        {/* Advanced Features */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Advanced Features</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Smart Follow-ups</div>
                    <div className="text-xs text-gray-600">Automatic scheduling based on prospect responses</div>
                  </div>
                </div>
                <Switch
                  checked={settings.followUpEnabled}
                  onCheckedChange={(checked) => handleSwitchChange("followUpEnabled", checked)}
                />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Sentiment Analysis</div>
                    <div className="text-xs text-gray-600">Real-time mood detection and adaptation</div>
                  </div>
                </div>
                <Switch
                  checked={settings.sentimentAnalysis}
                  onCheckedChange={(checked) => handleSwitchChange("sentimentAnalysis", checked)}
                />
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit} size="lg" disabled={!isFormValid}>
            Continue to Voice Test
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BehaviorSettingsStep;
