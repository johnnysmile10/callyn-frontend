
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { GatewayMenuOption, GatewayAction, GATEWAY_ACTION_TYPES } from "./types/gatewayTypes";

interface AddMenuOptionFormProps {
  onAdd: (option: GatewayMenuOption) => void;
}

const AddMenuOptionForm = ({ onAdd }: AddMenuOptionFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    prompt: '',
    actionType: 'press_key' as GatewayAction['type'],
    actionValue: '',
    actionDuration: '',
    instructions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.prompt.trim()) return;

    const newOption: GatewayMenuOption = {
      id: `option_${Date.now()}`,
      prompt: formData.prompt,
      action: {
        type: formData.actionType,
        value: formData.actionValue || undefined,
        duration: formData.actionDuration ? parseInt(formData.actionDuration) : undefined
      },
      instructions: formData.instructions || undefined,
      createdAt: new Date()
    };

    onAdd(newOption);
    
    // Reset form
    setFormData({
      prompt: '',
      actionType: 'press_key',
      actionValue: '',
      actionDuration: '',
      instructions: ''
    });
    setIsOpen(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 py-8"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Menu Option
      </Button>
    );
  }

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Add New Menu Option</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-prompt">Menu Prompt *</Label>
            <Input
              id="new-prompt"
              placeholder="e.g., 'Press 1 for sales, Press 2 for support'"
              value={formData.prompt}
              onChange={(e) => handleFieldChange('prompt', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-action">Action Type *</Label>
              <Select
                value={formData.actionType}
                onValueChange={(value) => handleFieldChange('actionType', value)}
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
                  placeholder={formData.actionType === 'press_key' ? "1, 2, *, #, etc." : "Text to speak"}
                  value={formData.actionValue}
                  onChange={(e) => handleFieldChange('actionValue', e.target.value)}
                />
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
                  onChange={(e) => handleFieldChange('actionDuration', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-instructions">Additional Instructions</Label>
            <Textarea
              id="new-instructions"
              placeholder="Any special instructions for handling this menu option..."
              value={formData.instructions}
              onChange={(e) => handleFieldChange('instructions', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Option
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMenuOptionForm;
