
import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import EnhancedLanguageSelector from "../../language/EnhancedLanguageSelector";
import LanguagePreviewSystem from "../../language/LanguagePreviewSystem";
import VoiceSelectionCard from "../../agent-config/voice/VoiceSelectionCard";
import VoiceSettingsCard from "../../agent-config/voice/VoiceSettingsCard";
import { LanguageConfig } from "../../outreach/types";

interface VoiceSettingsData {
  voiceId: string;
  speakingSpeed: number;
  enthusiasm: number;
  primaryLanguage: string;
  additionalLanguages: string[];
  languageConfig?: LanguageConfig;
}

interface Step4VoiceSettingsProps {
  data: VoiceSettingsData;
  onUpdate: (data: VoiceSettingsData) => void;
}

const Step4VoiceSettings = ({ data, onUpdate }: Step4VoiceSettingsProps) => {
  const { userAgent, onboardingData } = useAuth();
  
  // Initialize state from props data or defaults
  const [selectedVoice, setSelectedVoice] = useState(
    data.voiceId || userAgent?.configuration?.voice || onboardingData?.selectedVoice || "9BWtsMINqrJLrRacOk9x"
  );
  
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>({
    primaryLanguage: data.primaryLanguage || onboardingData?.languageConfig?.primaryLanguage || "en",
    secondaryLanguages: data.additionalLanguages || onboardingData?.languageConfig?.secondaryLanguages || [],
    voiceId: data.voiceId || onboardingData?.languageConfig?.voiceId || "9BWtsMINqrJLrRacOk9x",
    model: data.languageConfig?.model || onboardingData?.languageConfig?.model || "eleven_multilingual_v2",
    tone: data.languageConfig?.tone || onboardingData?.languageConfig?.tone || "professional",
    formality: data.languageConfig?.formality || onboardingData?.languageConfig?.formality || "balanced",
    culturalAdaptation: data.languageConfig?.culturalAdaptation || onboardingData?.languageConfig?.culturalAdaptation || false,
    localExpressions: data.languageConfig?.localExpressions || onboardingData?.languageConfig?.localExpressions || false
  });
  
  const [speakingSpeed, setSpeakingSpeed] = useState([data.speakingSpeed || onboardingData?.speakingSpeed || 1.0]);
  const [enthusiasm, setEnthusiasm] = useState([data.enthusiasm || onboardingData?.enthusiasm || 5]);

  // Update parent data whenever local state changes
  useEffect(() => {
    const updatedData: VoiceSettingsData = {
      voiceId: selectedVoice,
      speakingSpeed: speakingSpeed[0],
      enthusiasm: enthusiasm[0],
      primaryLanguage: languageConfig.primaryLanguage,
      additionalLanguages: languageConfig.secondaryLanguages,
      languageConfig
    };
    onUpdate(updatedData);
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Enhanced Language Selection */}
      <EnhancedLanguageSelector
        config={languageConfig}
        onConfigChange={handleLanguageConfigChange}
        showVoiceSelection={true}
      />

      {/* Language Preview System */}
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
    </div>
  );
};

export default Step4VoiceSettings;
