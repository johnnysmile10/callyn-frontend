
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Activity, Clock, Edit } from "lucide-react";
import CardSection from "./CardSection";
import SectionHeader from "./SectionHeader";

interface CallStatusHeaderProps {
  isConnected: boolean;
  callDuration: string | null;
  onEditAgent: () => void;
  onEditScript: () => void;
}

const CallStatusHeader = ({ 
  isConnected, 
  callDuration, 
  onEditAgent, 
  onEditScript 
}: CallStatusHeaderProps) => {
  return (
    <div className="col-span-8 mb-0">
      <CardSection className="flex flex-row items-center gap-4 !mb-6 px-6 py-4 border-blue-300 shadow-md bg-blue-50/80 sticky top-2 z-10">
        <SectionHeader
          icon={<Activity className={`h-5 w-5 ${isConnected ? "text-green-500 animate-pulse" : "text-gray-400"}`} />}
          title={isConnected ? "Live Call In Progress" : "Waiting for Call…"}
          subtext={isConnected && callDuration ? (
            <span className="flex items-center gap-1 text-xs font-mono text-gray-700">
              <Clock className="h-4 w-4 inline-block mr-1" /> {callDuration}
            </span>
          ) : undefined}
          className="!mb-0"
        />
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onEditAgent}
            className="flex items-center gap-1"
          >
            <Bot className="h-4 w-4" />
            Edit Agent
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onEditScript}
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit Script
          </Button>
          <span
            className={`rounded px-3 py-1.5 text-xs font-bold tracking-wider border
              ${isConnected ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}
          >
            {isConnected ? "CONNECTED" : "IDLE"}
          </span>
        </div>
      </CardSection>
    </div>
  );
};

export default CallStatusHeader;
