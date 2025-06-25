
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { EliteGatewaySetup, EliteGatewayMenuOption } from "../types/eliteGatewayTypes";
import EliteMenuOptionCard from "./EliteMenuOptionCard";
import EliteAddMenuOptionForm from "./EliteAddMenuOptionForm";

interface EliteMenuOptionsManagerProps {
  gatewaySetup: EliteGatewaySetup;
  onMenuOptionsChange: (options: EliteGatewayMenuOption[]) => void;
}

const EliteMenuOptionsManager = ({ 
  gatewaySetup, 
  onMenuOptionsChange 
}: EliteMenuOptionsManagerProps) => {
  const { toast } = useToast();
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMenuOption = (option: EliteGatewayMenuOption) => {
    const updatedOptions = [...gatewaySetup.menuOptions, option];
    onMenuOptionsChange(updatedOptions);

    toast({
      title: "Elite Menu Option Added",
      description: "New menu option with AI learning capabilities has been added successfully.",
    });
    
    setShowAddForm(false);
  };

  const handleUpdateMenuOption = (updatedOption: EliteGatewayMenuOption) => {
    const updatedOptions = gatewaySetup.menuOptions.map(option => 
      option.id === updatedOption.id ? updatedOption : option
    );
    onMenuOptionsChange(updatedOptions);
  };

  const handleDeleteMenuOption = (optionId: string) => {
    const updatedOptions = gatewaySetup.menuOptions.filter(option => option.id !== optionId);
    onMenuOptionsChange(updatedOptions);

    toast({
      title: "Elite Menu Option Deleted",
      description: "Menu option and its learning data have been removed successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Elite Menu Options</h3>
          <p className="text-sm text-gray-600">
            AI-powered menu options with multi-language support and adaptive learning
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-purple-200 text-purple-700">
            {gatewaySetup.menuOptions.length} option(s)
          </Badge>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 hover:bg-purple-700"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Elite Option
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {gatewaySetup.menuOptions.map((option) => (
          <EliteMenuOptionCard
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

        {showAddForm && (
          <EliteAddMenuOptionForm 
            onAdd={handleAddMenuOption}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {!showAddForm && gatewaySetup.menuOptions.length === 0 && (
          <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
            <div className="text-purple-600 mb-2">
              <Plus className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Elite Menu Options</h3>
            <p className="text-gray-600 mb-4">
              Create your first AI-powered menu option with advanced learning capabilities
            </p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create Elite Menu Option
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EliteMenuOptionsManager;
