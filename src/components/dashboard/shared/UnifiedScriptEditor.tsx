
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FileText, Save, RotateCcw, Eye, User, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UnifiedScriptEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialScript?: string;
  initialPersonality?: string;
  initialUseSmallTalk?: boolean;
  initialHandleObjections?: boolean;
  onSave: (data: {
    script: string;
    personality: string;
    useSmallTalk: boolean;
    handleObjections: boolean;
  }) => void;
}

const SCRIPT_TEMPLATES = [
  {
    id: "greeting",
    name: "Professional Greeting",
    category: "Opening",
    content: `Hello! This is [Agent Name] calling from [Company]. I hope I'm not catching you at a bad time.

I'm reaching out because we help businesses like yours [value proposition]. 

I'd love to learn more about your current challenges with [relevant area] and see if there might be a good fit for us to work together.

Would you have just a few minutes to chat, or would there be a better time for me to call back?`
  },
  {
    id: "appointment",
    name: "Appointment Setting",
    category: "Booking",
    content: `Hi! This is [Agent Name] from [Company]. 

I'm calling to schedule a brief consultation with [Contact Name] about [service/product]. We've been helping companies in your industry with [specific benefit].

I have some availability this week - would [Day] at [Time] work for a 15-minute call, or would [Alternative Day] at [Alternative Time] be better?`
  },
  {
    id: "followup",
    name: "Follow-up Call",
    category: "Nurturing",
    content: `Hello [Contact Name], this is [Agent Name] from [Company].

I wanted to follow up on our previous conversation about [topic]. You mentioned you were interested in [specific interest].

I have some new information that I think would be valuable for you. Do you have a few minutes to chat, or should I schedule a time that works better for you?`
  },
  {
    id: "objection-price",
    name: "Price Objection Handler",
    category: "Objections",
    content: `I understand that budget is always a consideration. Let me ask you this - what's the cost of not solving this problem? 

From what you've told me, it sounds like [restate their pain point]. Our solution typically pays for itself within [timeframe] by [specific benefit].

Would it be helpful if I showed you exactly how that works in a quick 15-minute demo?`
  },
  {
    id: "objection-time",
    name: "Time Objection Handler",
    category: "Objections",
    content: `I completely understand that you're busy. That's exactly why I think this could be valuable for you.

Our solution is designed specifically for busy [role] like yourself to [save time/automate process/etc.]. Most of our clients say it actually gives them back several hours per week.

What if we scheduled just 10 minutes next week when you have a bit more breathing room?`
  }
];

const PERSONALITIES = [
  { 
    id: "professional", 
    name: "Professional", 
    description: "Formal, courteous, and business-focused",
    icon: "👔"
  },
  { 
    id: "friendly", 
    name: "Friendly", 
    description: "Warm, approachable, and conversational",
    icon: "😊"
  },
  { 
    id: "enthusiastic", 
    name: "Enthusiastic", 
    description: "Energetic, passionate, and motivating",
    icon: "🚀"
  },
  { 
    id: "consultative", 
    name: "Consultative", 
    description: "Advisory, helpful, and solution-oriented",
    icon: "🤝"
  }
];

const UnifiedScriptEditor = ({ 
  isOpen, 
  onClose, 
  initialScript = "", 
  initialPersonality = "professional",
  initialUseSmallTalk = false,
  initialHandleObjections = false,
  onSave 
}: UnifiedScriptEditorProps) => {
  const [script, setScript] = useState(initialScript);
  const [personality, setPersonality] = useState(initialPersonality);
  const [useSmallTalk, setUseSmallTalk] = useState(initialUseSmallTalk);
  const [handleObjections, setHandleObjections] = useState(initialHandleObjections);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("script");

  const handleScriptChange = (value: string) => {
    setScript(value);
    setHasChanges(true);
  };

  const handlePersonalityChange = (value: string) => {
    setPersonality(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave({
      script,
      personality,
      useSmallTalk,
      handleObjections
    });
    setHasChanges(false);
    toast({
      title: "Script Saved",
      description: "Your script and personality settings have been saved successfully.",
    });
  };

  const handleReset = () => {
    setScript(initialScript);
    setPersonality(initialPersonality);
    setUseSmallTalk(initialUseSmallTalk);
    setHandleObjections(initialHandleObjections);
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: "Script and personality settings have been reset to original values.",
    });
  };

  const loadTemplate = (template: typeof SCRIPT_TEMPLATES[0]) => {
    setScript(template.content);
    setHasChanges(true);
    toast({
      title: "Template Loaded",
      description: `${template.name} template has been loaded.`,
    });
  };

  const handlePreview = () => {
    toast({
      title: "Script Preview",
      description: "Preview functionality will show how your script sounds with the selected personality.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Script & Personality Editor
            {hasChanges && <Badge variant="outline" className="text-orange-600">Unsaved Changes</Badge>}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="script">Script Editor</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="script" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="script-content" className="text-sm font-medium">
                  Call Script Content
                </Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePreview}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    disabled={!hasChanges}
                    className="flex items-center gap-1"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>

              <Textarea
                id="script-content"
                placeholder="Enter your call script here... Use placeholders like [Company], [Contact Name], [Service] that will be replaced with actual values during calls."
                value={script}
                onChange={(e) => handleScriptChange(e.target.value)}
                rows={20}
                className="resize-none font-mono text-sm"
              />

              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>Available placeholders:</strong></p>
                <p>[Agent Name] • [Company] • [Contact Name] • [Service] • [Value Proposition] • [Day] • [Time]</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Personality Type
                </CardTitle>
                <CardDescription>
                  Choose how your agent should interact with prospects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PERSONALITIES.map((p) => (
                    <div
                      key={p.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        personality === p.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handlePersonalityChange(p.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{p.icon}</span>
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-sm text-gray-600">{p.description}</div>
                        </div>
                      </div>
                      {personality === p.id && (
                        <Badge className="mt-2">Selected</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Advanced Behavior
                </CardTitle>
                <CardDescription>
                  Configure advanced conversation behaviors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="small-talk">Enable Small Talk</Label>
                    <p className="text-sm text-gray-600">
                      Allow the agent to engage in brief small talk to build rapport
                    </p>
                  </div>
                  <Switch
                    id="small-talk"
                    checked={useSmallTalk}
                    onCheckedChange={(checked) => {
                      setUseSmallTalk(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="handle-objections">Handle Objections</Label>
                    <p className="text-sm text-gray-600">
                      Enable the agent to respond to common objections and concerns
                    </p>
                  </div>
                  <Switch
                    id="handle-objections"
                    checked={handleObjections}
                    onCheckedChange={(checked) => {
                      setHandleObjections(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {SCRIPT_TEMPLATES.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{template.category}</Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => loadTemplate(template)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 whitespace-pre-line max-h-32 overflow-y-auto">
                      {template.content.substring(0, 200)}...
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            {script.length} characters • {script.split('\n').length} lines • {personality} personality
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedScriptEditor;
