
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { finetunerApi } from "@/services/finetunerApi";
import { ArrowLeft, Zap, Loader2, CheckCircle, Bot } from "lucide-react";

interface QuickAgentCreatorProps {
  onAgentCreated: (agentData: { agentId: string; agentName: string; script: string }) => void;
  onCancel: () => void;
}

const QuickAgentCreator = ({ onAgentCreated, onCancel }: QuickAgentCreatorProps) => {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState("");
  const [agentName, setAgentName] = useState("");
  const [script, setScript] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Get user email for agent naming (fallback to generic name)
  const getUserEmail = () => {
    // In a real app, this would come from auth context
    return localStorage.getItem('user_email') || 'user';
  };

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Fine-tuner.ai API key to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      finetunerApi.setApiKey(apiKey);
      await finetunerApi.listAgents();
      setIsConnected(true);
      
      // Auto-generate agent name
      const userEmail = getUserEmail();
      setAgentName(`${userEmail} - AI Agent`);
      
      setStep(2);
      toast({
        title: "Connected Successfully",
        description: "Fine-tuner.ai is connected. Now let's create your agent.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to Fine-tuner.ai",
        variant: "destructive",
      });
    }
  };

  const handleCreateAgent = async () => {
    if (!script.trim()) {
      toast({
        title: "Script Required",
        description: "Please enter your sales script to train your AI agent.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      // Create agent with automatic knowledge base
      const response = await finetunerApi.createAgent({
        prompt: script,
        agent_name: agentName,
        knowledge_base_update: true,
        voice_settings: {
          voice_id: "default",
          tone: "professional",
          language: "en"
        }
      });

      if (response.success && response.agent_id) {
        // Update knowledge base with the script
        await finetunerApi.updateKnowledgeBase(response.agent_id, script);

        onAgentCreated({
          agentId: response.agent_id,
          agentName: agentName,
          script: script
        });
      } else {
        throw new Error(response.message || "Failed to create agent");
      }
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Failed to create AI agent",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Create Your AI Agent</h2>
          <p className="text-muted-foreground">
            Step {step} of 2: {step === 1 ? "Connect Fine-tuner.ai" : "Add Your Script"}
          </p>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Connect Fine-tuner.ai
            </CardTitle>
            <CardDescription>
              We'll use Fine-tuner.ai to create and train your personal AI agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                Get your API key from{" "}
                <a href="https://fine-tuner.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Fine-tuner.ai dashboard
                </a>
              </p>
            </div>
            
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>What happens next:</strong> We'll automatically create your agent, 
                set up the knowledge base, and train it with your script - all in one step.
              </AlertDescription>
            </Alert>
            
            <Button onClick={handleConnect} className="w-full" disabled={!apiKey.trim()}>
              Connect & Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-green-600" />
              Add Your Sales Script
            </CardTitle>
            <CardDescription>
              Your AI agent will be trained to follow this script when calling leads
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="e.g., John - Sales Agent"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="script">Sales Script</Label>
              <Textarea
                id="script"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Enter your sales script here...

Example:
Hi [Name], this is [Agent Name] calling from [Company]. 
I'm reaching out because we help businesses like yours...
"
                className="mt-1 min-h-[200px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use [Name] and [Company] placeholders - they'll be automatically replaced
              </p>
            </div>

            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                <strong>Ready to create:</strong> Your agent will be trained on this script 
                and ready to call leads within minutes.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} disabled={isCreating}>
                Back
              </Button>
              <Button 
                onClick={handleCreateAgent} 
                disabled={isCreating || !script.trim()}
                className="flex-1"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Your AI Agent...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Create AI Agent
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuickAgentCreator;
