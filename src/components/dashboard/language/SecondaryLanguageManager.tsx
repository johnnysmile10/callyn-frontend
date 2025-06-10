
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLanguageByCode } from "./languageConfig";

interface SecondaryLanguageManagerProps {
  primaryLanguage: string;
  secondaryLanguages: string[];
  filteredLanguages: typeof SUPPORTED_LANGUAGES;
  onSecondaryLanguageAdd: (languageCode: string) => void;
  onSecondaryLanguageRemove: (languageCode: string) => void;
}

const SecondaryLanguageManager = ({ 
  primaryLanguage,
  secondaryLanguages,
  filteredLanguages,
  onSecondaryLanguageAdd,
  onSecondaryLanguageRemove
}: SecondaryLanguageManagerProps) => {
  const [showSecondaryLanguages, setShowSecondaryLanguages] = useState(false);

  const availableSecondaryLanguages = filteredLanguages.filter(
    lang => lang.code !== primaryLanguage && !secondaryLanguages.includes(lang.code)
  );

  return (
    <>
      {/* Secondary Languages Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Enable Multi-Language Support</Label>
          <p className="text-sm text-muted-foreground">
            Allow your agent to switch languages during conversations
          </p>
        </div>
        <Switch 
          checked={showSecondaryLanguages}
          onCheckedChange={setShowSecondaryLanguages}
        />
      </div>

      {/* Secondary Languages */}
      {showSecondaryLanguages && (
        <div className="space-y-3">
          <Label>Secondary Languages</Label>
          
          {secondaryLanguages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {secondaryLanguages.map((langCode) => {
                const lang = getLanguageByCode(langCode);
                return (
                  <Badge key={langCode} variant="secondary" className="flex items-center gap-1">
                    <span>{lang?.flag}</span>
                    <span>{lang?.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => onSecondaryLanguageRemove(langCode)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          )}

          {availableSecondaryLanguages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
              {availableSecondaryLanguages.slice(0, 6).map((lang) => (
                <Button
                  key={lang.code}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => onSecondaryLanguageAdd(lang.code)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  <span>{lang.flag}</span>
                  <span className="ml-1 text-xs">{lang.name}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SecondaryLanguageManager;
