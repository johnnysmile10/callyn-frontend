
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { finetunerApi } from "@/services/finetunerApi";
import { User, Bot, CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";
import QuickAgentCreator from "./QuickAgentCreator";
import AgentStatusCard from "./AgentStatusCard";

interface UserAgent {
  id: string;
  name: string;
  status: "ready" | "training" | "not_created" | "error";
  script?: string;
  createdAt?: string;
  lastUpdated?: string;
}

const PersonalAgentManager = () => {
  const [userAgent, setUserAgent] = useState<UserAgent | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUserAgent();
  }, []);

  const loadUserAgent = async () => {
    setIsLoading(true);
    try {
      // Check localStorage first
      const savedAgent = localStorage.getItem('user_agent');
      if (savedAgent) {
        const agent = JSON.parse(savedAgent);
        setUserAgent(agent);
        
        // Verify agent still exists in Fine-tuner
        if (agent.id) {
          try {
            await finetunerApi.getAgent(agent.id);
            // Agent exists, update status if needed
            if (agent.status === 'training') {
              // Check if training is complete
              updateAgentStatus(agent.id);
            }
          } catch (error) {
            // Agent doesn't exist anymore
            localStorage.removeItem('user_agent');
            setUserAgent(null);
          }
        }
      }
    } catch (error) {
      console.error('Error loading user agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAgentStatus = async (agentId: string) => {
    try {
      const agent = await finetunerApi.getAgent(agentId);
      const updatedAgent: UserAgent = {
        ...userAgent!,
        status: 'ready', // Assume ready if we can fetch it
        lastUpdated: new Date().toISOString()
      };
      
      setUserAgent(updatedAgent);
      localStorage.setItem('user_agent', JSON.stringify(updatedAgent));
    } catch (error) {
      console.error('Error updating agent status:', error);
    }
  };

  const handleAgentCreated = (agentData: { agentId: string; agentName: string; script: string }) => {
    const newAgent: UserAgent = {
      id: agentData.agentId,
      name: agentData.agentName,
      status: 'training',
      script: agentData.script,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setUserAgent(newAgent);
    localStorage.setItem('user_agent', JSON.stringify(newAgent));
    setShowCreator(false);

    toast({
      title: "AI Agent Created",
      description: "Your personal AI agent is being trained and will be ready shortly.",
    });

    // Check status after a delay
    setTimeout(() => updateAgentStatus(agentData.agentId), 5000);
  };

  const handleScriptUpdate = async (newScript: string) => {
    if (!userAgent?.id) return;

    try {
      await finetunerApi.updateKnowledgeBase(userAgent.id, newScript);
      
      const updatedAgent = {
        ...userAgent,
        script: newScript,
        status: 'training' as const,
        lastUpdated: new Date().toISOString()
      };

      setUserAgent(updatedAgent);
      localStorage.setItem('user_agent', JSON.stringify(updatedAgent));

      toast({
        title: "Script Updated",
        description: "Your AI agent is being retrained with the new script.",
      });

      // Check status after delay
      setTimeout(() => updateAgentStatus(userAgent.id), 3000);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update agent script",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 animate-spin" />
            <span>Loading your AI agent...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showCreator) {
    return (
      <QuickAgentCreator 
        onAgentCreated={handleAgentCreated}
        onCancel={() => setShowCreator(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-600" />
            My AI Agent
          </h2>
          <p className="text-muted-foreground">
            Your personal AI caller that knows your script and talks like you
          </p>
        </div>
        
        {!userAgent && (
          <Button onClick={() => setShowCreator(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create AI Agent
          </Button>
        )}
      </div>

      {userAgent ? (
        <AgentStatusCard 
          agent={userAgent}
          onScriptUpdate={handleScriptUpdate}
          onRecreateAgent={() => setShowCreator(true)}
        />
      ) : (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>No AI Agent Yet</CardTitle>
            <CardDescription>
              Create your personal AI agent to start making calls with your custom script
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setShowCreator(true)} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Your AI Agent
            </Button>
            
            <div className="mt-6 text-left">
              <h4 className="font-medium mb-2">What you'll get:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI agent trained on your specific script</li>
                <li>• Automatic knowledge base creation</li>
                <li>• Ready to call your leads immediately</li>
                <li>• Easy script updates and retraining</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonalAgentManager;
