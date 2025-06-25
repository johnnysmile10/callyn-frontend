
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Brain, Clock } from "lucide-react";
import { EliteGlobalSettings } from "../types/eliteGatewayTypes";

interface EliteGlobalSettingsPanelProps {
  settings: EliteGlobalSettings;
  onSettingsChange: (settings: Partial<EliteGlobalSettings>) => void;
}

const EliteGlobalSettingsPanel = ({ settings, onSettingsChange }: EliteGlobalSettingsPanelProps) => {
  return (
    <div className="space-y-6">
      {/* AI Learning Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Brain className="h-5 w-5" />
            AI Learning & Adaptation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Adaptive Learning</Label>
              <p className="text-sm text-gray-600">
                Enable AI to learn from successful calls and optimize responses
              </p>
            </div>
            <Switch
              checked={settings.adaptiveLearning}
              onCheckedChange={(checked) => onSettingsChange({ adaptiveLearning: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Real-time Adaptation</Label>
              <p className="text-sm text-gray-600">
                Adapt navigation strategies during active calls
              </p>
            </div>
            <Switch
              checked={settings.enableRealTimeAdaptation}
              onCheckedChange={(checked) => onSettingsChange({ enableRealTimeAdaptation: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Confidence Threshold</Label>
            <div className="px-2">
              <Slider
                value={[settings.confidenceThreshold]}
                onValueChange={([value]) => onSettingsChange({ confidenceThreshold: value })}
                max={1}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-600">
              Minimum confidence level: {Math.round(settings.confidenceThreshold * 100)}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call Management Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Clock className="h-5 w-5" />
            Call Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Max Call Duration (seconds)</Label>
            <Input
              type="number"
              value={settings.maxCallDuration}
              onChange={(e) => onSettingsChange({ maxCallDuration: parseInt(e.target.value) || 300 })}
              placeholder="300"
            />
            <p className="text-sm text-gray-600">
              Maximum time to spend navigating menus before fallback
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Fallback to Operator</Label>
              <p className="text-sm text-gray-600">
                Automatically transfer to human operator when navigation fails
              </p>
            </div>
            <Switch
              checked={settings.fallbackToOperator}
              onCheckedChange={(checked) => onSettingsChange({ fallbackToOperator: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EliteGlobalSettingsPanel;
