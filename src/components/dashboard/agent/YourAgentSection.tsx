
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Settings, Rocket, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/context";
import QuickStartIntegration from "./QuickStartIntegration";
import AgentOverview from "./AgentOverview";

const YourAgentSection = () => {
  const { userAgent, hasCompletedSetup, progressState } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  
  const hasAgent = !!userAgent;
  const setupComplete = hasCompletedSetup();

  console.log("YourAgentSection render:", {
    hasAgent,
    agentId: userAgent?.id,
    setupComplete,
    progressState,
    timestamp: new Date().toISOString()
  });

  const handleAgentCreated = () => {
    console.log("Agent created callback triggered");
    // Force a re-render to update the UI
    setRefreshKey(prev => prev + 1);
    
    // Small delay to ensure state has propagated
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 500);
  };

  const handleRefreshState = () => {
    console.log("Manually refreshing state");
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div key={refreshKey} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your AI Agent</h2>
          <p className="text-muted-foreground">
            Create and manage your AI calling agent
          </p>
        </div>
        
        {/* Debug/Refresh Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshState}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {hasAgent ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Agent Active
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                No Agent
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Debug Information Card */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600">Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-500">Agent Exists:</span>
              <span className={`ml-2 font-medium ${hasAgent ? 'text-green-600' : 'text-red-600'}`}>
                {hasAgent ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Agent ID:</span>
              <span className="ml-2 font-medium text-gray-800">
                {userAgent?.id ? userAgent.id.substring(0, 12) + '...' : 'None'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Setup Complete:</span>
              <span className={`ml-2 font-medium ${setupComplete ? 'text-green-600' : 'text-red-600'}`}>
                {setupComplete ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Config Level:</span>
              <span className="ml-2 font-medium text-gray-800">
                {progressState.agentConfigurationLevel}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {!hasAgent ? (
        <>
          {/* Quick Start Integration for New Users */}
          <QuickStartIntegration 
            hasAgent={hasAgent} 
            onAgentCreated={handleAgentCreated}
          />
          
          {/* Alternative Manual Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                Advanced Setup
              </CardTitle>
              <CardDescription>
                For advanced users who want full control over their agent configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Skip the Quick Start and configure your agent manually with full customization options.
              </p>
              <Button variant="outline" disabled>
                <Settings className="mr-2 h-4 w-4" />
                Manual Configuration (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Agent Overview for Existing Users */}
          <AgentOverview />
          
          <Separator />
          
          {/* Additional Quick Start for Existing Users */}
          <QuickStartIntegration 
            hasAgent={hasAgent} 
            onAgentCreated={handleAgentCreated}
          />
        </>
      )}
    </div>
  );
};

export default YourAgentSection;
