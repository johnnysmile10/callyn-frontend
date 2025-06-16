
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Save, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VoicePersonalityEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  voice: string;
  personality: string;
  onSave: (voice: string, personality: string) => void;
}

const VOICES = [
  { id: "alloy", name: "Alloy", description: "Professional, clear voice" },
  { id: "echo", name: "Echo", description: "Warm, friendly voice" },
  { id: "fable", name: "Fable", description: "Energetic, enthusiastic voice" },
  { id: "onyx", name: "Onyx", description: "Deep, authoritative voice" },
  { id: "nova", name: "Nova", description: "Smooth, conversational voice" },
  { id: "shimmer", name: "Shimmer", description: "Bright, engaging voice" }
];

const PERSONALITIES = [
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

const VoicePersonalityEditModal = ({ 
  isOpen, 
  onClose, 
  voice, 
  personality, 
  onSave 
}: VoicePersonalityEditModalProps) => {
  const [selectedVoice, setSelectedVoice] = useState(voice);
  const [selectedPersonality, setSelectedPersonality] = useState(personality);

  const handleSave = () => {
    onSave(selectedVoice, selectedPersonality);
    toast({
      title: "Voice & Personality Updated",
      description: "Your agent's voice and personality have been updated successfully.",
    });
    onClose();
  };

  const handleVoicePreview = (voiceId: string) => {
    toast({
      title: "Voice Preview",
      description: `Playing preview for ${voiceId} voice`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-purple-600" />
            Edit Voice & Personality
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Voice Selection</Label>
            <p className="text-sm text-gray-600 mb-4">Choose how your agent should sound</p>
            <RadioGroup value={selectedVoice} onValueChange={setSelectedVoice}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {VOICES.map((voice) => (
                  <Card 
                    key={voice.id} 
                    className={`cursor-pointer transition-all ${
                      selectedVoice === voice.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={voice.id} />
                          <div>
                            <div className="font-medium">{voice.name}</div>
                            <div className="text-sm text-gray-600">{voice.description}</div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVoicePreview(voice.id)}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-medium">Personality Type</Label>
            <p className="text-sm text-gray-600 mb-4">Choose how your agent should interact</p>
            <RadioGroup value={selectedPersonality} onValueChange={setSelectedPersonality}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PERSONALITIES.map((p) => (
                  <Card 
                    key={p.id} 
                    className={`cursor-pointer transition-all ${
                      selectedPersonality === p.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={p.id} />
                        <span className="text-2xl">{p.icon}</span>
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-sm text-gray-600">{p.description}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoicePersonalityEditModal;
