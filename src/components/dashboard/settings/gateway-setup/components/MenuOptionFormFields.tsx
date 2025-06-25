
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GatewayAction, GATEWAY_ACTION_TYPES } from "../types/gatewayTypes";

interface FormData {
  prompt: string;
  actionType: GatewayAction['type'];
  actionValue: string;
  actionDuration: string;
  instructions: string;
}

interface MenuOptionFormFieldsProps {
  formData: FormData;
  onFieldChange: (field: string, value: string) => void;
}

const MenuOptionFormFields = ({ formData, onFieldChange }: MenuOptionFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new-prompt">Menu Prompt *</Label>
        <Input
          id="new-prompt"
          placeholder="e.g., 'Press 1 for sales, Press 2 for support' or 'Please hold while we connect you'"
          value={formData.prompt}
          onChange={(e) => onFieldChange('prompt', e.target.value)}
          required
        />
        <p className="text-xs text-gray-600">
          Enter the exact text your agent should listen for during phone calls
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="new-action">Action Type *</Label>
          <Select
            value={formData.actionType}
            onValueChange={(value) => onFieldChange('actionType', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GATEWAY_ACTION_TYPES.map((action) => (
                <SelectItem key={action.value} value={action.value}>
                  <div>
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(formData.actionType === 'press_key' || formData.actionType === 'speak') && (
          <div className="space-y-2">
            <Label htmlFor="new-value">
              {formData.actionType === 'press_key' ? 'Key to Press' : 'Text to Speak'}
            </Label>
            <Input
              id="new-value"
              placeholder={formData.actionType === 'press_key' ? "0, 1, 2, *, #, etc." : "Your company name or response"}
              value={formData.actionValue}
              onChange={(e) => onFieldChange('actionValue', e.target.value)}
            />
            {formData.actionType === 'press_key' && (
              <p className="text-xs text-gray-600">
                Most common: 0 (operator), 1-9 (menu options), * and # (special functions)
              </p>
            )}
          </div>
        )}

        {formData.actionType === 'wait' && (
          <div className="space-y-2">
            <Label htmlFor="new-duration">Wait Duration (seconds)</Label>
            <Input
              id="new-duration"
              type="number"
              placeholder="5"
              value={formData.actionDuration}
              onChange={(e) => onFieldChange('actionDuration', e.target.value)}
            />
            <p className="text-xs text-gray-600">
              Recommended: 5-30 seconds for most situations
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-instructions">Additional Instructions (Optional)</Label>
        <Textarea
          id="new-instructions"
          placeholder="e.g., 'Only use this option for existing customers' or 'Wait for the beep before speaking'"
          value={formData.instructions}
          onChange={(e) => onFieldChange('instructions', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default MenuOptionFormFields;
