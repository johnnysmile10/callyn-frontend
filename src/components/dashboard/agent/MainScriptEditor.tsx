
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MainScriptEditorProps {
  mainPrompt: string;
  onMainPromptChange: (mainPrompt: string) => void;
}

const MainScriptEditor = ({ mainPrompt, onMainPromptChange }: MainScriptEditorProps) => {
  return (
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
            onChange={(e) => onMainPromptChange(e.target.value)}
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
  );
};

export default MainScriptEditor;
