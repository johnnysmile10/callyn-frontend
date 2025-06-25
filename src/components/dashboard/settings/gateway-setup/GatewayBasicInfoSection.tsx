
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { GatewaySetupData } from "./types/gatewayTypes";

interface GatewayBasicInfoSectionProps {
  gatewaySetup: GatewaySetupData;
  onFieldChange: (field: keyof GatewaySetupData, value: any) => void;
}

const GatewayBasicInfoSection = ({ gatewaySetup, onFieldChange }: GatewayBasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gateway-name">Setup Name</Label>
          <Input
            id="gateway-name"
            placeholder="Main Gateway Setup"
            value={gatewaySetup.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="gateway-active">Enable Gateway Navigation</Label>
            <p className="text-sm text-gray-600">
              Allow AI agent to navigate phone menus
            </p>
          </div>
          <Switch
            id="gateway-active"
            checked={gatewaySetup.isActive}
            onCheckedChange={(checked) => onFieldChange('isActive', checked)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gateway-description">Description (Optional)</Label>
        <Textarea
          id="gateway-description"
          placeholder="Describe this gateway configuration..."
          value={gatewaySetup.description || ''}
          onChange={(e) => onFieldChange('description', e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
};

export default GatewayBasicInfoSection;
