
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2 } from "lucide-react";
import { getVoicesForLanguage } from "./languageConfig";

interface VoiceSelectorProps {
  primaryLanguage: string;
  selectedVoiceId?: string;
  onVoiceChange: (voiceId: string) => void;
}

const VoiceSelector = ({ primaryLanguage, selectedVoiceId, onVoiceChange }: VoiceSelectorProps) => {
  const availableVoices = getVoicesForLanguage(primaryLanguage);
  
  if (availableVoices.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Label>Voice Selection</Label>
      <Select 
        value={selectedVoiceId || availableVoices[0].id} 
        onValueChange={onVoiceChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select voice" />
        </SelectTrigger>
        <SelectContent>
          {availableVoices.map((voice) => (
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
    </div>
  );
};

export default VoiceSelector;
