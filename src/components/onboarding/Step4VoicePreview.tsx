
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, CheckCircle } from "lucide-react";

interface VoicePreviewProps {
  voicePreviews: {
    greeting: string;
    message: string;
  };
  handleBack: () => void;
  handleNext: () => void;
}

const Step4VoicePreview = ({ voicePreviews, handleBack, handleNext }: VoicePreviewProps) => {
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const [completedListening, setCompletedListening] = useState<string[]>([]);

  const togglePlayback = (previewType: string) => {
    if (playingPreview === previewType) {
      setPlayingPreview(null);
      // Simulate audio completion
      setTimeout(() => {
        if (!completedListening.includes(previewType)) {
          setCompletedListening([...completedListening, previewType]);
        }
      }, 300);
    } else {
      setPlayingPreview(previewType);
      // Simulate audio playback ending after a few seconds
      setTimeout(() => {
        setPlayingPreview(null);
        if (!completedListening.includes(previewType)) {
          setCompletedListening([...completedListening, previewType]);
        }
      }, 3000);
    }
  };

  const allPreviewsCompleted = completedListening.length >= 2;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
        STEP 4: Hear Your Personalized AI Voice
      </h2>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-sm border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-callyn-blue/10 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-callyn-blue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Your AI Voice Agent is Ready!</h3>
          <p className="text-gray-600">
            Listen to how Callyn will sound when speaking to your prospects and customers.
          </p>
        </div>
        
        <div className="space-y-6 mb-8">
          <Card className="border-callyn-blue/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Greeting</h4>
                <div className="flex items-center">
                  {completedListening.includes('greeting') && (
                    <span className="text-green-600 text-sm flex items-center mr-3">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Listened
                    </span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => togglePlayback('greeting')}
                  >
                    {playingPreview === 'greeting' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {playingPreview === 'greeting' ? 'Pause' : 'Play'}
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md italic text-gray-700">
                "{voicePreviews.greeting}"
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-callyn-blue/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Sample Message</h4>
                <div className="flex items-center">
                  {completedListening.includes('message') && (
                    <span className="text-green-600 text-sm flex items-center mr-3">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Listened
                    </span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => togglePlayback('message')}
                  >
                    {playingPreview === 'message' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {playingPreview === 'message' ? 'Pause' : 'Play'}
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md italic text-gray-700">
                "{voicePreviews.message}"
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center pt-4">
          <Button 
            onClick={handleBack}
            variant="outline"
            className="rounded-full px-8 py-2 text-lg font-medium mr-4"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className={`rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2 text-lg font-medium ${
              allPreviewsCompleted ? 'animate-pulse' : ''
            }`}
          >
            Continue to Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step4VoicePreview;
