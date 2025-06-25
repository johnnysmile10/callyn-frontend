
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { GatewaySetupData, GatewayMenuOption } from "./types/gatewayTypes";
import GatewayMenuOptionCard from "./GatewayMenuOptionCard";
import AddMenuOptionForm from "./AddMenuOptionForm";

interface GatewayMenuOptionsListProps {
  gatewaySetup: GatewaySetupData;
  onMenuOptionsChange: (options: GatewayMenuOption[]) => void;
  alwaysTryZero: boolean;
  onAlwaysTryZeroChange: (enabled: boolean) => void;
}

const GatewayMenuOptionsList = ({ 
  gatewaySetup, 
  onMenuOptionsChange, 
  alwaysTryZero, 
  onAlwaysTryZeroChange 
}: GatewayMenuOptionsListProps) => {
  const { toast } = useToast();
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);

  const handleAddMenuOption = (option: GatewayMenuOption) => {
    const updatedOptions = [...gatewaySetup.menuOptions, option];
    onMenuOptionsChange(updatedOptions);

    toast({
      title: "Menu Option Added",
      description: "New menu option has been added successfully.",
    });
  };

  const handleUpdateMenuOption = (updatedOption: GatewayMenuOption) => {
    const updatedOptions = gatewaySetup.menuOptions.map(option => 
      option.id === updatedOption.id ? updatedOption : option
    );
    onMenuOptionsChange(updatedOptions);
  };

  const handleDeleteMenuOption = (optionId: string) => {
    const updatedOptions = gatewaySetup.menuOptions.filter(option => option.id !== optionId);
    onMenuOptionsChange(updatedOptions);

    toast({
      title: "Menu Option Deleted",
      description: "Menu option has been removed successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Menu Options</h3>
        <Badge variant="outline">
          {gatewaySetup.menuOptions.length} option(s)
        </Badge>
      </div>

      <div className="space-y-4">
        {gatewaySetup.menuOptions.map((option) => (
          <GatewayMenuOptionCard
            key={option.id}
            option={option}
            onUpdate={handleUpdateMenuOption}
            onDelete={handleDeleteMenuOption}
            isEditing={editingOptionId === option.id}
            onEditToggle={() => setEditingOptionId(
              editingOptionId === option.id ? null : option.id
            )}
          />
        ))}

        <AddMenuOptionForm 
          onAdd={handleAddMenuOption}
          onAlwaysTryZeroChange={onAlwaysTryZeroChange}
          alwaysTryZero={alwaysTryZero}
        />
      </div>
    </div>
  );
};

export default GatewayMenuOptionsList;
