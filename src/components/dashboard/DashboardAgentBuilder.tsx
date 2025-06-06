
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, FileText, Settings, PlayCircle } from "lucide-react";
import PersonalAgentManager from "./PersonalAgentManager";
import AgentPromptScript from "./agent/AgentPromptScript";
import AgentSettings from "./agent/AgentSettings";
import TestAgentPanel from "./agent/TestAgentPanel";

const DashboardAgentBuilder = () => {
  const [activeTab, setActiveTab] = useState("setup");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Bot className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Builder</h1>
          <p className="text-gray-600">
            Create and configure your AI calling agent
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="script" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Script & Voice
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <PersonalAgentManager />
        </TabsContent>

        <TabsContent value="script" className="space-y-6">
          <AgentPromptScript />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <AgentSettings />
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <TestAgentPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAgentBuilder;
