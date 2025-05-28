
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { finetunerApi, FinetunerResponse } from "@/services/finetunerApi";
import { Loader2, Zap, CheckCircle, AlertCircle, Settings, Play } from "lucide-react";

interface FinetunerIntegrationProps {
  onScriptGenerated: (script: string) => void;
  currentScript?: string;
  voiceSettings?: {
    voiceId: string;
    tone: string;
    language: string;
  };
}

const FinetunerIntegration = ({ 
  onScriptGenerated, 
  currentScript, 
  voiceSettings 
}: FinetunerIntegrationProps) => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [agentName, setAgentName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [lastResponse, setLastResponse] = useState<FinetunerResponse | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Fine-tuner.ai API key to connect.",
        variant: "destructive",
      });
      return;
    }

    try {
      finetunerApi.setApiKey(apiKey);
      // Test connection by listing agents
      await finetunerApi.listAgents();
      setIsConnected(true);
      toast({
        title: "Connected Successfully",
        description: "Fine-tuner.ai integration is now active.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to Fine-tuner.ai",
        variant: "destructive",
      });
    }
  };

  const handleGenerateScript = async () => {
    if (!prompt.trim() || !agentName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a prompt and agent name.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const requestData = {
        prompt,
        agent_name: agentName,
        voice_settings: voiceSettings,
        knowledge_base_update: true,
      };

      let response: FinetunerResponse;
      
      if (agentId) {
        // Update existing agent
        response = await finetunerApi.updateAgent(agentId, requestData);
      } else {
        // Create new agent
        response = await finetunerApi.createAgent(requestData);
        if (response.agent_id) {
          setAgentId(response.agent_id);
        }
      }

      setLastResponse(response);

      if (response.success) {
        // Generate the actual script
        const scriptResponse = await finetunerApi.generateScript(prompt, voiceSettings);
        onScriptGenerated(scriptResponse.script);
        
        toast({
          title: "Script Generated Successfully",
          description: "Your AI agent has been updated with the new script and knowledge base.",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate script",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateKnowledge = async () => {
    if (!agentId || !currentScript) {
      toast({
        title: "Cannot Update",
        description: "No agent or script available to update knowledge base.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await finetunerApi.updateKnowledgeBase(agentId, currentScript);
      if (response.success) {
        toast({
          title: "Knowledge Base Updated",
          description: "Your agent's knowledge base has been updated with the current script.",
        });
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update knowledge base",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Fine-tuner.ai Integration
        </CardTitle>
        <CardDescription>
          Generate and optimize scripts using Fine-tuner.ai's AI agents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">Fine-tuner.ai API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get your API key from Fine-tuner.ai dashboard
              </p>
            </div>
            <Button onClick={handleConnect} className="w-full">
              Connect to Fine-tuner.ai
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Connected to Fine-tuner.ai</span>
              {agentId && (
                <Badge variant="outline" className="text-xs">
                  Agent ID: {agentId.slice(0, 8)}...
                </Badge>
              )}
            </div>

            <div>
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="e.g., Sales Assistant v2"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="prompt">Script Generation Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what kind of script you want to generate..."
                className="mt-1 min-h-24"
              />
            </div>

            {voiceSettings && (
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm font-medium mb-2">Current Voice Settings:</p>
                <div className="text-xs space-y-1">
                  <div>Voice: {voiceSettings.voiceId}</div>
                  <div>Tone: {voiceSettings.tone}</div>
                  <div>Language: {voiceSettings.language}</div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={handleGenerateScript}
                disabled={isGenerating || !prompt.trim() || !agentName.trim()}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Script
                  </>
                )}
              </Button>
              
              {agentId && currentScript && (
                <Button 
                  variant="outline"
                  onClick={handleUpdateKnowledge}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Update KB
                </Button>
              )}
            </div>

            {lastResponse && (
              <Alert className={lastResponse.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <div className="flex items-center">
                  {lastResponse.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertTitle className={`ml-2 ${lastResponse.success ? "text-green-800" : "text-red-800"}`}>
                    {lastResponse.success ? "Success" : "Error"}
                  </AlertTitle>
                </div>
                <AlertDescription className={lastResponse.success ? "text-green-700" : "text-red-700"}>
                  {lastResponse.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinetunerIntegration;
