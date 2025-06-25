
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

const FormActions = ({ onSubmit, onCancel, isFormValid }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <Button onClick={onCancel} variant="outline">
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
      <Button 
        onClick={onSubmit} 
        disabled={!isFormValid}
        className="bg-purple-600 hover:bg-purple-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Elite Option
      </Button>
    </div>
  );
};

export default FormActions;
