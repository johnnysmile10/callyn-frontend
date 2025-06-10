
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SUPPORTED_LANGUAGES } from "./languageConfig";

interface PrimaryLanguageSelectorProps {
  selectedLanguage: string;
  filteredLanguages: typeof SUPPORTED_LANGUAGES;
  onLanguageChange: (languageCode: string) => void;
}

const PrimaryLanguageSelector = ({ 
  selectedLanguage, 
  filteredLanguages, 
  onLanguageChange 
}: PrimaryLanguageSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Primary Language</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
        {filteredLanguages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? "default" : "outline"}
            className="justify-start h-auto p-3"
            onClick={() => onLanguageChange(lang.code)}
          >
            <div className="flex items-center gap-2 text-left">
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{lang.name}</span>
                <span className="text-xs opacity-70">{lang.nativeName}</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PrimaryLanguageSelector;
