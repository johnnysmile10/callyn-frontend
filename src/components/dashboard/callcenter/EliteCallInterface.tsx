
import EliteErrorBoundary from "./Elite/EliteErrorBoundary";
import { useEliteSimulatedCall } from "./Elite/useEliteSimulatedCall";
import UnifiedScriptEditor from "../shared/UnifiedScriptEditor";
import EditAgentModal from "./Elite/EditAgentModal";
import { toast } from "@/hooks/use-toast";
import CallStatusHeader from "./Elite/CallStatusHeader";
import CallControlsSection from "./Elite/CallControlsSection";
import TranscriptSection from "./Elite/TranscriptSection";
import AIAssistantSection from "./Elite/AIAssistantSection";
import { useCallTimer } from "./Elite/useCallTimer";
import React, { useState } from "react";

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

  // Callback for outcomes
  const handleOutcome = (outcome: string) => {
    toast({ title: `Outcome: ${outcome}` });
  };

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

  return (
    <EliteErrorBoundary>
      <div className="max-w-6xl mx-auto mt-10 mb-9 grid grid-cols-1 lg:grid-cols-8 gap-8 animate-fade-in">
        {/* Call Status Header */}
        <CallStatusHeader
          isConnected={isConnected}
          callDuration={callDuration}
          onEditAgent={() => setIsEditAgentOpen(true)}
          onEditScript={() => setIsScriptEditorOpen(true)}
        />

        {/* Call Controls Section */}
        <CallControlsSection
          lead={DUMMY_LEAD}
          isConnected={isConnected}
          isMuted={isMuted}
          isHolding={isHolding}
          onMuteToggle={onMuteToggle}
          onEndCall={onEndCall}
          onHoldToggle={onHoldToggle}
          onSpeak={onSpeak}
          onVolumeChange={onVolumeChange}
          scriptSections={SCRIPT_STEPS}
          currentStepIdx={agentIdx}
          agentInstructions={agentInstructions}
          outcomeGoals={outcomeGoals}
        />

        {/* Transcript Section */}
        <TranscriptSection
          isConnected={isConnected}
          transcriptLines={transcriptLines}
          onOutcomeSelect={handleOutcome}
        />

        {/* AI Assistant Section */}
        <AIAssistantSection />
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
    </EliteErrorBoundary>
  );
};

export default EliteCallInterface;
