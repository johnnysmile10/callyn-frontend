import EliteErrorBoundary from "./Elite/EliteErrorBoundary";
import { useEliteSimulatedCall } from "./Elite/useEliteSimulatedCall";
import LiveListen from "./Elite/LiveListen";
import QuickActionsBar from "./Elite/QuickActionsBar";
import AgentInstructions from "./Elite/AgentInstructions";
import RealtimeMonitorPanel from "./Elite/RealtimeMonitorPanel";
import ScriptBreakdownView from "./Elite/ScriptBreakdownView";
import CallOutcomeButtons from "./Elite/CallOutcomeButtons";
import LeadInfoPanel from "./Elite/LeadInfoPanel";
import { toast } from "@/hooks/use-toast";
import AIAssistantPanel from "./Elite/AIAssistantPanel";

/**
 * Simulated lead for demo.
 */
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

/**
 * The "Elite Call Interface" main component (V2, robust).
 * Provides live listen access, real-time controls, agent instruction snapshot, and instant monitoring.
 * Enhanced with error boundaries, loading states, improved accessibility.
 */
const EliteCallInterface = () => {
  // Simulate a call (replace with real call state in production, see useEliteSimulatedCall)
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
    transcriptLines
  } = useEliteSimulatedCall();

  // Figure out which script section is active
  const agentIdx = transcriptLines.reduce(
    (idx, l) =>
      l.speaker === "Agent" && idx < SCRIPT_STEPS.length - 1
        ? idx + 1
        : idx,
    0
  );

  // Callback for outcomes
  const handleOutcome = (outcome: string) => {
    toast({ title: `Outcome: ${outcome}` });
    // In real use: log with API, show toast, etc.
  };

  return (
    <EliteErrorBoundary>
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-8 gap-8 animate-fade-in">
        {/* --- COMMAND LEFT PANEL --- */}
        <div className="col-span-2 flex flex-col gap-6">
          <LeadInfoPanel lead={DUMMY_LEAD} />

          <LiveListen
            isConnected={isConnected}
            onSpeak={onSpeak}
            onVolumeChange={onVolumeChange}
          />

          <div>
            <QuickActionsBar
              isConnected={isConnected}
              isMuted={isMuted}
              isHolding={isHolding}
              onMuteToggle={onMuteToggle}
              onEndCall={onEndCall}
              onHoldToggle={onHoldToggle}
            />
          </div>

          {/* Script Breakdown */}
          <ScriptBreakdownView
            scriptSections={SCRIPT_STEPS}
            currentStepIdx={agentIdx}
          />

          {/* Agent Instructions, adjusted margin */}
          <AgentInstructions
            agentInstructions={agentInstructions}
            outcomeGoals={outcomeGoals}
          />
        </div>

        {/* --- CENTER MAIN TRANSCRIPT MONITOR --- */}
        <div className="col-span-4 flex flex-col gap-3">
          <RealtimeMonitorPanel
            isConnected={isConnected}
            transcriptLines={transcriptLines}
          />

          {/* Call Outcomes Fast Logging */}
          <CallOutcomeButtons onOutcomeSelect={handleOutcome} />
        </div>

        {/* --- (OPTIONAL) RIGHT PANEL for future expansion --- */}
        <div className="hidden lg:flex col-span-2 flex-col gap-5">
          <AIAssistantPanel />
        </div>
      </div>
    </EliteErrorBoundary>
  );
};

export default EliteCallInterface;
