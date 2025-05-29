
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw, FileText, MessageSquare, Clock } from "lucide-react";

const AgentPromptScript = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [salesScript, setSalesScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing script from localStorage
    const savedAgent = localStorage.getItem('user_agent');
    if (savedAgent) {
      const agent = JSON.parse(savedAgent);
      setSalesScript(agent.script || "");
    }

    // Load system prompt from localStorage if exists
    const savedPrompt = localStorage.getItem('agent_system_prompt');
    if (savedPrompt) {
      setSystemPrompt(savedPrompt);
    } else {
      // Set default system prompt
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
  }, []);

  const handleSavePrompt = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('agent_system_prompt', systemPrompt);
      setLastSaved(new Date());
      toast({
        title: "System Prompt Saved",
        description: "Your AI agent's system prompt has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save system prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveScript = async () => {
    setIsLoading(true);
    try {
      // Update the agent script in localStorage
      const savedAgent = localStorage.getItem('user_agent');
      if (savedAgent) {
        const agent = JSON.parse(savedAgent);
        agent.script = salesScript;
        agent.lastUpdated = new Date().toISOString();
        localStorage.setItem('user_agent', JSON.stringify(agent));
      }
      
      setLastSaved(new Date());
      toast({
        title: "Sales Script Saved",
        description: "Your sales script has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save sales script. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prompt & Script Management</h2>
          <p className="text-muted-foreground">
            Configure your AI agent's behavior and conversation flow
          </p>
        </div>
        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>

      <Tabs defaultValue="system-prompt" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="system-prompt" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            System Prompt
          </TabsTrigger>
          <TabsTrigger value="sales-script" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sales Script
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system-prompt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                System Prompt
              </CardTitle>
              <CardDescription>
                Define your AI agent's personality, behavior, and core instructions. 
                This sets the foundation for how your agent will interact with prospects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">System Instructions</Label>
                <Textarea
                  id="system-prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Enter your system prompt instructions..."
                  className="min-h-[300px] font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  This prompt defines your agent's personality and core behavior patterns.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSavePrompt} disabled={isLoading}>
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save System Prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales-script" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Sales Script
              </CardTitle>
              <CardDescription>
                Your conversation framework and key talking points. 
                The agent will use this as a guide while maintaining natural conversation flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sales-script">Script Content</Label>
                <Textarea
                  id="sales-script"
                  value={salesScript}
                  onChange={(e) => setSalesScript(e.target.value)}
                  placeholder="Enter your sales script here..."
                  className="min-h-[300px] font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  Include your opening, key points, objection handling, and closing techniques.
                </p>
              </div>
              
              <Alert>
                <AlertDescription>
                  Your script should include: opening statement, value proposition, 
                  common objections and responses, qualifying questions, and call-to-action.
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-2">
                <Button onClick={handleSaveScript} disabled={isLoading}>
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Sales Script
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentPromptScript;
