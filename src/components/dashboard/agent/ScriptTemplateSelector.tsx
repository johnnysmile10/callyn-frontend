
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  onExport: () => void;
}

const ScriptTemplateSelector = ({ selectedTemplate, onTemplateChange, onExport }: ScriptTemplateSelectorProps) => {
  const { toast } = useToast();

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
      onTemplateChange(template);
      
      toast({
        title: "Template Loaded",
        description: `${template.replace('-', ' ')} template has been applied to your script.`,
      });

      return selectedTemplate;
    }
    return null;
  };

  const handleTemplateSelect = (value: string) => {
    const templateData = loadTemplate(value);
    if (templateData) {
      // Emit the template data through a custom event
      window.dispatchEvent(new CustomEvent('templateLoaded', { 
        detail: templateData 
      }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start Templates</CardTitle>
        <CardDescription>
          Choose a template to get started quickly, then customize as needed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Choose template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cold-call">Cold Call</SelectItem>
              <SelectItem value="follow-up">Follow-up Call</SelectItem>
              <SelectItem value="referral">Referral Call</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptTemplateSelector;
