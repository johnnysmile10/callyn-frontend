
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface VoiceSettingsCardProps {
  speakingSpeed: number[];
  enthusiasm: number[];
  onSpeedChange: (speed: number[]) => void;
  onEnthusiasmChange: (enthusiasm: number[]) => void;
}

const VoiceSettingsCard = ({ 
  speakingSpeed, 
  enthusiasm, 
  onSpeedChange, 
  onEnthusiasmChange 
}: VoiceSettingsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          Voice Settings
        </CardTitle>
        <CardDescription>
          Fine-tune how your agent speaks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="speaking-speed">
            Speaking Speed: {speakingSpeed[0]}x
          </Label>
          <Slider
            id="speaking-speed"
            min={0.5}
            max={2.0}
            step={0.1}
            value={speakingSpeed}
            onValueChange={onSpeedChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Slower (0.5x)</span>
            <span>Normal (1.0x)</span>
            <span>Faster (2.0x)</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="enthusiasm">
            Enthusiasm Level: {enthusiasm[0]}/10
          </Label>
          <Slider
            id="enthusiasm"
            min={1}
            max={10}
            step={1}
            value={enthusiasm}
            onValueChange={onEnthusiasmChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Calm & Professional</span>
            <span>Energetic & Enthusiastic</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceSettingsCard;
