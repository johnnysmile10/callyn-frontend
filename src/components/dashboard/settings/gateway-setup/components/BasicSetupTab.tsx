
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EliteFormData } from "./hooks/useEliteFormData";

interface BasicSetupTabProps {
  formData: EliteFormData;
  onFieldChange: (field: keyof EliteFormData, value: any) => void;
}

const BasicSetupTab = ({ formData, onFieldChange }: BasicSetupTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Prompt Detection</Label>
          <Textarea
            value={formData.prompt}
            onChange={(e) => onFieldChange('prompt', e.target.value)}
            placeholder="Enter keywords or phrases to detect..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Action Type</Label>
          <Select
            value={formData.actionType}
            onValueChange={(value: 'press_key' | 'wait' | 'speak' | 'transfer') => 
              onFieldChange('actionType', value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="press_key">Press Key</SelectItem>
              <SelectItem value="speak">Speak</SelectItem>
              <SelectItem value="wait">Wait</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Action Value</Label>
          <Input
            value={formData.actionValue}
            onChange={(e) => onFieldChange('actionValue', e.target.value)}
            placeholder="Enter action value..."
          />
        </div>

        <div className="space-y-2">
          <Label>Confidence Threshold</Label>
          <Input
            type="number"
            min="0.1"
            max="1"
            step="0.1"
            value={formData.confidenceThreshold}
            onChange={(e) => onFieldChange('confidenceThreshold', parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicSetupTab;
