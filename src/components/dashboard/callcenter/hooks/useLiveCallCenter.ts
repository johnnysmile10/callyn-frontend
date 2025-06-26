
import { useState } from "react";
import { useEliteSimulatedCall } from "../Elite/useEliteSimulatedCall";
import { useCallCenterState } from "./useCallCenterState";
import { useCallTimer } from "../Elite/useCallTimer";
import { toast } from "@/hooks/use-toast";

export const useLiveCallCenter = () => {
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

  // Modal states
  const [isScriptEditorOpen, setIsScriptEditorOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);

  // Agent and script states
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

  // Track call start time when connected
  useState(() => {
    if (isConnected && !callStartTime) {
      setCallStartTime(new Date());
    } else if (!isConnected && callStartTime) {
      setCallStartTime(null);
    }
  });

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

  return {
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
  };
};
