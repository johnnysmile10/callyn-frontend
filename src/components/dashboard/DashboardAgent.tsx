
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, FileText, Settings } from "lucide-react";
import AgentOverview from "./agent/AgentOverview";
import AgentPromptScript from "./agent/AgentPromptScript";
import AgentSettings from "./agent/AgentSettings";

const DashboardAgent = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Bot className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent</h1>
          <p className="text-gray-600">
            Manage your AI calling agent, scripts, and configuration
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="prompt-script" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Prompt & Script
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AgentOverview />
        </TabsContent>

        <TabsContent value="prompt-script" className="space-y-6">
          <AgentPromptScript />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <AgentSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAgent;
