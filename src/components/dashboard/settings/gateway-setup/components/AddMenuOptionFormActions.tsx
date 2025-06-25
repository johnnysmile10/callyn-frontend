
import { Button } from "@/components/ui/button";

interface AddMenuOptionFormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitDisabled?: boolean;
}

const AddMenuOptionFormActions = ({ 
  onSubmit, 
  onCancel, 
  isSubmitDisabled = false 
}: AddMenuOptionFormActionsProps) => {
  return (
    <div className="flex gap-3 pt-4">
      <Button 
        type="button" 
        onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-700"
        disabled={isSubmitDisabled}
      >
        Add Option
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default AddMenuOptionFormActions;
