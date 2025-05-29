
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GreetingEditorProps {
  greeting: string;
  tone: string;
  onGreetingChange: (greeting: string) => void;
  onToneChange: (tone: string) => void;
}

const GreetingEditor = ({ greeting, tone, onGreetingChange, onToneChange }: GreetingEditorProps) => {
  return (
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
            onChange={(e) => onGreetingChange(e.target.value)}
            placeholder="Hi [Name], this is [Your Name] from [Company]..."
            className="min-h-24"
          />
          <p className="text-sm text-muted-foreground">
            Use placeholders like [Name], [Company], [Your Name] for dynamic content
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone">Conversation Tone</Label>
          <Select value={tone} onValueChange={onToneChange}>
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
  );
};

export default GreetingEditor;
