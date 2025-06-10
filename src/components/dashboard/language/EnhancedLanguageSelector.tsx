
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { LanguageConfig } from "../outreach/types";
import { SUPPORTED_LANGUAGES, getLanguageByCode } from "./languageConfig";
import LanguageSearchBar from "./LanguageSearchBar";
import PrimaryLanguageSelector from "./PrimaryLanguageSelector";
import VoiceSelector from "./VoiceSelector";
import SecondaryLanguageManager from "./SecondaryLanguageManager";
import CommunicationStyleSettings from "./CommunicationStyleSettings";
import CulturalAdaptationSettings from "./CulturalAdaptationSettings";

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

  const updateConfig = (updates: Partial<LanguageConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrimaryLanguageChange = (languageCode: string) => {
    const language = getLanguageByCode(languageCode);
    const defaultVoice = language?.elevenlabsVoices[0]?.id;
    
    updateConfig({
      primaryLanguage: languageCode,
      voiceId: defaultVoice,
      model: language?.defaultModel
    });
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

  const primaryLanguage = getLanguageByCode(config.primaryLanguage);

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
        <LanguageSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Primary Language */}
        <PrimaryLanguageSelector
          selectedLanguage={config.primaryLanguage}
          filteredLanguages={filteredLanguages}
          onLanguageChange={handlePrimaryLanguageChange}
        />

        {/* Voice Selection */}
        {showVoiceSelection && primaryLanguage && (
          <VoiceSelector
            primaryLanguage={config.primaryLanguage}
            selectedVoiceId={config.voiceId}
            onVoiceChange={(voiceId) => updateConfig({ voiceId })}
          />
        )}

        {/* Secondary Languages */}
        <SecondaryLanguageManager
          primaryLanguage={config.primaryLanguage}
          secondaryLanguages={config.secondaryLanguages}
          filteredLanguages={filteredLanguages}
          onSecondaryLanguageAdd={addSecondaryLanguage}
          onSecondaryLanguageRemove={removeSecondaryLanguage}
        />

        {/* Communication Style */}
        <CommunicationStyleSettings
          tone={config.tone}
          formality={config.formality}
          onToneChange={(tone) => updateConfig({ tone })}
          onFormalityChange={(formality) => updateConfig({ formality })}
        />

        {/* Cultural Adaptation */}
        <CulturalAdaptationSettings
          culturalAdaptation={config.culturalAdaptation}
          localExpressions={config.localExpressions}
          onCulturalAdaptationChange={(culturalAdaptation) => updateConfig({ culturalAdaptation })}
          onLocalExpressionsChange={(localExpressions) => updateConfig({ localExpressions })}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedLanguageSelector;
