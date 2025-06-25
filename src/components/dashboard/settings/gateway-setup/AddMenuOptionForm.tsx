
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Lightbulb } from "lucide-react";
import { GatewayMenuOption, GatewayAction } from "./types/gatewayTypes";
import AlwaysTryZeroToggle from "./components/AlwaysTryZeroToggle";
import TemplateSelector, { EXAMPLE_TEMPLATES } from "./components/TemplateSelector";
import MenuOptionFormFields from "./components/MenuOptionFormFields";

interface AddMenuOptionFormProps {
  onAdd: (option: GatewayMenuOption) => void;
  onAlwaysTryZeroChange?: (enabled: boolean) => void;
  alwaysTryZero?: boolean;
}

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
        <AlwaysTryZeroToggle 
          alwaysTryZero={alwaysTryZero}
          onAlwaysTryZeroChange={onAlwaysTryZeroChange}
        />

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
          <Alert className="bg-blue-50 border-blue-200">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm">
              <strong>Quick Guide:</strong> Configure how your AI agent should respond to phone menu prompts. 
              Choose from common templates below or create a custom option. Each option tells the agent what to do 
              when it hears a specific prompt during a call.
            </AlertDescription>
          </Alert>

          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
          />

          <MenuOptionFormFields 
            formData={formData}
            onFieldChange={handleFieldChange}
          />

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
