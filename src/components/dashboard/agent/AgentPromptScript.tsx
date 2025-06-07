
import { useState } from "react";
import ScriptTemplateSelector from "./ScriptTemplateSelector";
import ScriptPreviewModal from "./ScriptPreviewModal";
import ScriptEditorHeader from "./ScriptEditorHeader";
import ScriptEditorTabs from "./ScriptEditorTabs";
import { useScriptManager } from "./hooks/useScriptManager";

const AgentPromptScript = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("greeting");

  const {
    systemPrompt,
    greeting,
    mainPrompt,
    objectionResponses,
    tone,
    selectedTemplate,
    scriptVersions,
    isLoading,
    lastSaved,
    setSystemPrompt,
    setGreeting,
    setMainPrompt,
    setObjectionResponses,
    setTone,
    setSelectedTemplate,
    handleSaveScript,
    exportScript
  } = useScriptManager();

  return (
    <div className="space-y-6">
      <ScriptEditorHeader
        lastSaved={lastSaved}
        isLoading={isLoading}
        onSave={handleSaveScript}
        onPreview={() => setShowPreview(true)}
      />

      <ScriptTemplateSelector
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        onExport={exportScript}
      />

      <ScriptEditorTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        greeting={greeting}
        tone={tone}
        onGreetingChange={setGreeting}
        onToneChange={setTone}
        mainPrompt={mainPrompt}
        onMainPromptChange={setMainPrompt}
        objectionResponses={objectionResponses}
        onObjectionResponsesChange={setObjectionResponses}
        systemPrompt={systemPrompt}
        onSystemPromptChange={setSystemPrompt}
        scriptVersions={scriptVersions}
      />

      <ScriptPreviewModal
        greeting={greeting}
        mainPrompt={mainPrompt}
        objectionResponses={objectionResponses}
        tone={tone}
        showPreview={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default AgentPromptScript;
