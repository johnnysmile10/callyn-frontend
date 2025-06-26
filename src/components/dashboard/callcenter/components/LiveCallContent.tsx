
import LeadSidebar from "./LeadSidebar";
import CallTranscriptCenter from "./CallTranscriptCenter";
import ScriptSidebar from "./ScriptSidebar";
import LiveUsageTracker from "../usage/LiveUsageTracker";

const DUMMY_LEAD = {
  name: "John Doe",
  phone: "+1 (555) 012-3344",
  note: "Solar warm lead, requested callback last week.",
};

const SCRIPT_STEPS = [
  { step: "Greeting", details: "Introduce yourself & company" },
  { step: "Reason", details: "Explain calling about new solar incentive" },
  { step: "Ask", details: "Are you the decision maker for home energy?" },
];

interface LiveCallContentProps {
  isConnected: boolean;
  isMuted: boolean;
  isHolding: boolean;
  transcriptLines: any[];
  agentInstructions: string;
  outcomeGoals: string;
  callStartTime: Date | null;
  onMuteToggle: () => void;
  onEndCall: () => void;
  onHoldToggle: () => void;
  onSpeak: (text: string) => void;
  onVolumeChange: (vol: number) => void;
  onOutcomeSelect: (outcome: string) => void;
  onUpgradeClick: () => void;
}

const LiveCallContent = ({
  isConnected,
  isMuted,
  isHolding,
  transcriptLines,
  agentInstructions,
  outcomeGoals,
  callStartTime,
  onMuteToggle,
  onEndCall,
  onHoldToggle,
  onSpeak,
  onVolumeChange,
  onOutcomeSelect,
  onUpgradeClick,
}: LiveCallContentProps) => {
  // Figure out which script section is active
  const agentIdx = transcriptLines.reduce(
    (idx, l) =>
      l.speaker === "Agent" && idx < SCRIPT_STEPS.length - 1
        ? idx + 1
        : idx,
    0
  );

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Sidebar - Lead Info & Usage Tracker */}
      <div className="w-80 bg-white border-r flex flex-col">
        <LeadSidebar
          lead={DUMMY_LEAD}
          agentInstructions={agentInstructions}
          outcomeGoals={outcomeGoals}
          onOutcomeSelect={onOutcomeSelect}
        />
        
        {/* Live Usage Tracker with real-time updates */}
        <div className="p-4 border-t">
          <LiveUsageTracker 
            compact={true}
            onUpgradeClick={onUpgradeClick}
            isLiveCall={isConnected}
            callStartTime={callStartTime || undefined}
          />
        </div>
      </div>

      {/* Center - Live Transcript & Call Controls */}
      <CallTranscriptCenter
        isConnected={isConnected}
        isMuted={isMuted}
        isHolding={isHolding}
        transcriptLines={transcriptLines}
        onMuteToggle={onMuteToggle}
        onEndCall={onEndCall}
        onHoldToggle={onHoldToggle}
        onSpeak={onSpeak}
        onVolumeChange={onVolumeChange}
      />

      {/* Right Sidebar - Script Guide */}
      <ScriptSidebar
        scriptSections={SCRIPT_STEPS}
        currentStepIdx={agentIdx}
      />
    </div>
  );
};

export default LiveCallContent;
