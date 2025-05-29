
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw, Clock, Eye } from "lucide-react";
import { ObjectionResponse, ScriptVersion } from "./types/scriptTypes";
import ScriptTemplateSelector from "./ScriptTemplateSelector";
import GreetingEditor from "./GreetingEditor";
import MainScriptEditor from "./MainScriptEditor";
import ObjectionHandlingEditor from "./ObjectionHandlingEditor";
import SystemPromptEditor from "./SystemPromptEditor";
import ScriptVersionManager from "./ScriptVersionManager";
import ScriptPreviewModal from "./ScriptPreviewModal";

const AgentPromptScript = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [greeting, setGreeting] = useState("");
  const [mainPrompt, setMainPrompt] = useState("");
  const [objectionResponses, setObjectionResponses] = useState<ObjectionResponse[]>([]);
  const [tone, setTone] = useState("professional");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [scriptVersions, setScriptVersions] = useState<ScriptVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("greeting");
  const { toast } = useToast();

  useEffect(() => {
    loadExistingData();
    loadScriptVersions();
    
    // Listen for template loading events
    const handleTemplateLoaded = (event: CustomEvent) => {
      const templateData = event.detail;
      setGreeting(templateData.greeting);
      setMainPrompt(templateData.mainPrompt);
      setTone(templateData.tone);
    };

    window.addEventListener('templateLoaded', handleTemplateLoaded as EventListener);
    
    return () => {
      window.removeEventListener('templateLoaded', handleTemplateLoaded as EventListener);
    };
  }, []);

  const loadExistingData = () => {
    // Load existing script from localStorage
    const savedAgent = localStorage.getItem('user_agent');
    if (savedAgent) {
      const agent = JSON.parse(savedAgent);
      if (agent.script) {
        // Try to parse structured script or use as main prompt
        try {
          const parsedScript = JSON.parse(agent.script);
          setGreeting(parsedScript.greeting || "");
          setMainPrompt(parsedScript.mainPrompt || agent.script);
          setObjectionResponses(parsedScript.objectionHandling || []);
          setTone(parsedScript.tone || "professional");
        } catch {
          setMainPrompt(agent.script);
        }
      }
    }

    // Load system prompt from localStorage
    const savedPrompt = localStorage.getItem('agent_system_prompt');
    if (savedPrompt) {
      setSystemPrompt(savedPrompt);
    } else {
      setSystemPrompt(`You are a professional AI sales agent. Your role is to make outbound calls to potential customers and engage them in meaningful conversations about our products/services.

Key guidelines:
- Be friendly, professional, and respectful
- Listen actively to the prospect's needs and concerns
- Handle objections gracefully and provide value
- Follow the provided sales script but adapt to the conversation flow
- Aim to qualify leads and book meetings when appropriate
- Always respect the prospect's time and preferences

Remember to stay on topic and maintain a conversational tone throughout the call.`);
    }
  };

  const loadScriptVersions = () => {
    const saved = localStorage.getItem('script_versions');
    if (saved) {
      setScriptVersions(JSON.parse(saved));
    }
  };

  const saveScriptVersion = () => {
    const newVersion: ScriptVersion = {
      id: Date.now().toString(),
      version: `v${scriptVersions.length + 1}.0`,
      title: `Script Version ${scriptVersions.length + 1}`,
      createdAt: new Date().toISOString(),
      content: {
        greeting,
        mainPrompt,
        objectionHandling: objectionResponses,
        tone
      }
    };

    const updatedVersions = [newVersion, ...scriptVersions];
    setScriptVersions(updatedVersions);
    localStorage.setItem('script_versions', JSON.stringify(updatedVersions));
  };

  const handleSaveScript = async () => {
    setIsLoading(true);
    try {
      // Create structured script object
      const scriptData = {
        greeting,
        mainPrompt,
        objectionHandling: objectionResponses,
        tone,
        systemPrompt
      };

      // Update the agent script in localStorage
      const savedAgent = localStorage.getItem('user_agent');
      if (savedAgent) {
        const agent = JSON.parse(savedAgent);
        agent.script = JSON.stringify(scriptData);
        agent.lastUpdated = new Date().toISOString();
        localStorage.setItem('user_agent', JSON.stringify(agent));
      }
      
      // Save system prompt
      localStorage.setItem('agent_system_prompt', systemPrompt);
      
      // Save version
      saveScriptVersion();
      
      setLastSaved(new Date());
      toast({
        title: "Script Saved Successfully",
        description: "Your sales script and system prompt have been updated.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save script. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportScript = () => {
    const scriptData = {
      systemPrompt,
      greeting,
      mainPrompt,
      objectionHandling: objectionResponses,
      tone,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(scriptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-script-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Script & Prompt Editor</h2>
          <p className="text-muted-foreground">
            Build comprehensive conversation flows and agent behavior
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastSaved && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSaveScript} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Script
          </Button>
        </div>
      </div>

      <ScriptTemplateSelector
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        onExport={exportScript}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
            onGreetingChange={setGreeting}
            onToneChange={setTone}
          />
        </TabsContent>

        <TabsContent value="main-script" className="space-y-4">
          <MainScriptEditor
            mainPrompt={mainPrompt}
            onMainPromptChange={setMainPrompt}
          />
        </TabsContent>

        <TabsContent value="objections" className="space-y-4">
          <ObjectionHandlingEditor
            objectionResponses={objectionResponses}
            onObjectionResponsesChange={setObjectionResponses}
          />
        </TabsContent>

        <TabsContent value="system-prompt" className="space-y-4">
          <SystemPromptEditor
            systemPrompt={systemPrompt}
            onSystemPromptChange={setSystemPrompt}
          />
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <ScriptVersionManager scriptVersions={scriptVersions} />
        </TabsContent>
      </Tabs>

      <ScriptPreviewModal
        greeting={greeting}
        mainPrompt={mainPrompt}
        objectionResponses={objectionResponses}
        tone={tone}
        showPreview={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default AgentPromptScript;
