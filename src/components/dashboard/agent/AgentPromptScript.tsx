
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  RefreshCw, 
  FileText, 
  MessageSquare, 
  Clock, 
  Eye, 
  History,
  Plus,
  Trash2,
  Copy,
  Download,
  Upload
} from "lucide-react";

interface ObjectionResponse {
  objection: string;
  response: string;
}

interface ScriptVersion {
  id: string;
  version: string;
  title: string;
  createdAt: string;
  content: {
    greeting: string;
    mainPrompt: string;
    objectionHandling: ObjectionResponse[];
    tone: string;
  };
}

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

  const addObjectionResponse = () => {
    setObjectionResponses([...objectionResponses, { objection: "", response: "" }]);
  };

  const updateObjectionResponse = (index: number, field: 'objection' | 'response', value: string) => {
    const updated = objectionResponses.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setObjectionResponses(updated);
  };

  const removeObjectionResponse = (index: number) => {
    setObjectionResponses(objectionResponses.filter((_, i) => i !== index));
  };

  const loadTemplate = (template: string) => {
    const templates = {
      "cold-call": {
        greeting: "Hi [Name], this is [Your Name] from [Company]. I hope I'm not catching you at a bad time. I'm calling because we've been helping businesses like yours [specific benefit]. Do you have just 30 seconds for me to explain why I called?",
        mainPrompt: "Our solution has helped companies reduce costs by 30% while improving efficiency. I'd love to show you exactly how we've done this for businesses in your industry. Would you be open to a brief 15-minute conversation this week to explore if this could benefit your company?",
        tone: "friendly"
      },
      "follow-up": {
        greeting: "Hi [Name], this is [Your Name] from [Company]. We spoke [timeframe] about [previous topic]. I wanted to follow up on our conversation and share some additional information that might be valuable for your business.",
        mainPrompt: "Based on our previous discussion about [specific pain point], I've prepared a customized proposal that addresses your exact needs. I believe this could save your company significant time and resources. When would be a good time to review this together?",
        tone: "professional"
      },
      "referral": {
        greeting: "Hi [Name], this is [Your Name] from [Company]. [Referrer Name] suggested I reach out to you because [reason for referral]. They thought you might be interested in learning about [solution].",
        mainPrompt: "[Referrer Name] mentioned that you were looking for ways to [specific need]. We've helped [Referrer Name]'s company achieve [specific result], and I believe we could do something similar for you. Would you be interested in a brief conversation about how this might apply to your situation?",
        tone: "warm"
      }
    };

    if (templates[template as keyof typeof templates]) {
      const selectedTemplate = templates[template as keyof typeof templates];
      setGreeting(selectedTemplate.greeting);
      setMainPrompt(selectedTemplate.mainPrompt);
      setTone(selectedTemplate.tone);
      
      toast({
        title: "Template Loaded",
        description: `${template.replace('-', ' ')} template has been applied to your script.`,
      });
    }
  };

  const previewScript = () => {
    setShowPreview(true);
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
          <Button variant="outline" onClick={previewScript}>
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

      {/* Script Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Templates</CardTitle>
          <CardDescription>
            Choose a template to get started quickly, then customize as needed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Select value={selectedTemplate} onValueChange={(value) => {
              setSelectedTemplate(value);
              loadTemplate(value);
            }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Choose template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cold-call">Cold Call</SelectItem>
                <SelectItem value="follow-up">Follow-up Call</SelectItem>
                <SelectItem value="referral">Referral Call</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportScript}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Script Editor */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="greeting">Greeting</TabsTrigger>
          <TabsTrigger value="main-script">Main Script</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
          <TabsTrigger value="system-prompt">System Prompt</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="greeting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Opening & Greeting</CardTitle>
              <CardDescription>
                Craft the perfect opening that captures attention and sets the tone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="greeting">Opening Message</Label>
                <Textarea
                  id="greeting"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="Hi [Name], this is [Your Name] from [Company]..."
                  className="min-h-24"
                />
                <p className="text-sm text-muted-foreground">
                  Use placeholders like [Name], [Company], [Your Name] for dynamic content
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Conversation Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="main-script" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Main Sales Script</CardTitle>
              <CardDescription>
                Your core value proposition and conversation flow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="main-script">Sales Script Content</Label>
                <Textarea
                  id="main-script"
                  value={mainPrompt}
                  onChange={(e) => setMainPrompt(e.target.value)}
                  placeholder="Our solution helps businesses like yours..."
                  className="min-h-48"
                />
              </div>

              <Alert>
                <AlertDescription>
                  Include: value proposition, qualifying questions, key benefits, 
                  social proof, and clear call-to-action in your script.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Objection Handling</span>
                <Button onClick={addObjectionResponse} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Objection
                </Button>
              </CardTitle>
              <CardDescription>
                Prepare responses for common objections to keep conversations flowing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {objectionResponses.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    Add common objections and their responses to help your agent handle rejections gracefully.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {objectionResponses.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Objection #{index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeObjectionResponse(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Common Objection</Label>
                        <Input
                          value={item.objection}
                          onChange={(e) => updateObjectionResponse(index, 'objection', e.target.value)}
                          placeholder="e.g., 'I'm not interested' or 'We're happy with our current solution'"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Your Response</Label>
                        <Textarea
                          value={item.response}
                          onChange={(e) => updateObjectionResponse(index, 'response', e.target.value)}
                          placeholder="How should the agent respond to this objection?"
                          className="min-h-20"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-prompt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                System Prompt
              </CardTitle>
              <CardDescription>
                Define your AI agent's personality, behavior, and core instructions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">System Instructions</Label>
                <Textarea
                  id="system-prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="You are a professional AI sales agent..."
                  className="min-h-64 font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  This defines your agent's core personality and behavior patterns.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Script Version History
              </CardTitle>
              <CardDescription>
                Track and manage different versions of your scripts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scriptVersions.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    No saved versions yet. Save your current script to create the first version.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3">
                  {scriptVersions.map((version) => (
                    <div key={version.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{version.version}</Badge>
                          <span className="font-medium">{version.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {new Date(version.createdAt).toLocaleDateString()}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {version.content.greeting.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Modal would go here - keeping it simple for now */}
      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Script Preview</span>
              <Button variant="ghost" onClick={() => setShowPreview(false)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Greeting ({tone} tone)</h4>
                <p className="text-sm bg-muted p-3 rounded">{greeting}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Main Script</h4>
                <p className="text-sm bg-muted p-3 rounded">{mainPrompt}</p>
              </div>
              {objectionResponses.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Objection Handling ({objectionResponses.length} responses)</h4>
                    <div className="space-y-2">
                      {objectionResponses.slice(0, 2).map((item, index) => (
                        <div key={index} className="text-sm bg-muted p-2 rounded">
                          <p className="font-medium">"{item.objection}"</p>
                          <p className="text-muted-foreground">→ {item.response}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentPromptScript;
