
import { GatewayAction } from "../types/gatewayTypes";
import TemplateSelector from "./TemplateSelector";
import MenuOptionFormFields from "./MenuOptionFormFields";

interface FormData {
  prompt: string;
  actionType: GatewayAction['type'];
  actionValue: string;
  actionDuration: string;
  instructions: string;
}

interface AddMenuOptionFormContentProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
  formData: FormData;
  onFieldChange: (field: string, value: string) => void;
}

const AddMenuOptionFormContent = ({
  selectedTemplate,
  onTemplateChange,
  formData,
  onFieldChange
}: AddMenuOptionFormContentProps) => {
  return (
    <div className="space-y-4">
      <TemplateSelector 
        selectedTemplate={selectedTemplate}
        onTemplateChange={onTemplateChange}
      />

      <MenuOptionFormFields 
        formData={formData}
        onFieldChange={onFieldChange}
      />
    </div>
  );
};

export default AddMenuOptionFormContent;
