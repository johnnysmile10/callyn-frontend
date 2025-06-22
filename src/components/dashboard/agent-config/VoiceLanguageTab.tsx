
import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import EnhancedLanguageSelector from "../language/EnhancedLanguageSelector";
import LanguagePreviewSystem from "../language/LanguagePreviewSystem";
import VoiceSelectionCard from "./voice/VoiceSelectionCard";
import VoiceSettingsCard from "./voice/VoiceSettingsCard";
import SaveSettingsButton from "./voice/SaveSettingsButton";
import { LanguageConfig } from "../outreach/types";

interface VoiceLanguageTabProps {
  data?: any;
  onUpdate?: (data: any) => void;
  showSaveButton?: boolean;
}

const VoiceLanguageTab = ({ 
  data, 
  onUpdate, 
  showSaveButton = true 
}: VoiceLanguageTabProps) => {
  const { userAgent, onboardingData } = useAuth();
  
  // Get current settings from props data, agent, or onboarding data
  const currentVoice = data?.voiceId || userAgent?.configuration?.voice || onboardingData?.selectedVoice || "9BWtsMINqrJLrRacOk9x";
  const currentLanguage = data?.primaryLanguage || onboardingData?.languageConfig?.primaryLanguage || "en";
  const currentSpeed = data?.speakingSpeed || onboardingData?.speakingSpeed || 1.0;
  const currentEnthusiasm = data?.enthusiasm || onboardingData?.enthusiasm || 5;

  const [selectedVoice, setSelectedVoice] = useState(currentVoice);
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>({
    primaryLanguage: currentLanguage,
    secondaryLanguages: data?.additionalLanguages || onboardingData?.languageConfig?.secondaryLanguages || [],
    voiceId: currentVoice,
    model: data?.languageConfig?.model || onboardingData?.languageConfig?.model || "eleven_multilingual_v2",
    tone: data?.languageConfig?.tone || onboardingData?.languageConfig?.tone || "professional",
    formality: data?.languageConfig?.formality || onboardingData?.languageConfig?.formality || "balanced",
    culturalAdaptation: data?.languageConfig?.culturalAdaptation || onboardingData?.languageConfig?.culturalAdaptation || false,
    localExpressions: data?.languageConfig?.localExpressions || onboardingData?.languageConfig?.localExpressions || false
  });
  const [speakingSpeed, setSpeakingSpeed] = useState([currentSpeed]);
  const [enthusiasm, setEnthusiasm] = useState([currentEnthusiasm]);

  // Update parent component when data changes (if onUpdate is provided)
  useEffect(() => {
    if (onUpdate) {
      const updatedData = {
        voiceId: selectedVoice,
        speakingSpeed: speakingSpeed[0],
        enthusiasm: enthusiasm[0],
        primaryLanguage: languageConfig.primaryLanguage,
        additionalLanguages: languageConfig.secondaryLanguages,
        languageConfig
      };
      onUpdate(updatedData);
    }
  }, [selectedVoice, speakingSpeed, enthusiasm, languageConfig, onUpdate]);

  const handleLanguageConfigChange = (newConfig: LanguageConfig) => {
    setLanguageConfig(newConfig);
    // Update selected voice if language config voice changes
    if (newConfig.voiceId && newConfig.voiceId !== selectedVoice) {
      setSelectedVoice(newConfig.voiceId);
    }
  };

  const handleVoiceChange = (newVoice: string) => {
    setSelectedVoice(newVoice);
    // Update language config voice ID as well
    setLanguageConfig(prev => ({ ...prev, voiceId: newVoice }));
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <EnhancedLanguageSelector
        config={languageConfig}
        onConfigChange={handleLanguageConfigChange}
        showVoiceSelection={true}
      />

      <LanguagePreviewSystem
        selectedLanguage={languageConfig.primaryLanguage}
        selectedVoice={languageConfig.voiceId}
        onLanguageChange={(language) => 
          setLanguageConfig(prev => ({ ...prev, primaryLanguage: language }))
        }
        onVoiceChange={handleVoiceChange}
      />

      {/* Voice Selection */}
      <VoiceSelectionCard
        selectedVoice={selectedVoice}
        onVoiceChange={handleVoiceChange}
      />

      {/* Voice Settings */}
      <VoiceSettingsCard
        speakingSpeed={speakingSpeed}
        enthusiasm={enthusiasm}
        onSpeedChange={setSpeakingSpeed}
        onEnthusiasmChange={setEnthusiasm}
      />

      {/* Save Button - only show if not being used as a controlled component */}
      {showSaveButton && (
        <SaveSettingsButton
          selectedVoice={selectedVoice}
          speakingSpeed={speakingSpeed[0]}
          enthusiasm={enthusiasm[0]}
          languageConfig={languageConfig}
        />
      )}
    </div>
  );
};

export default VoiceLanguageTab;
