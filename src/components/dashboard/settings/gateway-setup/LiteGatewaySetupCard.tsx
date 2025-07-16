
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Save, Plus, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LiteGatewaySetup, LiteGatewayMenuOption, CONTACT_TYPES } from "./types/liteGatewayTypes";
import LiteAddMenuOptionForm from "./components/LiteAddMenuOptionForm";
import LiteMenuOptionCard from "./components/LiteMenuOptionCard";

const LiteGatewaySetupCard = () => {
  const { toast } = useToast();

  const [gatewaySetup, setGatewaySetup] = useState<LiteGatewaySetup>({
    id: 'lite_gateway_1',
    name: 'My Gateway Setup',
    description: 'Navigate phone menus automatically',
    menuOptions: [],
    contactType: 'business',
    alwaysTryZero: false,
    fallbackToOperator: true,
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOption, setEditingOption] = useState<LiteGatewayMenuOption | null>(null);

  const handleBasicInfoChange = (field: keyof LiteGatewaySetup, value: any) => {
    setGatewaySetup(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date()
    }));
  };

  const handleAddMenuOption = (option: LiteGatewayMenuOption) => {
    setGatewaySetup(prev => ({
      ...prev,
      menuOptions: [...prev.menuOptions, option],
      updatedAt: new Date()
    }));
    setShowAddForm(false);

    toast({
      title: "Menu Option Added",
      description: "Your menu option has been added successfully.",
    });
  };

  const handleEditMenuOption = (option: LiteGatewayMenuOption) => {
    setEditingOption(option);
    setShowAddForm(true);
  };

  const handleDeleteMenuOption = (optionId: string) => {
    setGatewaySetup(prev => ({
      ...prev,
      menuOptions: prev.menuOptions.filter(opt => opt.id !== optionId),
      updatedAt: new Date()
    }));

    toast({
      title: "Menu Option Deleted",
      description: "The menu option has been removed.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Gateway Setup Saved",
      description: "Your gateway configuration has been saved successfully.",
    });
  };

  const isSetupComplete = gatewaySetup.menuOptions.length > 0 && gatewaySetup.name.trim() !== '';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            Gateway Setup (Lite)
            <Badge variant={isSetupComplete ? "default" : "secondary"}>
              {isSetupComplete ? "Configured" : "Setup Required"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Configure how your AI agent navigates phone menus and automated systems.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instructional Alert */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <strong>How it works:</strong> When your AI agent encounters a phone menu,
              it will use these options to navigate automatically. Add the common scenarios your agent will encounter.
            </AlertDescription>
          </Alert>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Setup Name</Label>
                <Input
                  value={gatewaySetup.name}
                  onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                  placeholder="e.g., Customer Service Navigation"
                />
              </div>

              <div className="space-y-2">
                <Label>Contact Type</Label>
                <Select
                  value={gatewaySetup.contactType}
                  onValueChange={(value) => handleBasicInfoChange('contactType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea
                value={gatewaySetup.description || ''}
                onChange={(e) => handleBasicInfoChange('description', e.target.value)}
                placeholder="Brief description of what this setup is for..."
                rows={2}
              />
            </div>
          </div>

          {/* Fallback Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fallback Options</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Always try pressing 0 first</div>
                  <div className="text-sm text-gray-600">
                    Attempt to reach operator by pressing 0 before trying other options
                  </div>
                </div>
                <Switch
                  checked={gatewaySetup.alwaysTryZero}
                  onCheckedChange={(checked) => handleBasicInfoChange('alwaysTryZero', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Fallback to operator</div>
                  <div className="text-sm text-gray-600">
                    Transfer to human operator if navigation fails
                  </div>
                </div>
                <Switch
                  checked={gatewaySetup.fallbackToOperator}
                  onCheckedChange={(checked) => handleBasicInfoChange('fallbackToOperator', checked)}
                />
              </div>
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
                <LiteMenuOptionCard
                  key={option.id}
                  option={option}
                  onEdit={handleEditMenuOption}
                  onDelete={handleDeleteMenuOption}
                />
              ))}

              {!showAddForm ? (
                <Button
                  onClick={() => setShowAddForm(true)}
                  variant="outline"
                  className="w-full border-dashed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Menu Option
                </Button>
              ) : (
                <LiteAddMenuOptionForm
                  onAdd={handleAddMenuOption}
                  onCancel={() => {
                    setShowAddForm(false);
                    setEditingOption(null);
                  }}
                />
              )}
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
    </div>
  );
};

export default LiteGatewaySetupCard;
