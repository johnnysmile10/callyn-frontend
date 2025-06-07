
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, FileText } from "lucide-react";
import PersonalAgentManager from "../PersonalAgentManager";
import AgentPromptScript from "./AgentPromptScript";

const AgentSetupTab = () => {
  const [activeSubTab, setActiveSubTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Agent Setup</h2>
        <p className="text-gray-600">
          Configure your agent profile and conversation scripts
        </p>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Agent Profile
          </TabsTrigger>
          <TabsTrigger value="script" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Script & Voice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <PersonalAgentManager />
        </TabsContent>

        <TabsContent value="script" className="space-y-6">
          <AgentPromptScript />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentSetupTab;
