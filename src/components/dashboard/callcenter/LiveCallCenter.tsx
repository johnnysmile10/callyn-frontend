
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Users, 
  Settings, 
  BarChart, 
  Activity,
  Bot,
  FileText,
  Headphones,
  Clock,
  Volume2
} from "lucide-react";

// Import existing components
import AgentStatusControl from "./AgentStatusControl";
import OperatingHoursScheduler from "./OperatingHoursScheduler";
import CallQueueView from "./CallQueueView";
import VoiceTestingPanel from "./VoiceTestingPanel";
import CallRateControls from "./CallRateControls";
import DailyCallSummary from "./DailyCallSummary";
import { useCallCenterState } from "./hooks/useCallCenterState";

// Import Elite Call Interface components
import EliteErrorBoundary from "./Elite/EliteErrorBoundary";
import { useEliteSimulatedCall } from "./Elite/useEliteSimulatedCall";
import LiveListen from "./Elite/LiveListen";
import QuickActionsBar from "./Elite/QuickActionsBar";
import AgentInstructions from "./Elite/AgentInstructions";
import RealtimeMonitorPanel from "./Elite/RealtimeMonitorPanel";
import ScriptBreakdownView from "./Elite/ScriptBreakdownView";
import CallOutcomeButtons from "./Elite/CallOutcomeButtons";
import LeadInfoPanel from "./Elite/LeadInfoPanel";
import UnifiedScriptEditor from "../shared/UnifiedScriptEditor";
import EditAgentModal from "./Elite/EditAgentModal";
import AIAssistantPanel from "./Elite/AIAssistantPanel";
import { useCallTimer } from "./Elite/useCallTimer";
import { toast } from "@/hooks/use-toast";

const DUMMY_LEAD = {
  name: "John Doe",
  phone: "+1 (555) 012-3344",
  note: "Solar warm lead, requested callback last week.",
};

const SCRIPT_STEPS = [
  { step: "Greeting", details: "Introduce yourself & company" },
  { step: "Reason", details: "Explain calling about new solar incentive" },
  { step: "Qualify", details: "Ask if they're decision maker" },
  { step: "Pitch", details: "Summarize value, handle objections" },
  { step: "Book", details: "Attempt to book demo appointment" },
];

const LiveCallCenter = () => {
  const { 
    agentStatus, 
    operatingHours, 
    callQueue, 
    callRate,
    dailySummary,
    updateAgentStatus,
    updateOperatingHours,
    updateCallRate
  } = useCallCenterState();

  const {
    isConnected,
    isMuted,
    isHolding,
    onMuteToggle,
    onEndCall,
    onHoldToggle,
    onSpeak,
    onVolumeChange,
    agentInstructions,
    outcomeGoals,
    transcriptLines,
  } = useEliteSimulatedCall();

  const [isScriptEditorOpen, setIsScriptEditorOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);

  // Script and agent states
  const [currentScript, setCurrentScript] = useState("");
  const [currentPersonality, setCurrentPersonality] = useState("professional");
  const [useSmallTalk, setUseSmallTalk] = useState(false);
  const [handleObjections, setHandleObjections] = useState(false);
  const [agentSettings, setAgentSettings] = useState({
    name: "Sales Agent",
    voice: "9BWtsMINqrJLrRacOk9x",
    language: "en",
    speakingSpeed: 1.0,
    enthusiasm: 5,
    personality: "professional",
    useSmallTalk: false,
    handleObjections: false,
  });

  // Figure out which script section is active
  const agentIdx = transcriptLines.reduce(
    (idx, l) =>
      l.speaker === "Agent" && idx < SCRIPT_STEPS.length - 1
        ? idx + 1
        : idx,
    0
  );

  // Call timer
  const callDuration = useCallTimer(isConnected);

  // Modal handlers
  const handleScriptSave = (data: {
    script: string;
    personality: string;
    useSmallTalk: boolean;
    handleObjections: boolean;
  }) => {
    setCurrentScript(data.script);
    setCurrentPersonality(data.personality);
    setUseSmallTalk(data.useSmallTalk);
    setHandleObjections(data.handleObjections);
    setIsScriptEditorOpen(false);
    toast({ 
      title: "Script & Personality Updated", 
      description: "Your call script and personality settings have been updated successfully." 
    });
  };

  const handleAgentSave = (settings: any) => {
    setAgentSettings(settings);
    setIsEditAgentOpen(false);
    toast({ 
      title: "Agent Updated", 
      description: "Your agent configuration has been updated successfully." 
    });
  };

  const handleOutcome = (outcome: string) => {
    toast({ title: `Outcome: ${outcome}` });
  };

  return (
    <EliteErrorBoundary>
      <div className="h-screen flex bg-gray-50">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold">Live Call Center</h1>
                <p className="text-gray-600">Unified AI calling operations dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Call Status Indicator */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                isConnected 
                  ? "bg-green-100 text-green-800" 
                  : agentStatus.isActive 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-gray-100 text-gray-600"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected 
                    ? "bg-green-500 animate-pulse" 
                    : agentStatus.isActive 
                      ? "bg-blue-500" 
                      : "bg-gray-400"
                }`} />
                {isConnected ? "Live Call" : agentStatus.isActive ? "Agent Online" : "Agent Offline"}
                {isConnected && callDuration && (
                  <span className="ml-2 font-mono">{callDuration}</span>
                )}
              </div>

              {/* Quick Actions */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditAgentOpen(true)}
                className="flex items-center gap-1"
              >
                <Bot className="h-4 w-4" />
                Edit Agent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsScriptEditorOpen(true)}
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                Edit Script
              </Button>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              {/* Left Column - Agent Status & Controls */}
              <div className="lg:col-span-3 space-y-6">
                {/* Agent Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Agent Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AgentStatusControl 
                      status={agentStatus}
                      onStatusChange={updateAgentStatus}
                    />
                  </CardContent>
                </Card>

                {/* Current Lead Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Current Lead
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LeadInfoPanel lead={DUMMY_LEAD} />
                  </CardContent>
                </Card>

                {/* Call Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="h-5 w-5" />
                      Call Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QuickActionsBar
                      isConnected={isConnected}
                      isMuted={isMuted}
                      isHolding={isHolding}
                      onMuteToggle={onMuteToggle}
                      onEndCall={onEndCall}
                      onHoldToggle={onHoldToggle}
                    />
                    <Separator className="my-4" />
                    <LiveListen
                      isConnected={isConnected}
                      onSpeak={onSpeak}
                      onVolumeChange={onVolumeChange}
                    />
                  </CardContent>
                </Card>

                {/* Voice Test */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5" />
                      Voice Test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VoiceTestingPanel />
                  </CardContent>
                </Card>
              </div>

              {/* Center Column - Live Call Monitor */}
              <div className="lg:col-span-6 space-y-6">
                {/* Live Transcript */}
                <Card className="h-96">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Live Call Transcript
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RealtimeMonitorPanel
                      isConnected={isConnected}
                      transcriptLines={transcriptLines}
                    />
                  </CardContent>
                </Card>

                {/* Call Outcome & Queue */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Log Call Outcome</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CallOutcomeButtons onOutcomeSelect={handleOutcome} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Call Queue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CallQueueView queue={callQueue} />
                    </CardContent>
                  </Card>
                </div>

                {/* AI Assistant */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <AIAssistantPanel />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Analytics & Script Tools */}
              <div className="lg:col-span-3 space-y-6">
                {/* Script Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Script Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScriptBreakdownView
                      scriptSections={SCRIPT_STEPS}
                      currentStepIdx={agentIdx}
                    />
                    <Separator className="my-3" />
                    <AgentInstructions
                      agentInstructions={agentInstructions}
                      outcomeGoals={outcomeGoals}
                    />
                  </CardContent>
                </Card>

                {/* Daily Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Today's Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DailyCallSummary summary={dailySummary} />
                  </CardContent>
                </Card>

                {/* Operating Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Operating Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OperatingHoursScheduler 
                      hours={operatingHours}
                      onHoursChange={updateOperatingHours}
                    />
                  </CardContent>
                </Card>

                {/* Call Rate Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Call Rate Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CallRateControls 
                      callRate={callRate}
                      onRateChange={updateCallRate}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <UnifiedScriptEditor
          isOpen={isScriptEditorOpen}
          onClose={() => setIsScriptEditorOpen(false)}
          initialScript={currentScript}
          initialPersonality={currentPersonality}
          initialUseSmallTalk={useSmallTalk}
          initialHandleObjections={handleObjections}
          onSave={handleScriptSave}
        />

        <EditAgentModal
          isOpen={isEditAgentOpen}
          onClose={() => setIsEditAgentOpen(false)}
          initialSettings={agentSettings}
          onSave={handleAgentSave}
        />
      </div>
    </EliteErrorBoundary>
  );
};

export default LiveCallCenter;
