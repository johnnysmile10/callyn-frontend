
import LiveCallHeader from "./components/LiveCallHeader";
import LiveCallContent from "./components/LiveCallContent";
import LiveCallModals from "./components/LiveCallModals";
import SettingsDrawer from "./components/SettingsDrawer";
import { useLiveCallCenter } from "./hooks/useLiveCallCenter";

const LiveCallCenter = () => {
  const {
    // State
    agentStatus,
    isConnected,
    isMuted,
    isHolding,
    transcriptLines,
    agentInstructions,
    outcomeGoals,
    callDuration,
    callStartTime,
    
    // Modal states
    isScriptEditorOpen,
    isEditAgentOpen,
    isSettingsOpen,
    
    // Script/Agent states
    currentScript,
    currentPersonality,
    useSmallTalk,
    handleObjections,
    agentSettings,
    
    // Actions
    onMuteToggle,
    onEndCall,
    onHoldToggle,
    onSpeak,
    onVolumeChange,
    
    // Modal actions
    setIsScriptEditorOpen,
    setIsEditAgentOpen,
    setIsSettingsOpen,
    
    // Handlers
    handleScriptSave,
    handleAgentSave,
    handleOutcome,
    handleUpgradeClick,
  } = useLiveCallCenter();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Clean Top Header */}
      <LiveCallHeader
        isConnected={isConnected}
        callDuration={callDuration}
        agentStatus={agentStatus}
        onEditAgent={() => setIsEditAgentOpen(true)}
        onEditScript={() => setIsScriptEditorOpen(true)}
        onSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Layout */}
      <LiveCallContent
        isConnected={isConnected}
        isMuted={isMuted}
        isHolding={isHolding}
        transcriptLines={transcriptLines}
        agentInstructions={agentInstructions}
        outcomeGoals={outcomeGoals}
        callStartTime={callStartTime}
        onMuteToggle={onMuteToggle}
        onEndCall={onEndCall}
        onHoldToggle={onHoldToggle}
        onSpeak={onSpeak}
        onVolumeChange={onVolumeChange}
        onOutcomeSelect={handleOutcome}
        onUpgradeClick={handleUpgradeClick}
      />

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Modals */}
      <LiveCallModals
        isScriptEditorOpen={isScriptEditorOpen}
        isEditAgentOpen={isEditAgentOpen}
        onCloseScriptEditor={() => setIsScriptEditorOpen(false)}
        onCloseEditAgent={() => setIsEditAgentOpen(false)}
        currentScript={currentScript}
        currentPersonality={currentPersonality}
        useSmallTalk={useSmallTalk}
        handleObjections={handleObjections}
        agentSettings={agentSettings}
        onScriptSave={handleScriptSave}
        onAgentSave={handleAgentSave}
      />
    </div>
  );
};

export default LiveCallCenter;
