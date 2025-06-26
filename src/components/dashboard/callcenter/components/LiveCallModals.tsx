
import UnifiedScriptEditor from "../../shared/UnifiedScriptEditor";
import EditAgentModal from "../Elite/EditAgentModal";

interface LiveCallModalsProps {
  isScriptEditorOpen: boolean;
  isEditAgentOpen: boolean;
  onCloseScriptEditor: () => void;
  onCloseEditAgent: () => void;
  currentScript: string;
  currentPersonality: string;
  useSmallTalk: boolean;
  handleObjections: boolean;
  agentSettings: any;
  onScriptSave: (data: {
    script: string;
    personality: string;
    useSmallTalk: boolean;
    handleObjections: boolean;
  }) => void;
  onAgentSave: (settings: any) => void;
}

const LiveCallModals = ({
  isScriptEditorOpen,
  isEditAgentOpen,
  onCloseScriptEditor,
  onCloseEditAgent,
  currentScript,
  currentPersonality,
  useSmallTalk,
  handleObjections,
  agentSettings,
  onScriptSave,
  onAgentSave,
}: LiveCallModalsProps) => {
  return (
    <>
      <UnifiedScriptEditor
        isOpen={isScriptEditorOpen}
        onClose={onCloseScriptEditor}
        initialScript={currentScript}
        initialPersonality={currentPersonality}
        initialUseSmallTalk={useSmallTalk}
        initialHandleObjections={handleObjections}
        onSave={onScriptSave}
      />

      <EditAgentModal
        isOpen={isEditAgentOpen}
        onClose={onCloseEditAgent}
        initialSettings={agentSettings}
        onSave={onAgentSave}
      />
    </>
  );
};

export default LiveCallModals;
