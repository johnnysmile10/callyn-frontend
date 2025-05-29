
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bot, Save } from "lucide-react";

interface SimpleAgentCreatorProps {
  onAgentCreated: (agentData: { agentId: string; agentName: string; script: string }) => void;
  onCancel: () => void;
}

const SimpleAgentCreator = ({ onAgentCreated, onCancel }: SimpleAgentCreatorProps) => {
  const [agentName, setAgentName] = useState("");
  const [script, setScript] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateAgent = async () => {
    if (!agentName.trim() || !script.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both agent name and script.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate creation delay
    setTimeout(() => {
      const agentId = `agent_${Date.now()}`;
      
      onAgentCreated({
        agentId,
        agentName: agentName.trim(),
        script: script.trim()
      });

      toast({
        title: "AI Agent Created",
        description: "Your personal AI agent has been created successfully.",
      });
      
      setIsCreating(false);
    }, 1000);
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
            Set up your personal AI calling agent
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Agent Configuration
          </CardTitle>
          <CardDescription>
            Configure your AI agent with a name and sales script
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="agentName">Agent Name</Label>
            <Input
              id="agentName"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g., John's Sales Agent"
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
I'm reaching out because we help businesses like yours improve their sales process.

Would you be interested in learning more about how we can help you increase your conversion rates?"
              className="mt-1 min-h-[200px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use [Name], [Company], and [Agent Name] as placeholders
            </p>
          </div>

          <Alert>
            <Bot className="h-4 w-4" />
            <AlertDescription>
              Your agent will be created locally and ready to use immediately. 
              You can always edit the script later.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel} disabled={isCreating}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAgent} 
              disabled={isCreating || !agentName.trim() || !script.trim()}
              className="flex-1"
            >
              {isCreating ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-pulse" />
                  Creating Agent...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Create Agent
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleAgentCreator;
