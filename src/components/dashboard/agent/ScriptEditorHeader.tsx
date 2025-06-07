
import { Button } from "@/components/ui/button";
import { Save, RefreshCw, Clock, Eye } from "lucide-react";

interface ScriptEditorHeaderProps {
  lastSaved: Date | null;
  isLoading: boolean;
  onSave: () => void;
  onPreview: () => void;
}

const ScriptEditorHeader = ({ lastSaved, isLoading, onSave, onPreview }: ScriptEditorHeaderProps) => {
  return (
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
        <Button variant="outline" onClick={onPreview}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Script
        </Button>
      </div>
    </div>
  );
};

export default ScriptEditorHeader;
