
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Clock, 
  Users, 
  Settings, 
  BarChart, 
  Activity,
  Bot,
  FileText,
  Headphones,
  ChevronRight,
  ChevronLeft
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

  const [activeTab, setActiveTab] = useState("status");
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'mr-80' : 'mr-0'}`}>
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
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-1"
              >
                {sidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                {sidebarOpen ? "Hide" : "Show"} Sidebar
              </Button>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="flex-1 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="bg-white border-b px-6">
                <TabsList className="grid w-full max-w-2xl grid-cols-5">
                  <TabsTrigger value="status" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Status
                  </TabsTrigger>
                  <TabsTrigger value="live-call" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Live Call
                  </TabsTrigger>
                  <TabsTrigger value="schedule-queue" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Schedule & Queue
                  </TabsTrigger>
                  <TabsTrigger value="controls" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Controls
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-auto p-6">
                <TabsContent value="status" className="mt-0 h-full">
                  <AgentStatusControl 
                    status={agentStatus}
                    onStatusChange={updateAgentStatus}
                  />
                </TabsContent>

                <TabsContent value="live-call" className="mt-0 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                    {/* Lead Info */}
                    <div className="lg:col-span-1">
                      <Card className="h-fit">
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
                      <Card className="mt-4">
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
                        </CardContent>
                      </Card>

                      {/* Live Listen */}
                      <Card className="mt-4">
                        <CardContent className="pt-6">
                          <LiveListen
                            isConnected={isConnected}
                            onSpeak={onSpeak}
                            onVolumeChange={onVolumeChange}
                          />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Transcript Monitor */}
                    <div className="lg:col-span-2">
                      <Card className="h-fit">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Live Transcript
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RealtimeMonitorPanel
                            isConnected={isConnected}
                            transcriptLines={transcriptLines}
                          />
                        </CardContent>
                      </Card>

                      {/* Call Outcome */}
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle>Log Call Outcome</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CallOutcomeButtons onOutcomeSelect={handleOutcome} />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="schedule-queue" className="mt-0 h-full">
                  <div className="space-y-6">
                    <OperatingHoursScheduler 
                      hours={operatingHours}
                      onHoursChange={updateOperatingHours}
                    />
                    <CallQueueView queue={callQueue} />
                  </div>
                </TabsContent>

                <TabsContent value="controls" className="mt-0 h-full">
                  <CallRateControls 
                    callRate={callRate}
                    onRateChange={updateCallRate}
                  />
                </TabsContent>

                <TabsContent value="analytics" className="mt-0 h-full">
                  <DailyCallSummary summary={dailySummary} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Collapsible Sidebar */}
        {sidebarOpen && (
          <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-lg z-10 flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Agent Tools</h3>
              <p className="text-sm text-gray-600">Quick access to agent settings and tools</p>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {/* Agent Voice Test */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Headphones className="h-4 w-4" />
                    Voice Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VoiceTestingPanel />
                </CardContent>
              </Card>

              {/* Script Preview */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Script Breakdown
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

              {/* AI Assistant */}
              <Card>
                <CardContent className="p-0">
                  <AIAssistantPanel />
                </CardContent>
              </Card>

              {/* Quick Edit Actions */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditAgentOpen(true)}
                  className="w-full flex items-center gap-2"
                >
                  <Bot className="h-4 w-4" />
                  Edit Agent Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsScriptEditorOpen(true)}
                  className="w-full flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Edit Script & Personality
                </Button>
              </div>
            </div>
          </div>
        )}

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
