
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const EXAMPLE_TEMPLATES = [
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

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="template-select">Start with a Template</Label>
      <Select value={selectedTemplate} onValueChange={onTemplateChange}>
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
  );
};

export default TemplateSelector;
