
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Globe, Search, Volume2 } from "lucide-react";
import { LanguageConfig } from "../outreach/types";
import { SUPPORTED_LANGUAGES, getLanguageByCode, getVoicesForLanguage } from "./languageConfig";

interface EnhancedLanguageSelectorProps {
  config: LanguageConfig;
  onConfigChange: (config: LanguageConfig) => void;
  showVoiceSelection?: boolean;
}

const EnhancedLanguageSelector = ({ 
  config, 
  onConfigChange, 
  showVoiceSelection = true 
}: EnhancedLanguageSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSecondaryLanguages, setShowSecondaryLanguages] = useState(false);

  const updateConfig = (updates: Partial<LanguageConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handlePrimaryLanguageChange = (languageCode: string) => {
    const language = getLanguageByCode(languageCode);
    const defaultVoice = language?.elevenlabsVoices[0]?.id;
    
    updateConfig({
      primaryLanguage: languageCode,
      voiceId: defaultVoice,
      model: language?.defaultModel
    });
  };

  const availableSecondaryLanguages = filteredLanguages.filter(
    lang => lang.code !== config.primaryLanguage && !config.secondaryLanguages.includes(lang.code)
  );

  const primaryLanguage = getLanguageByCode(config.primaryLanguage);
  const availableVoices = getVoicesForLanguage(config.primaryLanguage);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <CardTitle>Language & Voice Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure how your AI agent communicates in different languages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Primary Language */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Primary Language</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <Button
                key={lang.code}
                variant={config.primaryLanguage === lang.code ? "default" : "outline"}
                className="justify-start h-auto p-3"
                onClick={() => handlePrimaryLanguageChange(lang.code)}
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

        {/* Voice Selection */}
        {showVoiceSelection && primaryLanguage && availableVoices.length > 0 && (
          <div className="space-y-2">
            <Label>Voice Selection</Label>
            <Select 
              value={config.voiceId || availableVoices[0].id} 
              onValueChange={(value) => updateConfig({ voiceId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <span>{voice.name}</span>
                      <Badge variant="outline" className="capitalize">
                        {voice.gender}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
            
            {config.secondaryLanguages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {config.secondaryLanguages.map((langCode) => {
                  const lang = getLanguageByCode(langCode);
                  return (
                    <Badge key={langCode} variant="secondary" className="flex items-center gap-1">
                      <span>{lang?.flag}</span>
                      <span>{lang?.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeSecondaryLanguage(langCode)}
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
                    onClick={() => addSecondaryLanguage(lang.code)}
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

export default EnhancedLanguageSelector;
