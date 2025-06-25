import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Phone, Save, Brain, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EliteGatewaySetup, EliteGlobalSettings } from "./types/eliteGatewayTypes";
import EliteMenuOptionsManager from "./components/EliteMenuOptionsManager";
import EliteGlobalSettingsPanel from "./components/EliteGlobalSettingsPanel";
import EliteAILearningPanel from "./components/EliteAILearningPanel";

const EliteGatewaySetupCard = () => {
  const { toast } = useToast();
  
  // Mock Elite gateway setup data
  const [eliteGatewaySetup, setEliteGatewaySetup] = useState<EliteGatewaySetup>({
    id: 'elite_gateway_1',
    name: 'Elite Gateway Setup',
    description: 'Advanced AI-powered gateway configuration with multi-language support and adaptive learning',
    menuOptions: [],
    globalSettings: {
      fallbackToOperator: true,
      maxCallDuration: 300,
      adaptiveLearning: true,
      confidenceThreshold: 0.7,
      enableRealTimeAdaptation: true
    },
    aiLearningEnabled: true,
    voiceDetectionEnabled: true,
    multiLanguageEnabled: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const handleSave = () => {
    console.log('Saving Elite gateway setup:', eliteGatewaySetup);
    
    toast({
      title: "Elite Gateway Setup Saved",
      description: "Your advanced gateway configuration has been saved with AI learning enabled.",
    });
  };

  const handleGlobalSettingsChange = (settings: Partial<EliteGlobalSettings>) => {
    setEliteGatewaySetup(prev => ({
      ...prev,
      globalSettings: { ...prev.globalSettings, ...settings },
      updatedAt: new Date()
    }));
  };

  const isSetupComplete = eliteGatewaySetup.menuOptions.length > 0 && eliteGatewaySetup.name.trim() !== '';

  return (
    <div className="space-y-6">
      {/* Elite Gateway Setup Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-600" />
            Elite Gateway Setup
            <Badge className="bg-purple-100 text-purple-700 border-purple-300">
              <Crown className="h-3 w-3 mr-1" />
              Elite
            </Badge>
            <Badge variant={isSetupComplete ? "default" : "secondary"}>
              {isSetupComplete ? "Configured" : "Setup Required"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Advanced AI-powered gateway navigation with multi-language support, voice recognition, 
            adaptive learning, and real-time optimization for maximum call success rates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Elite Features Alert */}
          <Alert className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <Brain className="h-4 w-4 text-purple-600" />
            <AlertDescription>
              <strong>Elite Features Active:</strong> AI Learning, Voice Detection, Multi-Language Support, 
              Real-time Adaptation for superior call navigation.
            </AlertDescription>
          </Alert>

          {/* Elite Features Tabs */}
          <Tabs defaultValue="menu-options" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="menu-options" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Menu Options
              </TabsTrigger>
              <TabsTrigger value="ai-learning" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Learning
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Global Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="menu-options" className="space-y-4">
              <EliteMenuOptionsManager
                gatewaySetup={eliteGatewaySetup}
                onMenuOptionsChange={(options) => 
                  setEliteGatewaySetup(prev => ({ ...prev, menuOptions: options, updatedAt: new Date() }))
                }
              />
            </TabsContent>

            <TabsContent value="ai-learning" className="space-y-4">
              <EliteAILearningPanel gatewaySetup={eliteGatewaySetup} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <EliteGlobalSettingsPanel 
                settings={eliteGatewaySetup.globalSettings}
                onSettingsChange={handleGlobalSettingsChange}
              />
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={handleSave} 
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Elite Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EliteGatewaySetupCard;
