
import React from "react";
import { Users, Headphones, Activity, FileText } from "lucide-react";
import CardSection from "./CardSection";
import SectionHeader from "./SectionHeader";
import LeadInfoPanel from "./LeadInfoPanel";
import LiveListen from "./LiveListen";
import QuickActionsBar from "./QuickActionsBar";
import ScriptBreakdownView from "./ScriptBreakdownView";
import AgentInstructions from "./AgentInstructions";

interface Lead {
  name: string;
  phone: string;
  note?: string;
}

interface CallControlsSectionProps {
  lead: Lead;
  isConnected: boolean;
  isMuted: boolean;
  isHolding: boolean;
  onMuteToggle: () => void;
  onEndCall: () => void;
  onHoldToggle: () => void;
  onSpeak: (text: string) => void;
  onVolumeChange: (vol: number) => void;
  scriptSections: Array<{ step: string; details: string }>;
  currentStepIdx: number;
  agentInstructions: string;
  outcomeGoals: string;
}

const CallControlsSection = ({
  lead,
  isConnected,
  isMuted,
  isHolding,
  onMuteToggle,
  onEndCall,
  onHoldToggle,
  onSpeak,
  onVolumeChange,
  scriptSections,
  currentStepIdx,
  agentInstructions,
  outcomeGoals
}: CallControlsSectionProps) => {
  return (
    <div className="col-span-2 flex flex-col gap-0">
      {/* Lead Info */}
      <CardSection>
        <SectionHeader
          icon={<Users className="w-5 h-5 text-blue-700" />}
          title="Lead Info"
        />
        <LeadInfoPanel lead={lead} />
      </CardSection>

      {/* Live Listen + Controls Group */}
      <CardSection className="mt-2 !pb-0">
        <SectionHeader
          icon={<Headphones className="w-5 h-5 text-blue-700" />}
          title="Live Listen"
        />
        <LiveListen
          isConnected={isConnected}
          onSpeak={onSpeak}
          onVolumeChange={onVolumeChange}
        />
      </CardSection>

      {/* Call Controls */}
      <CardSection className="mt-0 pt-0">
        <SectionHeader
          title="Call Controls"
          icon={<Activity className="w-5 h-5 text-blue-500" />}
        />
        <QuickActionsBar
          isConnected={isConnected}
          isMuted={isMuted}
          isHolding={isHolding}
          onMuteToggle={onMuteToggle}
          onEndCall={onEndCall}
          onHoldToggle={onHoldToggle}
        />
      </CardSection>

      {/* Script/Instructions Group */}
      <CardSection className="mt-4 !mb-2">
        <SectionHeader 
          icon={<FileText className="w-5 h-5 text-indigo-500" />} 
          title="Script Breakdown" 
        />
        <ScriptBreakdownView
          scriptSections={scriptSections}
          currentStepIdx={currentStepIdx}
        />
        <div className="my-3" />
        <SectionHeader title="Agent Instructions" />
        <AgentInstructions
          agentInstructions={agentInstructions}
          outcomeGoals={outcomeGoals}
        />
      </CardSection>
    </div>
  );
};

export default CallControlsSection;
