
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Phone, 
  PhoneOff,
  Clock,
  MessageSquare,
  Bug,
  Zap,
  Download,
  RefreshCw
} from "lucide-react";

interface CallTranscript {
  timestamp: string;
  speaker: 'agent' | 'user';
  message: string;
  confidence?: number;
}

interface CallMetrics {
  duration: number;
  responseTime: number;
  interruptions: number;
  sentimentScore: number;
}

const TestAgentPanel = () => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [callPhase, setCallPhase] = useState<'idle' | 'dialing' | 'connected' | 'ended'>('idle');
  const [transcript, setTranscript] = useState<CallTranscript[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [callMetrics, setCallMetrics] = useState<CallMetrics>({
    duration: 0,
    responseTime: 0,
    interruptions: 0,
    sentimentScore: 0.7
  });
  const [activeTab, setActiveTab] = useState("live");
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startSampleCall = () => {
    setIsTestActive(true);
    setCallPhase('dialing');
    
    // Simulate call progression
    setTimeout(() => {
      setCallPhase('connected');
      setCallDuration(0);
      
      // Start call timer
      intervalRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      // Add initial greeting
      addTranscriptEntry('agent', "Hello! Thank you for answering. This is a test call from your AI sales agent. How are you doing today?");
      
      toast({
        title: "Test Call Started",
        description: "Simulating a live sales call scenario",
      });
    }, 2000);
  };

  const endCall = () => {
    setCallPhase('ended');
    setIsTestActive(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Update final metrics
    setCallMetrics(prev => ({
      ...prev,
      duration: callDuration,
      responseTime: Math.random() * 2 + 1, // 1-3 seconds
      interruptions: Math.floor(Math.random() * 3),
    }));
    
    toast({
      title: "Test Call Ended",
      description: `Call duration: ${formatDuration(callDuration)}`,
    });
  };

  const addTranscriptEntry = (speaker: 'agent' | 'user', message: string) => {
    const entry: CallTranscript = {
      timestamp: new Date().toLocaleTimeString(),
      speaker,
      message,
      confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    };
    
    setTranscript(prev => [...prev, entry]);
  };

  const simulateUserResponse = () => {
    const responses = [
      "I'm doing well, thanks. What is this about?",
      "I'm actually quite busy right now.",
      "Sure, I have a few minutes. What can you tell me?",
      "I'm not really interested in sales calls.",
      "That depends on what you're offering."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addTranscriptEntry('user', randomResponse);
    
    // Agent responds after delay
    setTimeout(() => {
      addTranscriptEntry('agent', "I completely understand. I'll keep this brief. We've been helping businesses like yours increase their efficiency by 40%. Would you be interested in hearing how we've achieved this for companies similar to yours?");
    }, 2000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Test Agent</h2>
          <p className="text-muted-foreground">
            Test your AI agent's performance with simulated calls
          </p>
        </div>
        <Badge variant={callPhase === 'connected' ? 'default' : 'secondary'}>
          {callPhase === 'idle' && 'Ready'}
          {callPhase === 'dialing' && 'Connecting...'}
          {callPhase === 'connected' && 'Live Call'}
          {callPhase === 'ended' && 'Call Ended'}
        </Badge>
      </div>

      {/* Call Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {!isTestActive && callPhase !== 'ended' ? (
              <Button onClick={startSampleCall} size="lg">
                <Play className="mr-2 h-4 w-4" />
                Start Test Call
              </Button>
            ) : callPhase === 'connected' ? (
              <Button onClick={endCall} variant="destructive" size="lg">
                <PhoneOff className="mr-2 h-4 w-4" />
                End Call
              </Button>
            ) : callPhase === 'dialing' ? (
              <Button disabled size="lg">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </Button>
            ) : (
              <Button onClick={startSampleCall} size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Start New Test
              </Button>
            )}
            
            {callPhase === 'connected' && (
              <>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatDuration(callDuration)}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={simulateUserResponse}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Simulate Response
                </Button>
              </>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDebug(!showDebug)}
            >
              <Bug className="mr-2 h-4 w-4" />
              Debug {showDebug ? 'Off' : 'On'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Interface Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live">Live Call</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audio Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Audio Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAudio}
                    disabled={callPhase !== 'connected'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Volume: {Math.round(volume * 100)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <audio ref={audioRef} loop>
                  <source src="/placeholder-audio.mp3" type="audio/mpeg" />
                </audio>
              </CardContent>
            </Card>

            {/* Real-time Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Call Duration</span>
                    <span>{formatDuration(callDuration)}</span>
                  </div>
                  <Progress value={(callDuration / 300) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sentiment Score</span>
                    <span>{(callMetrics.sentimentScore * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={callMetrics.sentimentScore * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Response Time</span>
                    <p className="font-semibold">{callMetrics.responseTime.toFixed(1)}s</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Interruptions</span>
                    <p className="font-semibold">{callMetrics.interruptions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transcript" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Transcript</CardTitle>
              <CardDescription>
                Real-time conversation transcript with confidence scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full border rounded-md p-4">
                {transcript.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No transcript available. Start a test call to see the conversation.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {transcript.map((entry, index) => (
                      <div key={index} className={`flex gap-3 ${entry.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          entry.speaker === 'agent' 
                            ? 'bg-blue-100 text-blue-900' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {entry.speaker === 'agent' ? 'Agent' : 'User'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {entry.timestamp}
                            </span>
                            {entry.confidence && (
                              <span className="text-xs text-muted-foreground">
                                {(entry.confidence * 100).toFixed(0)}%
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{entry.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              {transcript.length > 0 && (
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Transcript
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Duration</span>
                </div>
                <p className="text-2xl font-bold">{formatDuration(callMetrics.duration)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Avg Response</span>
                </div>
                <p className="text-2xl font-bold">{callMetrics.responseTime.toFixed(1)}s</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Interruptions</span>
                </div>
                <p className="text-2xl font-bold">{callMetrics.interruptions}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sentiment</span>
                </div>
                <p className="text-2xl font-bold">{(callMetrics.sentimentScore * 100).toFixed(0)}%</p>
              </CardContent>
            </Card>
          </div>
          
          {callPhase === 'ended' && (
            <Card>
              <CardHeader>
                <CardTitle>Call Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Your agent performed well during this test call. The response time was within acceptable limits, 
                    and the sentiment remained positive throughout the conversation. Consider reviewing the transcript 
                    for areas of improvement in the sales script.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Debug Panel */}
      {showDebug && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Debug Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Agent Status</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Voice Model: Turbo v2.5</li>
                  <li>Response Latency: {(Math.random() * 100 + 50).toFixed(0)}ms</li>
                  <li>Token Usage: {Math.floor(Math.random() * 1000 + 500)}</li>
                  <li>Memory Usage: {(Math.random() * 50 + 25).toFixed(1)}%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Call Details</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Call ID: test-{Date.now()}</li>
                  <li>Protocol: WebRTC</li>
                  <li>Codec: Opus</li>
                  <li>Sample Rate: 48kHz</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestAgentPanel;
