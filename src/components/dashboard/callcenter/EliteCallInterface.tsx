import LiveListen from "./Elite/LiveListen";
import QuickActionsBar from "./Elite/QuickActionsBar";
import AgentInstructions from "./Elite/AgentInstructions";
import RealtimeMonitorPanel from "./Elite/RealtimeMonitorPanel";
import useSimulatedCall from "./Elite/useSimulatedCall";
import ScriptBreakdownView from "./Elite/ScriptBreakdownView";
import CallOutcomeButtons from "./Elite/CallOutcomeButtons";
import LeadInfoPanel from "./Elite/LeadInfoPanel";
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

/**
 * The "Elite Call Interface" main component.
 * Provides live listen access, real-time controls, agent instruction snapshot, and instant monitoring.
 */
const EliteCallInterface = () => {
  // Simulate a call (replace with real call state in production)
  const {
    isConnected,
    isMuted,
    onMuteToggle,
    onEndCall,
    onHoldToggle,
    onSpeak,
    onVolumeChange,
    agentInstructions,
    outcomeGoals,
    transcriptLines,
    isHolding
  } = useSimulatedCall();

  // Figure out which script section is active by progression in fake transcript
  const agentIdx = transcriptLines.reduce(
    (idx, l) =>
      l.speaker === "Agent" && idx < SCRIPT_STEPS.length - 1
        ? idx + 1
        : idx,
    0
  );

  // Callback for outcomes (stub: shadcn toast can go here)
  const handleOutcome = (outcome: string) => {
    toast({ title: `Outcome: ${outcome}` });
    // In real use: log with API, show toast, etc.
  };

  return (
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
        <div className="bg-white border border-blue-100 rounded-lg shadow px-4 py-6 min-h-[200px] flex items-center justify-center text-gray-400 text-sm">
          {/* Placeholder for future tabs: AI Voice Tester, Agent Score, Metrics... */}
          <span>Coming Soon: Coaching, Voice Tester, Leaderboards</span>
        </div>
      </div>
    </div>
  );
};

export default EliteCallInterface;
