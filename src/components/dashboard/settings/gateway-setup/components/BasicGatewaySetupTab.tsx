
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Phone } from "lucide-react";

interface BasicGatewaySettings {
  phoneSystemType: string;
  waitTimeBeforeInput: number;
  firstAction: string;
  fallbackAction: string;
}

interface BasicGatewaySetupTabProps {
  settings: BasicGatewaySettings;
  onSettingsChange: (settings: Partial<BasicGatewaySettings>) => void;
}

const PHONE_SYSTEM_TYPES = [
  { value: 'ivr', label: 'IVR System (Interactive Voice Response)' },
  { value: 'pbx', label: 'PBX (Private Branch Exchange)' },
  { value: 'voicemail', label: 'Voicemail System' },
  { value: 'auto_attendant', label: 'Auto Attendant' },
  { value: 'call_center', label: 'Call Center Queue' },
  { value: 'other', label: 'Other/Custom' }
];

const FIRST_ACTIONS = [
  { value: 'press_1', label: 'Press 1' },
  { value: 'press_2', label: 'Press 2' },
  { value: 'press_3', label: 'Press 3' },
  { value: 'press_0', label: 'Press 0 (Operator)' },
  { value: 'wait', label: 'Wait for prompt' },
  { value: 'speak_name', label: 'Speak company name' }
];

const FALLBACK_ACTIONS = [
  { value: 'press_0', label: 'Press 0 (Transfer to operator)' },
  { value: 'end_call', label: 'End call politely' },
  { value: 'repeat', label: 'Repeat last action' },
  { value: 'wait_longer', label: 'Wait longer for response' }
];

const BasicGatewaySetupTab = ({ settings, onSettingsChange }: BasicGatewaySetupTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Phone className="h-5 w-5" />
            Basic Gateway Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Phone System Type</Label>
              <Select
                value={settings.phoneSystemType}
                onValueChange={(value) => onSettingsChange({ phoneSystemType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select phone system type" />
                </SelectTrigger>
                <SelectContent>
                  {PHONE_SYSTEM_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                Choose the type of phone system your agent will navigate
              </p>
            </div>

            <div className="space-y-2">
              <Label>Wait Time Before Input (seconds)</Label>
              <Input
                type="number"
                min="1"
                max="30"
                value={settings.waitTimeBeforeInput}
                onChange={(e) => onSettingsChange({ waitTimeBeforeInput: parseInt(e.target.value) || 3 })}
                placeholder="3"
              />
              <p className="text-sm text-gray-600">
                How long to wait before taking action (1-30 seconds)
              </p>
            </div>

            <div className="space-y-2">
              <Label>What to Press First</Label>
              <Select
                value={settings.firstAction}
                onValueChange={(value) => onSettingsChange({ firstAction: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select first action" />
                </SelectTrigger>
                <SelectContent>
                  {FIRST_ACTIONS.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                The initial action when the call connects
              </p>
            </div>

            <div className="space-y-2">
              <Label>Fallback Action if Failed</Label>
              <Select
                value={settings.fallbackAction}
                onValueChange={(value) => onSettingsChange({ fallbackAction: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fallback action" />
                </SelectTrigger>
                <SelectContent>
                  {FALLBACK_ACTIONS.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                What to do if navigation fails or times out
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicGatewaySetupTab;
