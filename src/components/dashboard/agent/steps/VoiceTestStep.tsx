
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Play, Pause, ArrowRight, Volume2, Phone, Headphones } from "lucide-react";

interface VoiceTestStepProps {
  onComplete: (data: any) => void;
  initialData: any;
  isCompleted: boolean;
}

const VoiceTestStep = ({ onComplete, initialData, isCompleted }: VoiceTestStepProps) => {
  const [selectedVoice, setSelectedVoice] = useState(initialData.voice?.voiceId || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasTestedVoice, setHasTestedVoice] = useState(false);
  const [isLiveTestActive, setIsLiveTestActive] = useState(false);

  const voices = [
    { id: "aria", name: "Aria", gender: "Female", accent: "American", personality: "Professional & Warm", popular: true },
    { id: "sarah", name: "Sarah", gender: "Female", accent: "American", personality: "Friendly & Energetic", popular: true },
    { id: "charlotte", name: "Charlotte", gender: "Female", accent: "British", personality: "Sophisticated & Clear", popular: false },
    { id: "brian", name: "Brian", gender: "Male", accent: "American", personality: "Confident & Direct", popular: true },
    { id: "daniel", name: "Daniel", gender: "Male", accent: "American", personality: "Calm & Trustworthy", popular: false },
    { id: "george", name: "George", gender: "Male", accent: "British", personality: "Authoritative & Polished", popular: false }
  ];

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    setHasTestedVoice(false);
  };

  const handlePlayPreview = async () => {
    if (!selectedVoice) return;
    
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
      setHasTestedVoice(true);
    }, 3000);
  };

  const handleLiveTest = () => {
    if (!selectedVoice) return;
    setIsLiveTestActive(true);
    // Simulate live test setup
    setTimeout(() => {
      setIsLiveTestActive(false);
      setHasTestedVoice(true);
    }, 5000);
  };

  const handleSubmit = () => {
    const data = {
      voiceId: selectedVoice,
      hasTestedVoice
    };
    onComplete(data);
  };

  const isFormValid = selectedVoice && hasTestedVoice;
  const selectedVoiceData = voices.find(v => v.id === selectedVoice);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-blue-600" />
          Step 4: Voice Test Zone
        </CardTitle>
        <CardDescription>
          Choose your agent's voice and test it with a live conversation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Choose Your Agent's Voice</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voices.map((voice) => (
              <Card 
                key={voice.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedVoice === voice.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => handleVoiceSelect(voice.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{voice.name}</h3>
                        {voice.popular && (
                          <Badge variant="default" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {voice.gender} • {voice.accent}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPreview();
                      }}
                      disabled={isPlaying}
                    >
                      {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-700 mb-2">{voice.personality}</p>
                  {selectedVoice === voice.id && (
                    <Badge variant="secondary" className="text-xs">Selected</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Voice Preview & Test */}
        {selectedVoice && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Volume2 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Test Your Agent's Voice</h3>
                </div>
                
                {selectedVoiceData && (
                  <div className="bg-white/80 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{selectedVoiceData.name}</strong> will say:
                    </p>
                    <p className="text-sm italic">
                      "Hi there! This is {selectedVoiceData.name} from your sales team. 
                      I'm calling because we've been helping businesses like yours improve their sales results. 
                      Do you have just a moment to hear how we might be able to help you too?"
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={handlePlayPreview}
                    disabled={isPlaying}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Quick Preview
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleLiveTest}
                    disabled={isLiveTestActive}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isLiveTestActive ? (
                      <>
                        <Phone className="h-4 w-4 animate-pulse" />
                        Testing Live...
                      </>
                    ) : (
                      <>
                        <Headphones className="h-4 w-4" />
                        Live Test Call
                      </>
                    )}
                  </Button>
                </div>

                {isLiveTestActive && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      🎉 <strong>Live test in progress!</strong> Your agent is calling you now. 
                      Answer your phone to experience the conversation firsthand.
                    </p>
                  </div>
                )}

                {hasTestedVoice && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      ✅ Voice tested successfully! Ready to proceed.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ElevenLabs Integration Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-sm">Premium Voice Quality</span>
            </div>
            <p className="text-sm text-orange-800 mb-3">
              For the highest quality voices, connect your ElevenLabs API key in settings. 
              This unlocks premium neural voices for even more natural conversations.
            </p>
            <Button variant="outline" size="sm" className="text-orange-700 border-orange-300">
              Connect ElevenLabs
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit} size="lg" disabled={!isFormValid}>
            Continue to Final Review
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceTestStep;
