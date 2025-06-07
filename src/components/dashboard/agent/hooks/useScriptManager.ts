
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ObjectionResponse, ScriptVersion } from "../types/scriptTypes";

export const useScriptManager = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [greeting, setGreeting] = useState("");
  const [mainPrompt, setMainPrompt] = useState("");
  const [objectionResponses, setObjectionResponses] = useState<ObjectionResponse[]>([]);
  const [tone, setTone] = useState("professional");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [scriptVersions, setScriptVersions] = useState<ScriptVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
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

  return {
    // State
    systemPrompt,
    greeting,
    mainPrompt,
    objectionResponses,
    tone,
    selectedTemplate,
    scriptVersions,
    isLoading,
    lastSaved,
    // Setters
    setSystemPrompt,
    setGreeting,
    setMainPrompt,
    setObjectionResponses,
    setTone,
    setSelectedTemplate,
    // Actions
    handleSaveScript,
    exportScript
  };
};
