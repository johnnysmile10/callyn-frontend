
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdvancedSettingsSectionProps {
  bufferTime: number;
  retryDelay: number;
  onBufferTimeChange: (value: number) => void;
  onRetryDelayChange: (value: number) => void;
}

const AdvancedSettingsSection = ({ 
  bufferTime, 
  retryDelay, 
  onBufferTimeChange, 
  onRetryDelayChange 
}: AdvancedSettingsSectionProps) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        <div>
          <Label htmlFor="buffer-time">Buffer Between Meetings (minutes)</Label>
          <Input
            id="buffer-time"
            type="number"
            value={bufferTime || 15}
            onChange={(e) => onBufferTimeChange(parseInt(e.target.value))}
            min="0"
            max="60"
          />
        </div>
        <div>
          <Label htmlFor="retry-delay">Retry Delay (hours)</Label>
          <Input
            id="retry-delay"
            type="number"
            value={retryDelay || 24}
            onChange={(e) => onRetryDelayChange(parseInt(e.target.value))}
            min="1"
            max="168"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettingsSection;
