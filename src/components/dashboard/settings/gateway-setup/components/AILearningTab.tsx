
import { Switch } from "@/components/ui/switch";
import { Zap } from "lucide-react";

interface AILearningTabProps {
  enableAILearning: boolean;
  onToggleAILearning: (enabled: boolean) => void;
}

const AILearningTab = ({ enableAILearning, onToggleAILearning }: AILearningTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          <h4 className="font-medium">AI Learning</h4>
        </div>
        <Switch
          checked={enableAILearning}
          onCheckedChange={onToggleAILearning}
        />
      </div>

      {enableAILearning && (
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-medium text-yellow-900 mb-2">AI Learning Features</h5>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Adaptive response timing based on success patterns</li>
              <li>• Automatic fallback strategy optimization</li>
              <li>• Real-time confidence scoring adjustments</li>
              <li>• Pattern recognition for improved navigation</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AILearningTab;
