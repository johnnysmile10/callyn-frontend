
import { X, Volume2, BarChart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceTestingPanel from "../VoiceTestingPanel";
import DailyCallSummary from "../DailyCallSummary";
import CallRateControls from "../CallRateControls";
import { useCallCenterState } from "../hooks/useCallCenterState";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDrawer = ({ isOpen, onClose }: SettingsDrawerProps) => {
  const { callRate, dailySummary, updateCallRate } = useCallCenterState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      {/* Drawer */}
      <div className="ml-auto w-96 bg-white shadow-xl flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Settings & Analytics</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Voice Testing */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Voice Testing</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <VoiceTestingPanel />
            </div>
          </div>

          {/* Call Rate Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Call Rate Settings</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <CallRateControls 
                callRate={callRate}
                onRateChange={updateCallRate}
              />
            </div>
          </div>

          {/* Analytics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Today's Analytics</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <DailyCallSummary summary={dailySummary} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
