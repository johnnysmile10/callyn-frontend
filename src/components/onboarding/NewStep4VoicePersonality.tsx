
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, Play, Volume2, ArrowRight, ArrowLeft, Settings } from "lucide-react";

interface NewStep4VoicePersonalityProps {
  handleNext: () => void;
  handleBack: () => void;
  onDataUpdate: (data: any) => void;
  initialData: any;
}

const NewStep4VoicePersonality = ({ handleNext, handleBack, onDataUpdate, initialData }: NewStep4VoicePersonalityProps) => {
  const [selectedVoice, setSelectedVoice] = useState(initialData.selectedVoice || "sarah");
  const [personality, setPersonality] = useState(initialData.personality || "professional");
  const [speakingSpeed, setSpeakingSpeed] = useState(initialData.speakingSpeed || [1.0]);
  const [enthusiasm, setEnthusiasm] = useState(initialData.enthusiasm || [0.7]);
  const [useSmallTalk, setUseSmallTalk] = useState(initialData.useSmallTalk ?? true);
  const [handleObjections, setHandleObjections] = useState(initialData.handleObjections ?? true);

  const voices = [
    { id: "sarah", name: "Sarah", description: "Professional, warm female voice", accent: "American" },
    { id: "james", name: "James", description: "Confident, authoritative male voice", accent: "American" },
    { id: "emma", name: "Emma", description: "Friendly, approachable female voice", accent: "British" },
    { id: "michael", name: "Michael", description: "Smooth, persuasive male voice", accent: "American" }
  ];

  const personalities = [
    { id: "professional", name: "Professional", description: "Formal, business-focused approach" },
    { id: "friendly", name: "Friendly", description: "Warm, conversational, and approachable" },
    { id: "consultative", name: "Consultative", description: "Advisory, helpful, solution-oriented" },
    { id: "direct", name: "Direct", description: "Straight to the point, results-focused" }
  ];

  const handleVoiceTest = (voiceId: string) => {
    // In a real implementation, this would play a voice sample
    // For demo purposes, we'll just show a message
  };

  const handleContinue = () => {
    const data = {
      selectedVoice,
      personality,
      speakingSpeed: speakingSpeed[0],
      enthusiasm: enthusiasm[0],
      useSmallTalk,
      handleObjections
    };

    onDataUpdate(data);
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Mic className="h-6 w-6 text-blue-600" />
            Voice & Personality
          </CardTitle>
          <CardDescription className="text-lg">
            Choose how Callyn sounds and behaves during calls. You can always adjust this later.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Voice Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Your Agent's Voice</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {voices.map((voice) => (
                <div
                  key={voice.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedVoice === voice.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{voice.name}</h4>
                    <Badge variant="outline">{voice.accent}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{voice.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVoiceTest(voice.id);
                    }}
                    className="w-full"
                  >
                    <Play className="h-3 w-3 mr-2" />
                    Test Voice
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Personality Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Communication Style</h3>
            <Select value={personality} onValueChange={setPersonality}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select communication style" />
              </SelectTrigger>
              <SelectContent>
                {personalities.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    <div>
                      <div className="font-medium">{style.name}</div>
                      <div className="text-sm text-gray-500">{style.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Voice Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label className="text-base font-medium mb-4 block">Speaking Speed</Label>
              <div className="space-y-2">
                <Slider
                  value={speakingSpeed}
                  onValueChange={setSpeakingSpeed}
                  max={1.5}
                  min={0.7}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Enthusiasm Level</Label>
              <div className="space-y-2">
                <Slider
                  value={enthusiasm}
                  onValueChange={setEnthusiasm}
                  max={1.0}
                  min={0.3}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Reserved</span>
                  <span>Balanced</span>
                  <span>Energetic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Behavior Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Call Behavior</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-medium">Use Small Talk</Label>
                  <p className="text-sm text-gray-600">Start calls with brief, friendly conversation</p>
                </div>
                <Switch
                  checked={useSmallTalk}
                  onCheckedChange={setUseSmallTalk}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-medium">Handle Objections</Label>
                  <p className="text-sm text-gray-600">Automatically respond to common objections</p>
                </div>
                <Switch
                  checked={handleObjections}
                  onCheckedChange={setHandleObjections}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-medium text-blue-900 mb-3">🎯 Voice Preview</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Voice:</strong> {voices.find(v => v.id === selectedVoice)?.name} ({voices.find(v => v.id === selectedVoice)?.accent})</p>
              <p><strong>Style:</strong> {personalities.find(p => p.id === personality)?.name}</p>
              <p><strong>Speed:</strong> {speakingSpeed[0]}x</p>
              <p><strong>Energy:</strong> {Math.round(enthusiasm[0] * 100)}%</p>
            </div>
            <Button variant="outline" className="mt-4" onClick={() => handleVoiceTest(selectedVoice)}>
              <Volume2 className="h-4 w-4 mr-2" />
              Test Full Sample
            </Button>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleBack} size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleContinue} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Almost Done!
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewStep4VoicePersonality;
