
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GatewaySetupData } from "./types/gatewayTypes";
import GatewayBasicInfoSection from "./GatewayBasicInfoSection";
import GatewaySetupStatus from "./GatewaySetupStatus";
import GatewayMenuOptionsList from "./GatewayMenuOptionsList";
import GatewayElitePreviewCards from "./GatewayElitePreviewCards";
import LiteGatewaySetupCard from "./LiteGatewaySetupCard";
import { useAuth } from "@/context";

const GatewaySetupCard = () => {
  const { toast } = useToast();
  const { userAgent } = useAuth();

  // If user has no agent, show the lite version
  if (!userAgent) {
    return <LiteGatewaySetupCard />;
  }

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

  const handleMenuOptionsChange = (menuOptions: any[]) => {
    setGatewaySetup(prev => ({
      ...prev,
      menuOptions,
      updatedAt: new Date()
    }));
  };

  const handleSave = () => {
    // In real app, this would save to backend
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
          <GatewayBasicInfoSection
            gatewaySetup={gatewaySetup}
            onFieldChange={handleBasicInfoChange}
          />

          {/* Setup Status */}
          <GatewaySetupStatus
            gatewaySetup={gatewaySetup}
            isSetupComplete={isSetupComplete}
          />

          {/* Menu Options */}
          <GatewayMenuOptionsList
            gatewaySetup={gatewaySetup}
            onMenuOptionsChange={handleMenuOptionsChange}
            alwaysTryZero={alwaysTryZero}
            onAlwaysTryZeroChange={setAlwaysTryZero}
          />

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
      <GatewayElitePreviewCards />
    </div>
  );
};

export default GatewaySetupCard;
