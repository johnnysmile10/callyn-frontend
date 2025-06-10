
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  Clock, 
  Users, 
  Settings, 
  BarChart, 
  Volume2 
} from "lucide-react";
import AgentStatusControl from "./AgentStatusControl";
import OperatingHoursScheduler from "./OperatingHoursScheduler";
import CallQueueView from "./CallQueueView";
import VoiceTestingPanel from "./VoiceTestingPanel";
import CallRateControls from "./CallRateControls";
import DailyCallSummary from "./DailyCallSummary";
import { useCallCenterState } from "./hooks/useCallCenterState";

const CallCenterDashboard = () => {
  const { 
    agentStatus, 
    operatingHours, 
    callQueue, 
    callRate,
    dailySummary,
    updateAgentStatus,
    updateOperatingHours,
    updateCallRate
  } = useCallCenterState();

  const [activeTab, setActiveTab] = useState("status");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Phone className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Call Center Control</h1>
          <p className="text-gray-600">Manage your AI calling operations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="status" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Status
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hours
          </TabsTrigger>
          <TabsTrigger value="queue" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Queue
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Voice Test
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Controls
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <AgentStatusControl 
            status={agentStatus}
            onStatusChange={updateAgentStatus}
          />
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <OperatingHoursScheduler 
            hours={operatingHours}
            onHoursChange={updateOperatingHours}
          />
        </TabsContent>

        <TabsContent value="queue" className="space-y-6">
          <CallQueueView queue={callQueue} />
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <VoiceTestingPanel />
        </TabsContent>

        <TabsContent value="controls" className="space-y-6">
          <CallRateControls 
            callRate={callRate}
            onRateChange={updateCallRate}
          />
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <DailyCallSummary summary={dailySummary} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallCenterDashboard;
