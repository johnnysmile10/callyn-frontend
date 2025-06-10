
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CulturalAdaptationSettingsProps {
  culturalAdaptation: boolean;
  localExpressions: boolean;
  onCulturalAdaptationChange: (checked: boolean) => void;
  onLocalExpressionsChange: (checked: boolean) => void;
}

const CulturalAdaptationSettings = ({ 
  culturalAdaptation,
  localExpressions,
  onCulturalAdaptationChange,
  onLocalExpressionsChange
}: CulturalAdaptationSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Cultural Adaptation</Label>
          <p className="text-sm text-muted-foreground">
            Adapt communication style based on cultural context
          </p>
        </div>
        <Switch 
          checked={culturalAdaptation}
          onCheckedChange={onCulturalAdaptationChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Use Local Expressions</Label>
          <p className="text-sm text-muted-foreground">
            Include region-specific phrases and expressions
          </p>
        </div>
        <Switch 
          checked={localExpressions}
          onCheckedChange={onLocalExpressionsChange}
        />
      </div>
    </div>
  );
};

export default CulturalAdaptationSettings;
