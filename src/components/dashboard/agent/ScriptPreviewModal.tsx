
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ObjectionResponse } from "./types/scriptTypes";

interface ScriptPreviewModalProps {
  greeting: string;
  mainPrompt: string;
  objectionResponses: ObjectionResponse[];
  tone: string;
  showPreview: boolean;
  onClose: () => void;
}

const ScriptPreviewModal = ({ 
  greeting, 
  mainPrompt, 
  objectionResponses, 
  tone, 
  showPreview, 
  onClose 
}: ScriptPreviewModalProps) => {
  if (!showPreview) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Script Preview</span>
          <Button variant="ghost" onClick={onClose}>
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
  );
};

export default ScriptPreviewModal;
