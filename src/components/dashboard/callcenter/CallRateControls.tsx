
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Zap, 
  Shield, 
  Clock,
  TrendingUp
} from "lucide-react";

interface CallRateSettings {
  callsPerHour: number;
  concurrentCalls: number;
  retryAttempts: number;
  retryDelay: number;
  respectDNC: boolean;
  maxDailyLimit: number;
  adaptiveRating: boolean;
}

interface CallRateControlsProps {
  callRate: CallRateSettings;
  onRateChange: (settings: CallRateSettings) => void;
}

const CallRateControls = ({ callRate, onRateChange }: CallRateControlsProps) => {
  const updateSetting = (key: keyof CallRateSettings, value: number | boolean) => {
    onRateChange({
      ...callRate,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Rate Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Call Rate Settings
            </CardTitle>
            <CardDescription>
              Control how aggressively your agent makes calls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Calls per Hour: {callRate.callsPerHour}</Label>
              <Slider
                value={[callRate.callsPerHour]}
                onValueChange={([value]) => updateSetting('callsPerHour', value)}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Higher rates increase outreach but may reduce connection quality
              </p>
            </div>

            <div className="space-y-3">
              <Label>Concurrent Calls: {callRate.concurrentCalls}</Label>
              <Slider
                value={[callRate.concurrentCalls]}
                onValueChange={([value]) => updateSetting('concurrentCalls', value)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Maximum number of simultaneous calls
              </p>
            </div>

            <div className="space-y-2">
              <Label>Daily Call Limit</Label>
              <Input
                type="number"
                value={callRate.maxDailyLimit}
                onChange={(e) => updateSetting('maxDailyLimit', parseInt(e.target.value) || 0)}
                min={1}
                max={1000}
              />
            </div>
          </CardContent>
        </Card>

        {/* Retry & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Retry & Compliance
            </CardTitle>
            <CardDescription>
              Configure retry behavior and compliance settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Retry Attempts: {callRate.retryAttempts}</Label>
              <Slider
                value={[callRate.retryAttempts]}
                onValueChange={([value]) => updateSetting('retryAttempts', value)}
                min={0}
                max={5}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Retry Delay (minutes): {callRate.retryDelay}</Label>
              <Slider
                value={[callRate.retryDelay]}
                onValueChange={([value]) => updateSetting('retryDelay', value)}
                min={15}
                max={1440}
                step={15}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Respect Do Not Call Lists</Label>
                <p className="text-xs text-gray-500">
                  Automatically skip numbers on DNC registries
                </p>
              </div>
              <Switch
                checked={callRate.respectDNC}
                onCheckedChange={(checked) => updateSetting('respectDNC', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Adaptive Call Rating</Label>
                <p className="text-xs text-gray-500">
                  Automatically adjust call rate based on success
                </p>
              </div>
              <Switch
                checked={callRate.adaptiveRating}
                onCheckedChange={(checked) => updateSetting('adaptiveRating', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Presets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => onRateChange({
                callsPerHour: 10,
                concurrentCalls: 1,
                retryAttempts: 2,
                retryDelay: 60,
                respectDNC: true,
                maxDailyLimit: 50,
                adaptiveRating: false
              })}
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">Conservative</div>
              <div className="text-sm text-gray-500 mt-1">
                Low volume, high quality calls
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => onRateChange({
                callsPerHour: 30,
                concurrentCalls: 3,
                retryAttempts: 3,
                retryDelay: 120,
                respectDNC: true,
                maxDailyLimit: 200,
                adaptiveRating: true
              })}
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">Balanced</div>
              <div className="text-sm text-gray-500 mt-1">
                Moderate volume with good success rates
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => onRateChange({
                callsPerHour: 60,
                concurrentCalls: 5,
                retryAttempts: 1,
                retryDelay: 30,
                respectDNC: true,
                maxDailyLimit: 500,
                adaptiveRating: true
              })}
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">Aggressive</div>
              <div className="text-sm text-gray-500 mt-1">
                High volume outreach campaign
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallRateControls;
