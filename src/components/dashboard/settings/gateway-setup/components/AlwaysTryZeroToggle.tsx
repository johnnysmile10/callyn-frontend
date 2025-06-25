
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Phone } from "lucide-react";

interface AlwaysTryZeroToggleProps {
  alwaysTryZero: boolean;
  onAlwaysTryZeroChange?: (enabled: boolean) => void;
}

const AlwaysTryZeroToggle = ({ alwaysTryZero, onAlwaysTryZeroChange }: AlwaysTryZeroToggleProps) => {
  return (
    <Card className="border-2 border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-orange-600" />
              <Label className="text-sm font-medium">Always Try Pressing 0</Label>
            </div>
            <p className="text-xs text-gray-600">
              Automatically try pressing 0 as a fallback when other options don't work
            </p>
          </div>
          <Switch
            checked={alwaysTryZero}
            onCheckedChange={onAlwaysTryZeroChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AlwaysTryZeroToggle;
