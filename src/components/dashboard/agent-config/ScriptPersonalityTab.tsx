
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Shield, FileText, Lightbulb } from "lucide-react";
import { useAuth } from "@/context";
import { useToast } from "@/hooks/use-toast";

const ScriptPersonalityTab = () => {
  const { userAgent, onboardingData, setOnboardingData } = useAuth();
  const { toast } = useToast();
  
  // Get current settings
  const currentScript = userAgent?.configuration?.script || onboardingData?.customScript || "";
  const currentPersonality = userAgent?.configuration?.personality || onboardingData?.personality || "professional";
  const currentUseSmallTalk = onboardingData?.useSmallTalk || false;
  const currentHandleObjections = onboardingData?.handleObjections || false;

  const [script, setScript] = useState(currentScript);
  const [personality, setPersonality] = useState(currentPersonality);
  const [useSmallTalk, setUseSmallTalk] = useState(currentUseSmallTalk);
  const [handleObjections, setHandleObjections] = useState(currentHandleObjections);

  const personalities = [
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

  const scriptTemplates = [
    {
      id: "sales",
      name: "Sales Outreach",
      content: `Hello! This is [Agent Name] calling from [Company]. I hope I'm not catching you at a bad time.

I'm reaching out because we help businesses like yours [value proposition]. 

I'd love to learn more about your current challenges with [relevant area] and see if there might be a good fit for us to work together.

Would you have just a few minutes to chat, or would there be a better time for me to call back?`
    },
    {
      id: "appointment",
      name: "Appointment Setting",
      content: `Hi! This is [Agent Name] from [Company]. 

I'm calling to schedule a brief consultation with [Contact Name] about [service/product]. We've been helping companies in your industry with [specific benefit].

I have some availability this week - would [Day] at [Time] work for a 15-minute call, or would [Alternative Day] at [Alternative Time] be better?`
    },
    {
      id: "followup",
      name: "Follow-up Call",
      content: `Hello [Contact Name], this is [Agent Name] from [Company].

I wanted to follow up on our previous conversation about [topic]. You mentioned you were interested in [specific interest].

I have some new information that I think would be valuable for you. Do you have a few minutes to chat, or should I schedule a time that works better for you?`
    }
  ];

  const handleSaveSettings = () => {
    const updatedData = {
      ...onboardingData,
      customScript: script,
      personality,
      useSmallTalk,
      handleObjections
    };

    setOnboardingData(updatedData);
    
    toast({
      title: "Settings Saved",
      description: "Script and personality settings have been updated successfully.",
    });
  };

  const loadTemplate = (template: typeof scriptTemplates[0]) => {
    setScript(template.content);
    toast({
      title: "Template Loaded",
      description: `${template.name} template has been loaded into the script editor.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Script Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Call Script
          </CardTitle>
          <CardDescription>
            Define what your AI agent will say during calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Script Templates */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Quick Start Templates</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scriptTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{template.name}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => loadTemplate(template)}
                      >
                        Use
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Script Textarea */}
          <div className="space-y-2">
            <Label htmlFor="script">Call Script</Label>
            <Textarea
              id="script"
              placeholder="Enter your call script here... Use placeholders like [Company], [Contact Name], etc."
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={12}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Tip: Use placeholders like [Company], [Contact Name], [Service] that will be replaced with actual values during calls.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personality Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Personality & Tone
          </CardTitle>
          <CardDescription>
            Choose how your agent should interact with prospects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalities.map((p) => (
              <div
                key={p.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  personality === p.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPersonality(p.id)}
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

      {/* Advanced Behavior Settings */}
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
              onCheckedChange={setUseSmallTalk}
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
              onCheckedChange={setHandleObjections}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          Save Script & Personality Settings
        </Button>
      </div>
    </div>
  );
};

export default ScriptPersonalityTab;
