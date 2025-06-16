import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Settings, BarChart3, Rocket, Phone, MessageSquare } from "lucide-react";
import { useAuth } from "@/context";
import AgentOverview from "./AgentOverview";
import AgentSettings from "./AgentSettings";
import TestAgentPanel from "./TestAgentPanel";
import QuickStartIntegration from "./QuickStartIntegration";
import CoachingAnalysisPanel from "../coaching/CoachingAnalysisPanel";

const YourAgentSection = () => {
  const { userAgent } = useAuth();
  const [activeTab, setActiveTab] = useState(userAgent ? "overview" : "quick-start");

  const handleAgentCreated = () => {
    setActiveTab("overview");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Agent</h1>
          <p className="text-gray-600 mt-1">
            {userAgent 
              ? "Manage and optimize your AI calling agent" 
              : "Create your first AI calling agent"
            }
          </p>
        </div>
        {userAgent && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Bot className="h-3 w-3 mr-1" />
              Active
            </Badge>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Test Agent
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
          <TabsTrigger value="quick-start" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Quick Start
          </TabsTrigger>
          <TabsTrigger value="overview" disabled={!userAgent} className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="settings" disabled={!userAgent} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="test" disabled={!userAgent} className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Test
          </TabsTrigger>
          <TabsTrigger value="coaching" disabled={!userAgent} className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Coaching
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-start" className="space-y-6">
          <QuickStartIntegration 
            hasAgent={!!userAgent}
            onAgentCreated={handleAgentCreated}
          />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {userAgent ? (
            <AgentOverview />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Agent Found</CardTitle>
                <CardDescription>
                  You need to create an agent first using the Quick Start wizard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setActiveTab("quick-start")}>
                  <Rocket className="h-4 w-4 mr-2" />
                  Start Quick Setup
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {userAgent ? (
            <AgentSettings />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Settings Unavailable</CardTitle>
                <CardDescription>
                  Create an agent first to access settings.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          {userAgent ? (
            <TestAgentPanel />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Testing Unavailable</CardTitle>
                <CardDescription>
                  Create an agent first to test functionality.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="coaching" className="space-y-6">
          {userAgent ? (
            <CoachingAnalysisPanel />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Coaching Unavailable</CardTitle>
                <CardDescription>
                  Create an agent and make some calls to see coaching insights.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YourAgentSection;
