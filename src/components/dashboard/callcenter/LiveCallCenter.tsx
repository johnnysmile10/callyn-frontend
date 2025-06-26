
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Bot,
  FileText,
  Clock,
  Users,
  Activity,
  Settings
} from "lucide-react";

// Import new clean components
import { useCallCenterState } from "./hooks/useCallCenterState";
import { useEliteSimulatedCall } from "./Elite/useEliteSimulatedCall";
import { useCallTimer } from "./Elite/useCallTimer";
import { toast } from "@/hooks/use-toast";
import UnifiedScriptEditor from "../shared/UnifiedScriptEditor";
import EditAgentModal from "./Elite/EditAgentModal";
import LiveUsageTracker from "./usage/LiveUsageTracker";

// Import the new clean layout components
import LiveCallHeader from "./components/LiveCallHeader";
import LeadSidebar from "./components/LeadSidebar";
import CallTranscriptCenter from "./components/CallTranscriptCenter";
import ScriptSidebar from "./components/ScriptSidebar";
import SettingsDrawer from "./components/SettingsDrawer";

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

const LiveCallCenter = () => {
  const { 
    agentStatus, 
    updateAgentStatus,
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
      title: "Script Updated", 
      description: "Your call script has been updated successfully." 
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
    toast({ title: `Call outcome logged: ${outcome}` });
  };

  const handleUpgradeClick = () => {
    window.open('/dashboard?activeTab=price-plan', '_blank');
  };

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
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Lead Info & Usage Tracker */}
        <div className="w-80 bg-white border-r flex flex-col">
          <LeadSidebar
            lead={DUMMY_LEAD}
            agentInstructions={agentInstructions}
            outcomeGoals={outcomeGoals}
            onOutcomeSelect={handleOutcome}
          />
          
          {/* Compact Usage Tracker */}
          <div className="p-4 border-t">
            <LiveUsageTracker 
              compact={true}
              onUpgradeClick={handleUpgradeClick}
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

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

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
  );
};

export default LiveCallCenter;
