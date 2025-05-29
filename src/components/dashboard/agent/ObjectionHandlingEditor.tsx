
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Trash2 } from "lucide-react";
import { ObjectionResponse } from "./types/scriptTypes";

interface ObjectionHandlingEditorProps {
  objectionResponses: ObjectionResponse[];
  onObjectionResponsesChange: (responses: ObjectionResponse[]) => void;
}

const ObjectionHandlingEditor = ({ objectionResponses, onObjectionResponsesChange }: ObjectionHandlingEditorProps) => {
  const addObjectionResponse = () => {
    onObjectionResponsesChange([...objectionResponses, { objection: "", response: "" }]);
  };

  const updateObjectionResponse = (index: number, field: 'objection' | 'response', value: string) => {
    const updated = objectionResponses.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onObjectionResponsesChange(updated);
  };

  const removeObjectionResponse = (index: number) => {
    onObjectionResponsesChange(objectionResponses.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Objection Handling</span>
          <Button onClick={addObjectionResponse} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Objection
          </Button>
        </CardTitle>
        <CardDescription>
          Prepare responses for common objections to keep conversations flowing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {objectionResponses.length === 0 ? (
          <Alert>
            <AlertDescription>
              Add common objections and their responses to help your agent handle rejections gracefully.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {objectionResponses.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Objection #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeObjectionResponse(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Common Objection</Label>
                  <Input
                    value={item.objection}
                    onChange={(e) => updateObjectionResponse(index, 'objection', e.target.value)}
                    placeholder="e.g., 'I'm not interested' or 'We're happy with our current solution'"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Your Response</Label>
                  <Textarea
                    value={item.response}
                    onChange={(e) => updateObjectionResponse(index, 'response', e.target.value)}
                    placeholder="How should the agent respond to this objection?"
                    className="min-h-20"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ObjectionHandlingEditor;
