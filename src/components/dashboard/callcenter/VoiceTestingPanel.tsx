
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Volume2, 
  Play, 
  Square, 
  Download,
  Mic
} from "lucide-react";

const VoiceTestingPanel = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [testScript, setTestScript] = useState("Hello, this is your AI calling agent. I'm calling to discuss your recent inquiry about our services. How are you doing today?");
  const [selectedVoice, setSelectedVoice] = useState("alice");
  const [speed, setSpeed] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);

  const voices = [
    { id: "alice", name: "Alice", description: "Professional female voice" },
    { id: "brian", name: "Brian", description: "Friendly male voice" },
    { id: "charlotte", name: "Charlotte", description: "Warm female voice" },
    { id: "daniel", name: "Daniel", description: "Confident male voice" }
  ];

  const handlePlayTest = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleStopTest = () => {
    setIsPlaying(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Voice Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Voice Configuration
          </CardTitle>
          <CardDescription>
            Configure and test your agent's voice settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Voice Selection</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {voices.map(voice => (
                  <SelectItem key={voice.id} value={voice.id}>
                    <div>
                      <div className="font-medium">{voice.name}</div>
                      <div className="text-sm text-gray-500">{voice.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Speaking Speed: {speed[0]}x</Label>
              <Slider
                value={speed}
                onValueChange={setSpeed}
                min={0.5}
                max={2.0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Pitch: {pitch[0]}x</Label>
              <Slider
                value={pitch}
                onValueChange={setPitch}
                min={0.8}
                max={1.2}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {!isPlaying ? (
              <Button onClick={handlePlayTest} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Test Voice
              </Button>
            ) : (
              <Button onClick={handleStopTest} variant="outline" className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                Stop
              </Button>
            )}
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Sample
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Script */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Test Script
          </CardTitle>
          <CardDescription>
            Enter a script to test how your agent will sound
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Script Text</Label>
            <Textarea
              value={testScript}
              onChange={(e) => setTestScript(e.target.value)}
              placeholder="Enter the text you want to test..."
              className="min-h-[200px]"
            />
            <p className="text-xs text-gray-500">
              {testScript.length} characters
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Testing Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Test with your actual script content</li>
              <li>• Try different emotions and tones</li>
              <li>• Include pauses with commas and periods</li>
              <li>• Test pronunciation of key terms</li>
            </ul>
          </div>

          {isPlaying && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Playing voice sample...</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceTestingPanel;
