
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Lightbulb, Phone } from "lucide-react";
import { GatewayMenuOption, GatewayAction, GATEWAY_ACTION_TYPES } from "./types/gatewayTypes";

interface AddMenuOptionFormProps {
  onAdd: (option: GatewayMenuOption) => void;
  onAlwaysTryZeroChange?: (enabled: boolean) => void;
  alwaysTryZero?: boolean;
}

const EXAMPLE_TEMPLATES = [
  {
    id: 'custom',
    name: 'Create Custom Option',
    prompt: '',
    action: { type: 'press_key' as const, value: '' },
    instructions: ''
  },
  {
    id: 'sales_transfer',
    name: 'Sales Department Transfer',
    prompt: 'Press 1 for sales inquiries',
    action: { type: 'press_key' as const, value: '1' },
    instructions: 'Transfer to sales team when customer needs product information or wants to make a purchase'
  },
  {
    id: 'support_transfer',
    name: 'Customer Support Transfer',
    prompt: 'Press 2 for technical support',
    action: { type: 'press_key' as const, value: '2' },
    instructions: 'Route to technical support for existing customers with issues'
  },
  {
    id: 'wait_for_agent',
    name: 'Wait for Human Agent',
    prompt: 'Please hold while we connect you to an agent',
    action: { type: 'wait' as const, duration: 30 },
    instructions: 'Used when the system needs time to route the call to a human agent'
  },
  {
    id: 'speak_name',
    name: 'Speak Company Name',
    prompt: 'Say your company name clearly',
    action: { type: 'speak' as const, value: 'Acme Corporation' },
    instructions: 'Speak the company name when prompted by automated systems'
  },
  {
    id: 'press_zero',
    name: 'Press 0 for Operator',
    prompt: 'Press 0 to speak with an operator',
    action: { type: 'press_key' as const, value: '0' },
    instructions: 'Universal fallback to reach a human operator'
  }
];

const AddMenuOptionForm = ({ onAdd, onAlwaysTryZeroChange, alwaysTryZero = false }: AddMenuOptionFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
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
    setSelectedTemplate('custom');
    setIsOpen(false);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = EXAMPLE_TEMPLATES.find(t => t.id === templateId);
    
    if (template && templateId !== 'custom') {
      setFormData({
        prompt: template.prompt,
        actionType: template.action.type,
        actionValue: template.action.value || '',
        actionDuration: template.action.duration?.toString() || '',
        instructions: template.instructions
      });
    } else {
      setFormData({
        prompt: '',
        actionType: 'press_key',
        actionValue: '',
        actionDuration: '',
        instructions: ''
      });
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Reset template selection when manually editing
    if (selectedTemplate !== 'custom') {
      setSelectedTemplate('custom');
    }
  };

  if (!isOpen) {
    return (
      <div className="space-y-4">
        {/* Always Try Pressing 0 Toggle */}
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange-600" />
                  <Label className="text-sm font-medium">Always Try Pressing 0</Label>
                </div>
                <p className="text-xs text-gray-600">
                  Automatically try pressing 0 as a fallback when other options don't work
                </p>
              </div>
              <Switch
                checked={alwaysTryZero}
                onCheckedChange={onAlwaysTryZeroChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Menu Option Button */}
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 py-8"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Menu Option
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          Add New Menu Option
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Instructional Guidance */}
          <Alert className="bg-blue-50 border-blue-200">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm">
              <strong>Quick Guide:</strong> Configure how your AI agent should respond to phone menu prompts. 
              Choose from common templates below or create a custom option. Each option tells the agent what to do 
              when it hears a specific prompt during a call.
            </AlertDescription>
          </Alert>

          {/* Template Selector */}
          <div className="space-y-2">
            <Label htmlFor="template-select">Start with a Template</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template or create custom" />
              </SelectTrigger>
              <SelectContent>
                {EXAMPLE_TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      {template.prompt && (
                        <div className="text-xs text-gray-500 truncate max-w-60">
                          {template.prompt}
                        </div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-prompt">Menu Prompt *</Label>
            <Input
              id="new-prompt"
              placeholder="e.g., 'Press 1 for sales, Press 2 for support' or 'Please hold while we connect you'"
              value={formData.prompt}
              onChange={(e) => handleFieldChange('prompt', e.target.value)}
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
                  placeholder={formData.actionType === 'press_key' ? "0, 1, 2, *, #, etc." : "Your company name or response"}
                  value={formData.actionValue}
                  onChange={(e) => handleFieldChange('actionValue', e.target.value)}
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
                  onChange={(e) => handleFieldChange('actionDuration', e.target.value)}
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
