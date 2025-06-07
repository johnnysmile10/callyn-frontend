
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot } from "lucide-react";
import AgentSetupTab from "./agent/AgentSetupTab";

const DashboardAgentBuilder = () => {
  const [activeTab, setActiveTab] = useState("agent-setup");

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
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="agent-setup" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Agent Setup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agent-setup" className="space-y-6">
          <AgentSetupTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAgentBuilder;
