
import React from "react";
import { Bot } from "lucide-react";
import CardSection from "./CardSection";
import SectionHeader from "./SectionHeader";
import AIAssistantPanel from "./AIAssistantPanel";

const AIAssistantSection = () => {
  return (
    <div className="hidden lg:flex col-span-2 flex-col gap-5">
      <CardSection>
        <SectionHeader
          icon={<Bot className="w-5 h-5 text-blue-700" />}
          title="AI Assistant"
        />
        <AIAssistantPanel />
      </CardSection>
    </div>
  );
};

export default AIAssistantSection;
