
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Activity, BarChart, Settings } from "lucide-react";
import LiveCallContent from "./components/LiveCallContent";
import LiveUsageTracker from "./usage/LiveUsageTracker";
import { useLiveCallCenter } from "./hooks/useLiveCallCenter";

const LiveCallCenter = () => {
  const [activeTab, setActiveTab] = useState("calls");
  
  const {
    isConnected,
    isMuted,
    isHolding,
    transcriptLines,
    agentInstructions,
    outcomeGoals,
    callStartTime,
    onMuteToggle,
    onEndCall,
    onHoldToggle,
    onSpeak,
    onVolumeChange,
    handleOutcome,
    handleUpgradeClick,
  } = useLiveCallCenter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Phone className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Call Center</h1>
          <p className="text-gray-600">
            Monitor live calls and track usage in real-time
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calls" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Live Calls
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Usage Tracking
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calls" className="space-y-6">
          <LiveCallContent
            isConnected={isConnected}
            isMuted={isMuted}
            isHolding={isHolding}
            transcriptLines={transcriptLines}
            agentInstructions={agentInstructions}
            outcomeGoals={outcomeGoals}
            callStartTime={callStartTime}
            onMuteToggle={onMuteToggle}
            onEndCall={onEndCall}
            onHoldToggle={onHoldToggle}
            onSpeak={onSpeak}
            onVolumeChange={onVolumeChange}
            onOutcomeSelect={handleOutcome}
            onUpgradeClick={handleUpgradeClick}
          />
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <LiveUsageTracker onUpgradeClick={handleUpgradeClick} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="text-center py-12">
            <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
            <p className="text-gray-600">
              Detailed call analytics and performance metrics will be available here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveCallCenter;
