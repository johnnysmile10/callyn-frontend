
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

interface SystemPromptEditorProps {
  systemPrompt: string;
  onSystemPromptChange: (systemPrompt: string) => void;
}

const SystemPromptEditor = ({ systemPrompt, onSystemPromptChange }: SystemPromptEditorProps) => {
  return (
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
            onChange={(e) => onSystemPromptChange(e.target.value)}
            placeholder="You are a professional AI sales agent..."
            className="min-h-64 font-mono text-sm"
          />
          <p className="text-sm text-muted-foreground">
            This defines your agent's core personality and behavior patterns.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemPromptEditor;
