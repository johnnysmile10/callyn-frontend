
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Phone } from "lucide-react";
import { LiteGatewayMenuOption, LITE_ACTION_TYPES } from "../types/liteGatewayTypes";

interface LiteAddMenuOptionFormProps {
  onAdd: (option: LiteGatewayMenuOption) => void;
  onCancel: () => void;
}

const LiteAddMenuOptionForm = ({ onAdd, onCancel }: LiteAddMenuOptionFormProps) => {
  const [formData, setFormData] = useState<{
    prompt: string;
    actionType: 'press_key' | 'wait' | 'speak' | 'transfer';
    actionValue: string;
    duration: number;
  }>({
    prompt: "",
    actionType: "press_key",
    actionValue: "",
    duration: 3
  });

  const handleSubmit = () => {
    const newOption: LiteGatewayMenuOption = {
      id: `lite_option_${Date.now()}`,
      prompt: formData.prompt,
      action: {
        type: formData.actionType,
        value: formData.actionValue,
        duration: formData.actionType === 'wait' ? formData.duration : undefined
      },
      createdAt: new Date()
    };

    onAdd(newOption);
    
    // Reset form
    setFormData({
      prompt: "",
      actionType: "press_key",
      actionValue: "",
      duration: 3
    });
  };

  const isFormValid = formData.prompt.trim() !== "" && formData.actionValue.trim() !== "";

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-600" />
          Add Menu Option
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>What you might hear</Label>
          <Textarea
            value={formData.prompt}
            onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
            placeholder="e.g., 'Press 1 for sales, Press 2 for support'"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Action</Label>
            <Select
              value={formData.actionType}
              onValueChange={(value: 'press_key' | 'wait' | 'speak' | 'transfer') => 
                setFormData(prev => ({ ...prev, actionType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LITE_ACTION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              {formData.actionType === 'press_key' && 'Key to Press'}
              {formData.actionType === 'wait' && 'Seconds to Wait'}
              {formData.actionType === 'speak' && 'What to Say'}
              {formData.actionType === 'transfer' && 'Transfer to'}
            </Label>
            {formData.actionType === 'wait' ? (
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
            ) : (
              <Input
                value={formData.actionValue}
                onChange={(e) => setFormData(prev => ({ ...prev, actionValue: e.target.value }))}
                placeholder={
                  formData.actionType === 'press_key' ? 'e.g., 1' :
                  formData.actionType === 'speak' ? 'e.g., Hello' :
                  'e.g., operator'
                }
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button onClick={onCancel} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiteAddMenuOptionForm;
