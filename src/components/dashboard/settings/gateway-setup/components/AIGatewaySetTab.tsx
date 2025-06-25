
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIGatewaySetTabProps {
  onSuggestionsGenerated?: (suggestions: any) => void;
}

const AIGatewaySetTab = ({ onSuggestionsGenerated }: AIGatewaySetTabProps) => {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe your phone system first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockSuggestions = {
        phoneSystemType: 'ivr',
        waitTimeBeforeInput: 4,
        firstAction: 'press_1',
        fallbackAction: 'press_0',
        confidence: 0.89,
        reasoning: "Based on your description, this appears to be a standard IVR system with a sales option. The AI recommends pressing 1 first with a 4-second wait time.",
        alternatives: [
          { action: 'press_2', reason: 'If option 1 leads to wrong department' },
          { action: 'wait', reason: 'If system needs more time to present options' }
        ]
      };
      
      setSuggestions(mockSuggestions);
      setIsAnalyzing(false);
      onSuggestionsGenerated?.(mockSuggestions);
      
      toast({
        title: "AI Analysis Complete",
        description: "Gateway suggestions have been generated based on your description.",
      });
    }, 2000);
  };

  const handleApplySuggestions = () => {
    toast({
      title: "Suggestions Applied",
      description: "AI suggestions have been applied to your gateway configuration.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Description Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Brain className="h-5 w-5" />
            Describe Your Phone System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Phone System Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happens when you call this number. For example: 'When I call, it says Welcome to ABC Company, press 1 for sales, press 2 for support, press 0 for operator. I usually need to get to sales.'"
              rows={4}
              className="resize-none"
            />
            <p className="text-sm text-gray-600">
              Describe the phone menu, prompts, and which option you typically need to reach.
            </p>
          </div>

          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !description.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Analyze & Suggest Gateway Path"}
          </Button>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {suggestions && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              AI Gateway Suggestions
              <span className="text-sm font-normal text-green-600">
                {Math.round(suggestions.confidence * 100)}% Confidence
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-300 bg-green-100">
              <Brain className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>AI Analysis:</strong> {suggestions.reasoning}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-green-700">Recommended Settings</Label>
                <div className="bg-white p-3 rounded border border-green-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">System Type:</span>
                    <span className="text-sm font-medium">IVR System</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Wait Time:</span>
                    <span className="text-sm font-medium">{suggestions.waitTimeBeforeInput}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">First Action:</span>
                    <span className="text-sm font-medium">Press 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fallback:</span>
                    <span className="text-sm font-medium">Press 0 (Operator)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-green-700">Alternative Options</Label>
                <div className="bg-white p-3 rounded border border-green-200 space-y-2">
                  {suggestions.alternatives.map((alt: any, index: number) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{alt.action}</div>
                      <div className="text-gray-600">{alt.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleApplySuggestions}
                className="bg-green-600 hover:bg-green-700"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Apply These Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIGatewaySetTab;
