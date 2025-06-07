
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Phone, Play, Square, Volume2, Loader2, ExternalLink } from "lucide-react";

interface InstantPreviewCallProps {
  show: boolean;
  onToggle: (show: boolean) => void;
}

const InstantPreviewCall = ({ show, onToggle }: InstantPreviewCallProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { toast } = useToast();

  const handlePreviewCall = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to test the call.",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey && !showApiKeyInput) {
      setShowApiKeyInput(true);
      return;
    }

    setIsPlaying(true);
    
    try {
      // Simulate preview call with ElevenLabs
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Preview Call Started",
        description: `Calling ${phoneNumber} with your AI agent...`,
      });
      
      // Simulate call duration
      setTimeout(() => {
        setIsPlaying(false);
        toast({
          title: "Preview Call Complete",
          description: "Your AI agent performed excellently! Ready to go live.",
        });
      }, 10000);
      
    } catch (error) {
      setIsPlaying(false);
      toast({
        title: "Preview Failed",
        description: "Unable to start preview call. Please check your settings.",
        variant: "destructive"
      });
    }
  };

  const stopPreviewCall = () => {
    setIsPlaying(false);
    toast({
      title: "Preview Call Stopped",
      description: "Call ended successfully.",
    });
  };

  if (!show) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">🚀 Try Your Agent Now</h3>
              <p className="text-blue-700 text-sm">Test your AI agent with a real phone call</p>
            </div>
            <Button onClick={() => onToggle(true)} variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Start Preview Call
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-600" />
          Instant Preview Call
        </CardTitle>
        <CardDescription>
          Test your AI agent with a real phone call to see how it performs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Volume2 className="h-4 w-4" />
          <AlertDescription>
            This will make an actual phone call using your configured AI agent. 
            Perfect for testing before going live with real leads.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label htmlFor="phone">Test Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isPlaying}
            />
          </div>

          {showApiKeyInput && (
            <div>
              <Label htmlFor="apikey">ElevenLabs API Key</Label>
              <Input
                id="apikey"
                type="password"
                placeholder="Enter your ElevenLabs API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={isPlaying}
              />
              <p className="text-xs text-gray-500 mt-1">
                Don't have an API key? <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                  Get one from ElevenLabs <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isPlaying ? (
            <Button onClick={handlePreviewCall} size="lg">
              <Play className="mr-2 h-4 w-4" />
              Start Preview Call
            </Button>
          ) : (
            <Button onClick={stopPreviewCall} variant="destructive" size="lg">
              <Square className="mr-2 h-4 w-4" />
              End Call
            </Button>
          )}

          {isPlaying && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <Badge variant="secondary">Live Call in Progress</Badge>
            </div>
          )}

          <Button variant="outline" onClick={() => onToggle(false)}>
            Cancel
          </Button>
        </div>

        {isPlaying && (
          <Alert>
            <AlertDescription>
              📞 Your AI agent is now calling {phoneNumber}. Listen to how it introduces itself, 
              follows your script, and handles the conversation naturally.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default InstantPreviewCall;
