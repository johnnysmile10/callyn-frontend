
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Globe } from "lucide-react";
import { LanguageConfig } from "../outreach/types";

interface LanguageSelectorProps {
  config: LanguageConfig;
  onConfigChange: (config: LanguageConfig) => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
];

const LanguageSelector = ({ config, onConfigChange }: LanguageSelectorProps) => {
  const updateConfig = (updates: Partial<LanguageConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const addSecondaryLanguage = (languageCode: string) => {
    if (!config.secondaryLanguages.includes(languageCode) && languageCode !== config.primaryLanguage) {
      updateConfig({
        secondaryLanguages: [...config.secondaryLanguages, languageCode]
      });
    }
  };

  const removeSecondaryLanguage = (languageCode: string) => {
    updateConfig({
      secondaryLanguages: config.secondaryLanguages.filter(lang => lang !== languageCode)
    });
  };

  const getLanguageName = (code: string) => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code)?.name || code;
  };

  const getLanguageFlag = (code: string) => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code)?.flag || '🌐';
  };

  const availableSecondaryLanguages = SUPPORTED_LANGUAGES.filter(
    lang => lang.code !== config.primaryLanguage && !config.secondaryLanguages.includes(lang.code)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <CardTitle>Language Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure how your AI agent communicates in different languages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Language */}
        <div className="space-y-2">
          <Label>Primary Language</Label>
          <Select 
            value={config.primaryLanguage} 
            onValueChange={(value) => updateConfig({ primaryLanguage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select primary language" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Secondary Languages */}
        <div className="space-y-3">
          <Label>Secondary Languages (Optional)</Label>
          <p className="text-sm text-muted-foreground">
            Your agent can switch to these languages during conversations when needed
          </p>
          
          {config.secondaryLanguages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {config.secondaryLanguages.map((langCode) => (
                <Badge key={langCode} variant="secondary" className="flex items-center gap-1">
                  <span>{getLanguageFlag(langCode)}</span>
                  <span>{getLanguageName(langCode)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeSecondaryLanguage(langCode)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {availableSecondaryLanguages.length > 0 && (
            <Select onValueChange={addSecondaryLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add secondary language" />
              </SelectTrigger>
              <SelectContent>
                {availableSecondaryLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Communication Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select 
              value={config.tone} 
              onValueChange={(value: any) => updateConfig({ tone: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Formality</Label>
            <Select 
              value={config.formality} 
              onValueChange={(value: any) => updateConfig({ formality: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="informal">Informal</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cultural Adaptation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Cultural Adaptation</Label>
              <p className="text-sm text-muted-foreground">
                Adapt communication style based on cultural context
              </p>
            </div>
            <Switch 
              checked={config.culturalAdaptation}
              onCheckedChange={(checked) => updateConfig({ culturalAdaptation: checked })}
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
              checked={config.localExpressions}
              onCheckedChange={(checked) => updateConfig({ localExpressions: checked })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
