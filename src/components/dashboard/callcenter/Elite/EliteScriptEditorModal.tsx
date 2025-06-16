
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
import { FileText, Save, RotateCcw, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EliteScriptEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScript?: string;
  onSave: (script: string) => void;
}

const SCRIPT_TEMPLATES = [
  {
    id: "greeting",
    name: "Professional Greeting",
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

const EliteScriptEditorModal = ({ isOpen, onClose, initialScript = "", onSave }: EliteScriptEditorModalProps) => {
  const [script, setScript] = useState(initialScript);
  const [hasChanges, setHasChanges] = useState(false);

  const handleScriptChange = (value: string) => {
    setScript(value);
    setHasChanges(value !== initialScript);
  };

  const handleSave = () => {
    onSave(script);
    setHasChanges(false);
    toast({
      title: "Script Saved",
      description: "Your script has been saved successfully.",
    });
  };

  const handleReset = () => {
    setScript(initialScript);
    setHasChanges(false);
    toast({
      title: "Script Reset",
      description: "Script has been reset to original version.",
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
      description: "Preview functionality would open in a separate modal.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Elite Script Editor
            {hasChanges && <Badge variant="outline" className="text-orange-600">Unsaved Changes</Badge>}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="editor" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Script Editor</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
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

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {SCRIPT_TEMPLATES.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
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
            {script.length} characters • {script.split('\n').length} lines
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
              Save Script
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EliteScriptEditorModal;
