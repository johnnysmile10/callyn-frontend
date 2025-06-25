
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GatewayMenuOption, GatewayAction } from "./types/gatewayTypes";
import { EXAMPLE_TEMPLATES } from "./components/TemplateSelector";
import AddMenuOptionCollapsed from "./components/AddMenuOptionCollapsed";
import AddMenuOptionHeader from "./components/AddMenuOptionHeader";
import AddMenuOptionFormContent from "./components/AddMenuOptionFormContent";
import AddMenuOptionFormActions from "./components/AddMenuOptionFormActions";

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

  const handleSubmit = () => {
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

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleExpand = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <AddMenuOptionCollapsed 
        alwaysTryZero={alwaysTryZero}
        onAlwaysTryZeroChange={onAlwaysTryZeroChange}
        onExpand={handleExpand}
      />
    );
  }

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <AddMenuOptionHeader />
      
      <CardContent>
        <AddMenuOptionFormContent
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
          formData={formData}
          onFieldChange={handleFieldChange}
        />

        <AddMenuOptionFormActions
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitDisabled={!formData.prompt.trim()}
        />
      </CardContent>
    </Card>
  );
};

export default AddMenuOptionForm;
