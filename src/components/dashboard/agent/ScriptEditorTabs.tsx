
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ObjectionResponse, ScriptVersion } from "./types/scriptTypes";
import GreetingEditor from "./GreetingEditor";
import MainScriptEditor from "./MainScriptEditor";
import ObjectionHandlingEditor from "./ObjectionHandlingEditor";
import SystemPromptEditor from "./SystemPromptEditor";
import ScriptVersionManager from "./ScriptVersionManager";

interface ScriptEditorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  greeting: string;
  tone: string;
  onGreetingChange: (greeting: string) => void;
  onToneChange: (tone: string) => void;
  mainPrompt: string;
  onMainPromptChange: (mainPrompt: string) => void;
  objectionResponses: ObjectionResponse[];
  onObjectionResponsesChange: (responses: ObjectionResponse[]) => void;
  systemPrompt: string;
  onSystemPromptChange: (systemPrompt: string) => void;
  scriptVersions: ScriptVersion[];
}

const ScriptEditorTabs = ({
  activeTab,
  onTabChange,
  greeting,
  tone,
  onGreetingChange,
  onToneChange,
  mainPrompt,
  onMainPromptChange,
  objectionResponses,
  onObjectionResponsesChange,
  systemPrompt,
  onSystemPromptChange,
  scriptVersions
}: ScriptEditorTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="greeting">Greeting</TabsTrigger>
        <TabsTrigger value="main-script">Main Script</TabsTrigger>
        <TabsTrigger value="objections">Objections</TabsTrigger>
        <TabsTrigger value="system-prompt">System Prompt</TabsTrigger>
        <TabsTrigger value="versions">Versions</TabsTrigger>
      </TabsList>

      <TabsContent value="greeting" className="space-y-4">
        <GreetingEditor
          greeting={greeting}
          tone={tone}
          onGreetingChange={onGreetingChange}
          onToneChange={onToneChange}
        />
      </TabsContent>

      <TabsContent value="main-script" className="space-y-4">
        <MainScriptEditor
          mainPrompt={mainPrompt}
          onMainPromptChange={onMainPromptChange}
        />
      </TabsContent>

      <TabsContent value="objections" className="space-y-4">
        <ObjectionHandlingEditor
          objectionResponses={objectionResponses}
          onObjectionResponsesChange={onObjectionResponsesChange}
        />
      </TabsContent>

      <TabsContent value="system-prompt" className="space-y-4">
        <SystemPromptEditor
          systemPrompt={systemPrompt}
          onSystemPromptChange={onSystemPromptChange}
        />
      </TabsContent>

      <TabsContent value="versions" className="space-y-4">
        <ScriptVersionManager scriptVersions={scriptVersions} />
      </TabsContent>
    </Tabs>
  );
};

export default ScriptEditorTabs;
