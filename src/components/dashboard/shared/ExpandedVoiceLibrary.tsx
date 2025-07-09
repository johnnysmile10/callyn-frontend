
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2 } from "lucide-react";

interface Voice {
  id: string;
  name: string;
  gender: string;
  accent: string;
  description: string;
  preview?: string;
}

const AVAILABLE_VOICES: Voice[] = [
  {
    id: "9BWtsMINqrJLrRacOk9x",
    name: "Aria",
    gender: "Female",
    accent: "American",
    description: "Professional and warm"
  },
  {
    id: "CwhRBWXzGAHq8TQ4Fs17",
    name: "Roger",
    gender: "Male",
    accent: "British",
    description: "Authoritative and clear"
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Sarah",
    gender: "Female",
    accent: "Australian",
    description: "Friendly and approachable"
  },
  {
    id: "IKne3meq5aSn9XLyUdCD",
    name: "Charlie",
    gender: "Male",
    accent: "American",
    description: "Confident and engaging"
  },
  {
    id: "FGY2WhTYpPnrIDTdsKH5",
    name: "Laura",
    gender: "Female",
    accent: "Canadian",
    description: "Calm and professional"
  }
];

interface ExpandedVoiceLibraryProps {
  selectedVoice: string;
  onVoiceSelect: (voiceId: string) => void;
  showTestingFeatures?: boolean;
}

const ExpandedVoiceLibrary = ({
  selectedVoice,
  onVoiceSelect,
  showTestingFeatures = false
}: ExpandedVoiceLibraryProps) => {
  const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const handleVoiceSelect = (voiceId: string) => {
    onVoiceSelect(voiceId);
  };

  const handlePlayPreview = async (voiceId: string) => {
    console.log(voiceId)
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
              text: "Hello! I'm calling from {company} to discuss how we can help your business grow.",
              model_id: "eleven_monolingual_v1", // Or another appropriate model for your case
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch audio preview");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.play();

        audio.onended = () => {
          setPlayingVoice(null);
        };
      } catch (error) {
        console.error("Error playing voice preview:", error);
        setPlayingVoice(null);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AVAILABLE_VOICES.map((voice) => (
          <Card
            key={voice.id}
            className={`cursor-pointer transition-all hover:shadow-md ${selectedVoice === voice.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
            onClick={() => handleVoiceSelect(voice.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{voice.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPreview(voice.id);
                  }}
                  className="h-8 w-8 p-0"
                >
                  {playingVoice === voice.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {voice.gender}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {voice.accent}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{voice.description}</p>
                {selectedVoice === voice.id && (
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                    <Volume2 className="h-3 w-3" />
                    Selected
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showTestingFeatures && selectedVoice && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">Selected Voice: </span>
                {AVAILABLE_VOICES.find(v => v.id === selectedVoice)?.name}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePlayPreview(selectedVoice)}
              >
                <Play className="h-4 w-4 mr-2" />
                Test Voice
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpandedVoiceLibrary;
