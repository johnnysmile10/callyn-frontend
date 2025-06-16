
import { Button } from "@/components/ui/button";
import { Bot, FileText, Settings, Clock, Wifi, WifiOff } from "lucide-react";

interface LiveCallHeaderProps {
  isConnected: boolean;
  callDuration: string | null;
  agentStatus: { isActive: boolean };
  onEditAgent: () => void;
  onEditScript: () => void;
  onSettings: () => void;
}

const LiveCallHeader = ({
  isConnected,
  callDuration,
  agentStatus,
  onEditAgent,
  onEditScript,
  onSettings
}: LiveCallHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Left - Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Phone className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Live Call Center</h1>
          <p className="text-sm text-gray-500">Real-time call operations</p>
        </div>
      </div>

      {/* Center - Call Status */}
      <div className="flex items-center gap-4">
        {/* Agent Status Icon */}
        <div className="flex items-center gap-2">
          {agentStatus.isActive ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-gray-400" />
          )}
          <span className="text-sm text-gray-600">
            {agentStatus.isActive ? "Agent Online" : "Agent Offline"}
          </span>
        </div>

        {/* Live Call Indicator */}
        {isConnected && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-800">LIVE CALL</span>
            {callDuration && (
              <div className="flex items-center gap-1 ml-2">
                <Clock className="h-3 w-3 text-green-600" />
                <span className="text-sm font-mono text-green-700">{callDuration}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right - Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEditAgent}
          className="flex items-center gap-1"
        >
          <Bot className="h-4 w-4" />
          Edit Agent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onEditScript}
          className="flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          Edit Script
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettings}
          className="flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LiveCallHeader;
