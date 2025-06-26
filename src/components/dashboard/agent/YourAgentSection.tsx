
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Settings, Rocket, CheckCircle, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import { useAuth } from "@/context";
import QuickStartIntegration from "./QuickStartIntegration";
import AgentOverview from "./AgentOverview";
import NewUserWelcome from "../shared/NewUserWelcome";

const YourAgentSection = () => {
  const { userAgent, hasCompletedSetup, progressState, user, updateProgressState } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [showQuickStart, setShowQuickStart] = useState(false);
  
  const hasAgent = !!userAgent;
  const setupComplete = hasCompletedSetup();

  console.log("🏠 YourAgentSection render:", {
    hasAgent,
    agentId: userAgent?.id,
    agentStatus: userAgent?.status,
    setupComplete,
    progressState,
    timestamp: new Date().toISOString()
  });

  const handleAgentCreated = () => {
    console.log("🎉 Agent created callback triggered");
    
    // Update progress state to reflect agent creation
    if (updateProgressState) {
      updateProgressState({
        agentConfigurationLevel: 'basic'
      });
    }
    
    // Force a re-render to update the UI
    setRefreshKey(prev => prev + 1);
    setShowQuickStart(false);
    
    // Small delay to ensure state has propagated
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
      console.log("🔄 Forced UI refresh after agent creation");
    }, 500);
  };

  const handleStartQuickSetup = () => {
    console.log("🚀 Starting quick setup");
    setShowQuickStart(true);
  };

  const handleRefreshState = () => {
    console.log("🔄 Manually refreshing state");
    setRefreshKey(prev => prev + 1);
  };

  // Show Quick Start wizard if requested
  if (showQuickStart) {
    return (
      <QuickStartIntegration 
        hasAgent={hasAgent} 
        onAgentCreated={handleAgentCreated}
      />
    );
  }

  return (
    <div key={refreshKey} className="space-y-6">
      {!hasAgent ? (
        <>
          {/* New User Welcome Experience */}
          <NewUserWelcome onStartQuickSetup={handleStartQuickSetup} />
        </>
      ) : (
        <>
          {/* Header for existing users */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Your AI Agent</h2>
              <p className="text-muted-foreground">
                Manage and optimize your AI calling agent
              </p>
            </div>
            
            {/* Status and controls */}
            <div className="flex items-center gap-3">
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
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Agent Active
              </Badge>
            </div>
          </div>

          {/* Success message for returning users */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">
                    🎉 {userAgent.name} is Active!
                  </p>
                  <p className="text-sm text-green-600">
                    Your AI agent is configured and ready to handle calls. All dashboard features are now unlocked!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Overview for Existing Users */}
          <AgentOverview />
          
          <Separator />
          
          {/* Quick Actions for Existing Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and settings for your AI agent
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <div className="font-medium mb-1">Update Script</div>
                <div className="text-sm text-gray-600">Modify your agent's conversation flow</div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <div className="font-medium mb-1">Voice Settings</div>
                <div className="text-sm text-gray-600">Change voice and personality</div>
              </Button>
              
              <Button 
                onClick={handleStartQuickSetup}
                variant="outline" 
                className="h-auto p-4 flex flex-col items-start"
              >
                <div className="font-medium mb-1">Quick Setup</div>
                <div className="text-sm text-gray-600">Run setup wizard again</div>
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Enhanced Debug Information Card - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
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
                <span className="text-gray-500">Agent Status:</span>
                <span className="ml-2 font-medium text-gray-800">
                  {userAgent?.status || 'None'}
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
              <div>
                <span className="text-gray-500">Refresh Key:</span>
                <span className="ml-2 font-medium text-gray-800">
                  {refreshKey}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default YourAgentSection;
