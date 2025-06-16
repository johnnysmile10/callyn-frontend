
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import CreateAgentWizard from "@/components/createAgent/CreateAgentWizard";
import CreateAgentSuccess from "@/components/createAgent/CreateAgentSuccess";

export interface AgentData {
  // Step 1 - Agent Type
  agentType: "inbound" | "outbound" | null;
  
  // Step 2 - Basic Info
  agentName: string;
  agentRole: string;
  businessContext: string;
  
  // Step 3 - Voice & Language
  voiceId: string;
  voicePreview?: string;
  primaryLanguage: string;
  additionalLanguages: string[];
  
  // Step 4 - Training Method
  trainingMethod: "upload" | "record" | "type" | null;
  uploadedFiles?: File[];
  recordedAudio?: Blob;
  typedScript?: string;
  
  // Step 5 - Call Behavior
  callObjectives: string[];
  objectionHandling: string;
  transferRules: string;
  maxCallDuration: number;
  
  // Step 6 - Integration
  crmIntegration: string;
  leadSources: string[];
  webhookUrl?: string;
  calendarIntegration?: string;
}

const CreateAgent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdAgent, setCreatedAgent] = useState<AgentData | null>(null);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleAgentCreated = (agentData: AgentData) => {
    setCreatedAgent(agentData);
    setShowSuccess(true);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (showSuccess && createdAgent) {
    return (
      <CreateAgentSuccess 
        agentData={createdAgent}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateAgentWizard 
        onAgentCreated={handleAgentCreated}
        onCancel={handleBackToDashboard}
      />
    </div>
  );
};

export default CreateAgent;
