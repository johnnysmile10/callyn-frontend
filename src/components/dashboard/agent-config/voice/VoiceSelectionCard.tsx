
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Voice {
  id: string;
  name: string;
  gender: string;
  accent: string;
}

interface VoiceSelectionCardProps {
  selectedVoice: string;
  onVoiceChange: (voiceId: string) => void;
}

const voices: Voice[] = [
  { id: "Aria", name: "Aria", gender: "female", accent: "American" },
  { id: "Roger", name: "Roger", gender: "male", accent: "American" },
  { id: "Sarah", name: "Sarah", gender: "female", accent: "British" },
  { id: "Charlie", name: "Charlie", gender: "male", accent: "British" },
  { id: "Laura", name: "Laura", gender: "female", accent: "American" },
  { id: "Liam", name: "Liam", gender: "male", accent: "Irish" }
];

const VoiceSelectionCard = ({ selectedVoice, onVoiceChange }: VoiceSelectionCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleVoiceTest = (voiceId: string) => {
    setIsPlaying(true);
    // Simulate voice playback
    setTimeout(() => setIsPlaying(false), 3000);
    toast({
      title: "Voice Preview",
      description: `Playing sample with ${voiceId} voice`,
    });
  };

  return (
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
              onClick={() => onVoiceChange(voice.id)}
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
                  handleVoiceTest(voice.id);
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
  );
};

export default VoiceSelectionCard;
