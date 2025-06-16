
import { Activity, Mic, MicOff, Pause, Play, PhoneOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface CallTranscriptCenterProps {
  isConnected: boolean;
  isMuted: boolean;
  isHolding: boolean;
  transcriptLines: Array<{ speaker: string; text: string }>;
  onMuteToggle: () => void;
  onEndCall: () => void;
  onHoldToggle: () => void;
  onSpeak: (text: string) => void;
  onVolumeChange: (volume: number) => void;
}

const CallTranscriptCenter = ({
  isConnected,
  isMuted,
  isHolding,
  transcriptLines,
  onMuteToggle,
  onEndCall,
  onHoldToggle,
  onSpeak,
  onVolumeChange
}: CallTranscriptCenterProps) => {
  const [volume, setVolume] = useState(80);
  const [speakText, setSpeakText] = useState("");

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    onVolumeChange(newVolume / 100);
  };

  const handleSpeak = () => {
    if (speakText.trim()) {
      onSpeak(speakText);
      setSpeakText("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Transcript Area */}
      <div className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Live Call Transcript</h2>
          <div className={`ml-auto flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            isConnected 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-600"
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`} />
            {isConnected ? "CALL ACTIVE" : "Waiting for call..."}
          </div>
        </div>

        {/* Transcript Container */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 h-96 overflow-y-auto">
          {transcriptLines.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No conversation yet</p>
                <p className="text-sm mt-1">Transcript will appear here when call starts</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {transcriptLines.map((line, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className={`text-sm font-bold min-w-[60px] ${
                    line.speaker === "Agent" ? "text-blue-600" : "text-gray-700"
                  }`}>
                    {line.speaker}:
                  </span>
                  <span className="text-sm text-gray-800">{line.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-4">Call Controls</h3>
        
        {/* Primary Controls */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={onMuteToggle}
            disabled={!isConnected}
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            className="flex items-center gap-2"
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          
          <Button
            onClick={onHoldToggle}
            disabled={!isConnected}
            variant={isHolding ? "default" : "outline"}
            size="lg"
            className="flex items-center gap-2"
          >
            {isHolding ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {isHolding ? "Resume" : "Hold"}
          </Button>
          
          <Button
            onClick={onEndCall}
            disabled={!isConnected}
            variant="destructive"
            size="lg"
            className="flex items-center gap-2 ml-auto"
          >
            <PhoneOff className="h-4 w-4" />
            End Call
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 mb-4">
          <Volume2 className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-600 w-16">Volume:</span>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 w-8">{volume}%</span>
        </div>

        {/* Live Speak */}
        <div className="flex gap-3">
          <input
            type="text"
            value={speakText}
            onChange={(e) => setSpeakText(e.target.value)}
            placeholder="Type message to speak through agent..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            disabled={!isConnected}
            onKeyPress={(e) => e.key === "Enter" && handleSpeak()}
          />
          <Button
            onClick={handleSpeak}
            disabled={!isConnected || !speakText.trim()}
            size="sm"
          >
            Speak
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallTranscriptCenter;
