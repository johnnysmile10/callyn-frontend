
import React from "react";
import { Activity } from "lucide-react";
import CardSection from "./CardSection";
import SectionHeader from "./SectionHeader";
import RealtimeMonitorPanel from "./RealtimeMonitorPanel";
import CallOutcomeButtons from "./CallOutcomeButtons";

interface TranscriptSectionProps {
  isConnected: boolean;
  transcriptLines: Array<{ speaker: string; text: string }>;
  onOutcomeSelect: (outcome: string) => void;
}

const TranscriptSection = ({
  isConnected,
  transcriptLines,
  onOutcomeSelect
}: TranscriptSectionProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-4">
      <CardSection borderColor="border-blue-200">
        <SectionHeader
          icon={<Activity className="w-5 h-5 text-blue-700" />}
          title="Active Call Transcript"
        />
        <RealtimeMonitorPanel
          isConnected={isConnected}
          transcriptLines={transcriptLines}
        />
      </CardSection>
      
      <CardSection className="pt-2 pb-3 border-blue-100">
        <SectionHeader
          icon={<Activity className="w-4 h-4 text-blue-400" />}
          title="Log Call Outcome"
        />
        <CallOutcomeButtons onOutcomeSelect={onOutcomeSelect} />
      </CardSection>
    </div>
  );
};

export default TranscriptSection;
