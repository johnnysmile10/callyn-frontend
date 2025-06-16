
import EliteErrorBoundary from "./Elite/EliteErrorBoundary";
import { useEliteSimulatedCall } from "./Elite/useEliteSimulatedCall";
import LiveListen from "./Elite/LiveListen";
import QuickActionsBar from "./Elite/QuickActionsBar";
import AgentInstructions from "./Elite/AgentInstructions";
import RealtimeMonitorPanel from "./Elite/RealtimeMonitorPanel";
import ScriptBreakdownView from "./Elite/ScriptBreakdownView";
import CallOutcomeButtons from "./Elite/CallOutcomeButtons";
import LeadInfoPanel from "./Elite/LeadInfoPanel";
import EliteScriptEditorModal from "./Elite/EliteScriptEditorModal";
import EditAgentModal from "./Elite/EditAgentModal";
import { toast } from "@/hooks/use-toast";
import AIAssistantPanel from "./Elite/AIAssistantPanel";
import CardSection from "./Elite/CardSection";
import SectionHeader from "./Elite/SectionHeader";
import { Button } from "@/components/ui/button";
// REPLACE Waveform -> Activity, Script -> FileText (which actually exist)
import { Bot, Activity, Users, Clock, Headphones, FileText, Edit } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";

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

// CallTimer Hook
function useCallTimer(isConnected: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval: any = null;
    if (isConnected) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return isConnected ? `${mm}:${ss}` : null;
}

/**
 * The "Elite Call Interface" main component (V2, robust, card layout).
 * Professional sectioning, logical grouping, section headers, unified cards, visual indicators, clear hierarchy.
 */
const EliteCallInterface = () => {
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

  // Modal states
  const [isScriptEditorOpen, setIsScriptEditorOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);

  // Script and agent states
  const [currentScript, setCurrentScript] = useState("");
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

  // Callback for outcomes
  const handleOutcome = (outcome: string) => {
    toast({ title: `Outcome: ${outcome}` });
    // ... In real use: log with API, etc.
  };

  // Modal handlers
  const handleScriptSave = (script: string) => {
    setCurrentScript(script);
    setIsScriptEditorOpen(false);
    toast({ 
      title: "Script Updated", 
      description: "Your call script has been updated and will be used for future calls." 
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

  return (
    <EliteErrorBoundary>
      <div className="max-w-6xl mx-auto mt-10 mb-9 grid grid-cols-1 lg:grid-cols-8 gap-8 animate-fade-in">
        {/* ----- TOP: CALL STATUS HEADER ------- */}
        <div className="col-span-8 mb-0">
          <CardSection className="flex flex-row items-center gap-4 !mb-6 px-6 py-4 border-blue-300 shadow-md bg-blue-50/80 sticky top-2 z-10">
            <SectionHeader
              icon={<Activity className={`h-5 w-5 ${isConnected ? "text-green-500 animate-pulse" : "text-gray-400"}`} />}
              title={isConnected ? "Live Call In Progress" : "Waiting for Call…"}
              // subtext should be React.ReactNode, see SectionHeader fix!
              subtext={isConnected && callDuration ? (
                <span className="flex items-center gap-1 text-xs font-mono text-gray-700">
                  <Clock className="h-4 w-4 inline-block mr-1" /> {callDuration}
                </span>
              ) : undefined}
              className="!mb-0"
            />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
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
                <Edit className="h-4 w-4" />
                Edit Script
              </Button>
              <span
                className={`rounded px-3 py-1.5 text-xs font-bold tracking-wider border
                  ${isConnected ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}
              >
                {isConnected ? "CONNECTED" : "IDLE"}
              </span>
            </div>
          </CardSection>
        </div>

        {/* ----- LEFT PANEL ----- */}
        <div className="col-span-2 flex flex-col gap-0">
          {/* Lead Info */}
          <CardSection>
            <SectionHeader
              icon={<Users className="w-5 h-5 text-blue-700" />}
              title="Lead Info"
            />
            <LeadInfoPanel lead={DUMMY_LEAD} />
          </CardSection>

          {/* --- LISTEN + CONTROLS GROUP BOX --- */}
          <CardSection className="mt-2 !pb-0">
            {/* Live listen, visually separated */}
            <SectionHeader
              icon={<Headphones className="w-5 h-5 text-blue-700" />}
              title="Live Listen"
            />
            <LiveListen
              isConnected={isConnected}
              onSpeak={onSpeak}
              onVolumeChange={onVolumeChange}
            />
          </CardSection>

          {/* Call Controls */}
          <CardSection className="mt-0 pt-0">
            <SectionHeader
              title="Call Controls"
              icon={<Activity className="w-5 h-5 text-blue-500" />}
            />
            <QuickActionsBar
              isConnected={isConnected}
              isMuted={isMuted}
              isHolding={isHolding}
              onMuteToggle={onMuteToggle}
              onEndCall={onEndCall}
              onHoldToggle={onHoldToggle}
            />
          </CardSection>

          {/* Script/Instructions Group */}
          <CardSection className="mt-4 !mb-2">
            <SectionHeader icon={<FileText className="w-5 h-5 text-indigo-500" />} title="Script Breakdown" />
            <ScriptBreakdownView
              scriptSections={SCRIPT_STEPS}
              currentStepIdx={agentIdx}
            />
            <div className="my-3" />
            <SectionHeader title="Agent Instructions" />
            <AgentInstructions
              agentInstructions={agentInstructions}
              outcomeGoals={outcomeGoals}
            />
          </CardSection>
        </div>

        {/* ----- CENTER MAIN TRANSCRIPT MONITOR ----- */}
        <div className="col-span-4 flex flex-col gap-4">
          <CardSection borderColor="border-blue-200">
            <SectionHeader
              icon={<Activity className="w-5 h-5 text-blue-700" />}
              title="Active Call Transcript"
            />
            <RealtimeMonitorPanel
              isConnected={isConnected}
              transcriptLines={transcriptLines}
            />
          </CardSection>
          <CardSection className="pt-2 pb-3 border-blue-100">
            <SectionHeader
              icon={<Activity className="w-4 h-4 text-blue-400" />}
              title="Log Call Outcome"
            />
            {/* Call Outcomes Fast Logging */}
            <CallOutcomeButtons onOutcomeSelect={handleOutcome} />
          </CardSection>
        </div>

        {/* ----- RIGHT PANEL: (AI Assistant & future) ----- */}
        <div className="hidden lg:flex col-span-2 flex-col gap-5">
          <CardSection>
            <SectionHeader
              icon={<Bot className="w-5 h-5 text-blue-700" />}
              title="AI Assistant"
            />
            <AIAssistantPanel />
          </CardSection>
        </div>
      </div>

      {/* Modals */}
      <EliteScriptEditorModal
        isOpen={isScriptEditorOpen}
        onClose={() => setIsScriptEditorOpen(false)}
        initialScript={currentScript}
        onSave={handleScriptSave}
      />

      <EditAgentModal
        isOpen={isEditAgentOpen}
        onClose={() => setIsEditAgentOpen(false)}
        initialSettings={agentSettings}
        onSave={handleAgentSave}
      />
    </EliteErrorBoundary>
  );
};

export default EliteCallInterface;
