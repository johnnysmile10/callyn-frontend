
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Settings, Save, AlertCircle, CheckCircle, Crown, Zap, Brain } from "lucide-react";
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

  const [alwaysTryZero, setAlwaysTryZero] = useState(false);

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
    console.log('Saving gateway setup:', gatewaySetup, { alwaysTryZero });
    
    toast({
      title: "Gateway Setup Saved",
      description: "Your gateway configuration has been saved successfully.",
    });
  };

  const isSetupComplete = gatewaySetup.menuOptions.length > 0 && gatewaySetup.name.trim() !== '';

  return (
    <div className="space-y-6">
      {/* Main Gateway Setup Card */}
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
            Configure how your AI agent navigates phone menus and IVR systems. This helps your agent handle automated systems when making outbound calls.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instructional Alert */}
          <Alert className="bg-blue-50 border-blue-200">
            <Phone className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <strong>How it works:</strong> When your AI agent encounters a phone menu (like "Press 1 for sales"), 
              it will use these configured options to navigate automatically. Add common scenarios your agent will encounter.
            </AlertDescription>
          </Alert>

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

              <AddMenuOptionForm 
                onAdd={handleAddMenuOption}
                onAlwaysTryZeroChange={setAlwaysTryZero}
                alwaysTryZero={alwaysTryZero}
              />
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

      {/* Elite Features Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AI Learning Card */}
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Brain className="h-5 w-5" />
              AI Learning (Elite)
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Crown className="h-3 w-3 mr-1" />
                Coming Soon
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Advanced AI that learns from successful calls and automatically adapts to new menu systems.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Auto-detection of new menu options</li>
              <li>• Call success rate optimization</li>
              <li>• Intelligent fallback strategies</li>
            </ul>
          </CardContent>
        </Card>

        {/* Real-time Adaptation Card */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Zap className="h-5 w-5" />
              Real-time Adaptation (Elite)
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Crown className="h-3 w-3 mr-1" />
                Coming Soon
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Dynamic menu navigation that adapts to call context and customer responses in real-time.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Context-aware menu selection</li>
              <li>• Dynamic response timing</li>
              <li>• Intelligent retry mechanisms</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GatewaySetupCard;
