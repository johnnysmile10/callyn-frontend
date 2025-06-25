
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { VoiceTag } from "../types/eliteGatewayTypes";

interface VoiceTagCardProps {
  voiceTag: VoiceTag;
  index: number;
  onUpdate: (index: number, field: keyof VoiceTag, value: any) => void;
  onRemove: (index: number) => void;
}

const VoiceTagCard = ({ voiceTag, index, onUpdate, onRemove }: VoiceTagCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-medium">Voice Tag {index + 1}</h5>
        <Button onClick={() => onRemove(index)} variant="outline" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tag Name</Label>
          <Input
            value={voiceTag.tag}
            onChange={(e) => onUpdate(index, "tag", e.target.value)}
            placeholder="Tag name..."
          />
        </div>
        <div className="space-y-2">
          <Label>Pattern</Label>
          <Input
            value={voiceTag.pattern}
            onChange={(e) => onUpdate(index, "pattern", e.target.value)}
            placeholder="Voice pattern..."
          />
        </div>
      </div>
    </Card>
  );
};

export default VoiceTagCard;
