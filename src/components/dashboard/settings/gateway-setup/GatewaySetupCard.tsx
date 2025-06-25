
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Phone, Settings, Save, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GatewaySetupData, GatewayMenuOption } from "./types/gatewayTypes";
import GatewayMenuOptionCard from "./GatewayMenuOptionCard";
import AddMenuOptionForm from "./AddMenuOptionForm";

const GatewaySetupCard = () => {
  const { toast } = useToast();
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
  
  // Mock data - in real app this would come from backend/context
  const [gatewaySetup, setGatewaySetup] = useState<GatewaySetupData>({
    id: 'gateway_1',
    name: 'Main Gateway Setup',
    description: 'Configuration for navigating phone menus and IVR systems',
    menuOptions: [],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const handleBasicInfoChange = (field: keyof GatewaySetupData, value: any) => {
    setGatewaySetup(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date()
    }));
  };

  const handleAddMenuOption = (option: GatewayMenuOption) => {
    setGatewaySetup(prev => ({
      ...prev,
      menuOptions: [...prev.menuOptions, option],
      updatedAt: new Date()
    }));

    toast({
      title: "Menu Option Added",
      description: "New menu option has been added successfully.",
    });
  };

  const handleUpdateMenuOption = (updatedOption: GatewayMenuOption) => {
    setGatewaySetup(prev => ({
      ...prev,
      menuOptions: prev.menuOptions.map(option => 
        option.id === updatedOption.id ? updatedOption : option
      ),
      updatedAt: new Date()
    }));
  };

  const handleDeleteMenuOption = (optionId: string) => {
    setGatewaySetup(prev => ({
      ...prev,
      menuOptions: prev.menuOptions.filter(option => option.id !== optionId),
      updatedAt: new Date()
    }));

    toast({
      title: "Menu Option Deleted",
      description: "Menu option has been removed successfully.",
    });
  };

  const handleSave = () => {
    // In real app, this would save to backend
    console.log('Saving gateway setup:', gatewaySetup);
    
    toast({
      title: "Gateway Setup Saved",
      description: "Your gateway configuration has been saved successfully.",
    });
  };

  const isSetupComplete = gatewaySetup.menuOptions.length > 0 && gatewaySetup.name.trim() !== '';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-600" />
          Gateway Setup (Lite MVP)
          <Badge variant={isSetupComplete ? "default" : "secondary"}>
            {isSetupComplete ? "Configured" : "Setup Required"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Configure how your AI agent navigates phone menus and IVR systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gateway-name">Setup Name</Label>
              <Input
                id="gateway-name"
                placeholder="Main Gateway Setup"
                value={gatewaySetup.name}
                onChange={(e) => handleBasicInfoChange('name', e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="gateway-active">Enable Gateway Navigation</Label>
                <p className="text-sm text-gray-600">
                  Allow AI agent to navigate phone menus
                </p>
              </div>
              <Switch
                id="gateway-active"
                checked={gatewaySetup.isActive}
                onCheckedChange={(checked) => handleBasicInfoChange('isActive', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gateway-description">Description (Optional)</Label>
            <Textarea
              id="gateway-description"
              placeholder="Describe this gateway configuration..."
              value={gatewaySetup.description || ''}
              onChange={(e) => handleBasicInfoChange('description', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Setup Status */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          {isSetupComplete ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-orange-500" />
          )}
          <div>
            <p className="text-sm font-medium">
              {isSetupComplete ? "Setup Complete" : "Setup Required"}
            </p>
            <p className="text-sm text-gray-600">
              {isSetupComplete 
                ? `${gatewaySetup.menuOptions.length} menu option(s) configured`
                : "Add at least one menu option to complete setup"
              }
            </p>
          </div>
        </div>

        {/* Menu Options */}
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

            <AddMenuOptionForm onAdd={handleAddMenuOption} />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Gateway Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GatewaySetupCard;
