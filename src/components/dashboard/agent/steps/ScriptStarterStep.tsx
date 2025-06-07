
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, ArrowRight, Wand2, Copy } from "lucide-react";

interface ScriptStarterStepProps {
  onComplete: (data: any) => void;
  initialData: any;
  isCompleted: boolean;
}

const ScriptStarterStep = ({ onComplete, initialData, isCompleted }: ScriptStarterStepProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(initialData.script?.template || "");
  const [customScript, setCustomScript] = useState(initialData.script?.customScript || "");
  const [greeting, setGreeting] = useState(initialData.script?.greeting || "");

  const templates = [
    {
      id: "cold-outreach",
      name: "Cold Outreach",
      description: "Professional cold calling script for new prospects",
      badge: "Most Popular",
      color: "bg-blue-500",
      greeting: "Hi [Name], this is [Agent Name] from [Company]. I hope I'm not catching you at a bad time. I'm calling because we've been helping businesses like yours [specific benefit]. Do you have just 30 seconds for me to explain why I called?",
      script: "Our solution has helped companies reduce costs by 30% while improving efficiency. I'd love to show you exactly how we've done this for businesses in your industry. Would you be open to a brief 15-minute conversation this week to explore if this could benefit your company?"
    },
    {
      id: "warm-follow-up",
      name: "Warm Follow-up",
      description: "Follow-up script for existing leads and contacts",
      badge: "High Convert",
      color: "bg-green-500",
      greeting: "Hi [Name], this is [Agent Name] from [Company]. We spoke [timeframe] about [previous topic]. I wanted to follow up on our conversation and share some additional information.",
      script: "Based on our previous discussion about [specific pain point], I've prepared a customized proposal that addresses your exact needs. I believe this could save your company significant time and resources. When would be a good time to review this together?"
    },
    {
      id: "referral-intro",
      name: "Referral Introduction",
      description: "Leveraging referrals and mutual connections",
      badge: "Trusted",
      color: "bg-purple-500",
      greeting: "Hi [Name], this is [Agent Name] from [Company]. [Referrer Name] suggested I reach out to you because [reason for referral].",
      script: "[Referrer Name] mentioned that you were looking for ways to [specific need]. We've helped [Referrer Name]'s company achieve [specific result], and I believe we could do something similar for you. Would you be interested in a brief conversation about how this might apply to your situation?"
    }
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setGreeting(template.greeting);
    setCustomScript(template.script);
  };

  const handleSubmit = () => {
    const data = {
      template: selectedTemplate,
      greeting,
      customScript
    };
    onComplete(data);
  };

  const isFormValid = greeting.trim() && customScript.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Step 2: Script Starter
        </CardTitle>
        <CardDescription>
          Choose a template to get started quickly, then customize as needed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Choose Your Starting Template</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                    <Badge variant="secondary" className={`text-white text-xs ${template.color}`}>
                      {template.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <Wand2 className="h-3 w-3" />
                    <span>Auto-fills script</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Greeting Customization */}
        <div className="space-y-2">
          <Label htmlFor="greeting">Opening Greeting</Label>
          <Textarea
            id="greeting"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            placeholder="How should your agent start the conversation?"
            className="min-h-20"
          />
          <p className="text-sm text-muted-foreground">
            Use [Name], [Company], [Agent Name] as dynamic placeholders
          </p>
        </div>

        {/* Main Script */}
        <div className="space-y-2">
          <Label htmlFor="customScript">Main Sales Script</Label>
          <Textarea
            id="customScript"
            value={customScript}
            onChange={(e) => setCustomScript(e.target.value)}
            placeholder="Your core value proposition and conversation flow..."
            className="min-h-32"
          />
          <p className="text-sm text-muted-foreground">
            Include your value proposition, qualifying questions, and call-to-action
          </p>
        </div>

        {/* AI Enhancement Suggestion */}
        {(greeting || customScript) && (
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-sm">AI Enhancement Available</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Our AI can analyze and improve your script for better conversion rates.
              </p>
              <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
                Enhance with AI
                <Wand2 className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit} size="lg" disabled={!isFormValid}>
            Continue to Behavior Settings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptStarterStep;
