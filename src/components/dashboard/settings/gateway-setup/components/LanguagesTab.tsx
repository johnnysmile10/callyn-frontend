
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Globe } from "lucide-react";
import { LanguageMatch } from "../types/eliteGatewayTypes";
import LanguageCard from "./LanguageCard";

interface LanguagesTabProps {
  enableMultiLanguage: boolean;
  languages: LanguageMatch[];
  onToggleMultiLanguage: (enabled: boolean) => void;
  onAddLanguage: () => void;
  onUpdateLanguage: (index: number, field: keyof LanguageMatch, value: any) => void;
  onRemoveLanguage: (index: number) => void;
}

const LanguagesTab = ({ 
  enableMultiLanguage, 
  languages, 
  onToggleMultiLanguage, 
  onAddLanguage, 
  onUpdateLanguage, 
  onRemoveLanguage 
}: LanguagesTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">Multi-Language Support</h4>
        </div>
        <Switch
          checked={enableMultiLanguage}
          onCheckedChange={onToggleMultiLanguage}
        />
      </div>

      {enableMultiLanguage && (
        <div className="space-y-4">
          <Button onClick={onAddLanguage} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>

          {languages.map((lang, index) => (
            <LanguageCard
              key={index}
              language={lang}
              index={index}
              onUpdate={onUpdateLanguage}
              onRemove={onRemoveLanguage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagesTab;
