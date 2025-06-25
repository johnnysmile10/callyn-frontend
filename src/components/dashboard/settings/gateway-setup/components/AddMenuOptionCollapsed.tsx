
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AlwaysTryZeroToggle from "./AlwaysTryZeroToggle";

interface AddMenuOptionCollapsedProps {
  alwaysTryZero: boolean;
  onAlwaysTryZeroChange?: (enabled: boolean) => void;
  onExpand: () => void;
}

const AddMenuOptionCollapsed = ({ 
  alwaysTryZero, 
  onAlwaysTryZeroChange, 
  onExpand 
}: AddMenuOptionCollapsedProps) => {
  return (
    <div className="space-y-4">
      <AlwaysTryZeroToggle 
        alwaysTryZero={alwaysTryZero}
        onAlwaysTryZeroChange={onAlwaysTryZeroChange}
      />

      <Button
        onClick={onExpand}
        variant="outline"
        className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 py-8"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Menu Option
      </Button>
    </div>
  );
};

export default AddMenuOptionCollapsed;
