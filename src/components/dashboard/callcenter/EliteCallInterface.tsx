
import LiveListen from "./Elite/LiveListen";
import QuickActionsBar from "./Elite/QuickActionsBar";
import AgentInstructions from "./Elite/AgentInstructions";
import RealtimeMonitorPanel from "./Elite/RealtimeMonitorPanel";
import useSimulatedCall from "./Elite/useSimulatedCall";

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

  return (
    <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-5 gap-8 animate-fade-in">
      {/* Left section: Live Listen + Quick Actions */}
      <div className="col-span-2 flex flex-col gap-6">
        <LiveListen
          isConnected={isConnected}
          onSpeak={onSpeak}
          onVolumeChange={onVolumeChange}
        />
        <QuickActionsBar
          isConnected={isConnected}
          isMuted={isMuted}
          isHolding={isHolding}
          onMuteToggle={onMuteToggle}
          onEndCall={onEndCall}
          onHoldToggle={onHoldToggle}
        />
        <AgentInstructions
          agentInstructions={agentInstructions}
          outcomeGoals={outcomeGoals}
        />
      </div>
      {/* Main section: Realtime Monitor */}
      <div className="col-span-3">
        <RealtimeMonitorPanel
          isConnected={isConnected}
          transcriptLines={transcriptLines}
        />
      </div>
    </div>
  );
};

export default EliteCallInterface;
