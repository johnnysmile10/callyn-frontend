
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Brain } from "lucide-react";
import { VoiceTag } from "../types/eliteGatewayTypes";
import VoiceTagCard from "./VoiceTagCard";

interface VoiceTagsTabProps {
  enableVoiceTags: boolean;
  voiceTags: VoiceTag[];
  onToggleVoiceTags: (enabled: boolean) => void;
  onAddVoiceTag: () => void;
  onUpdateVoiceTag: (index: number, field: keyof VoiceTag, value: any) => void;
  onRemoveVoiceTag: (index: number) => void;
}

const VoiceTagsTab = ({ 
  enableVoiceTags, 
  voiceTags, 
  onToggleVoiceTags, 
  onAddVoiceTag, 
  onUpdateVoiceTag, 
  onRemoveVoiceTag 
}: VoiceTagsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-green-600" />
          <h4 className="font-medium">Voice Tag Detection</h4>
        </div>
        <Switch
          checked={enableVoiceTags}
          onCheckedChange={onToggleVoiceTags}
        />
      </div>

      {enableVoiceTags && (
        <div className="space-y-4">
          <Button onClick={onAddVoiceTag} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Voice Tag
          </Button>

          {voiceTags.map((tag, index) => (
            <VoiceTagCard
              key={index}
              voiceTag={tag}
              index={index}
              onUpdate={onUpdateVoiceTag}
              onRemove={onRemoveVoiceTag}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceTagsTab;
