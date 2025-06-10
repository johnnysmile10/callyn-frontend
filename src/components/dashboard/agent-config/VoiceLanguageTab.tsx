
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import EnhancedLanguageSelector from "../language/EnhancedLanguageSelector";
import LanguagePreviewSystem from "../language/LanguagePreviewSystem";
import VoiceSelectionCard from "./voice/VoiceSelectionCard";
import VoiceSettingsCard from "./voice/VoiceSettingsCard";
import SaveSettingsButton from "./voice/SaveSettingsButton";
import { LanguageConfig } from "../outreach/types";

const VoiceLanguageTab = () => {
  const { userAgent, onboardingData } = useAuth();
  
  // Get current settings from agent or onboarding data
  const currentVoice = userAgent?.configuration?.voice || onboardingData?.selectedVoice || "Aria";
  const currentLanguage = onboardingData?.languageConfig?.primaryLanguage || "en";
  const currentSpeed = onboardingData?.speakingSpeed || 1.0;
  const currentEnthusiasm = onboardingData?.enthusiasm || 5;

  const [selectedVoice, setSelectedVoice] = useState(currentVoice);
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>({
    primaryLanguage: currentLanguage,
    secondaryLanguages: onboardingData?.languageConfig?.secondaryLanguages || [],
    voiceId: onboardingData?.languageConfig?.voiceId || "9BWtsMINqrJLrRacOk9x",
    model: onboardingData?.languageConfig?.model || "eleven_multilingual_v2",
    tone: onboardingData?.languageConfig?.tone || "professional",
    formality: onboardingData?.languageConfig?.formality || "balanced",
    culturalAdaptation: onboardingData?.languageConfig?.culturalAdaptation || false,
    localExpressions: onboardingData?.languageConfig?.localExpressions || false
  });
  const [speakingSpeed, setSpeakingSpeed] = useState([currentSpeed]);
  const [enthusiasm, setEnthusiasm] = useState([currentEnthusiasm]);

  const handleLanguageConfigChange = (newConfig: LanguageConfig) => {
    setLanguageConfig(newConfig);
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
        onVoiceChange={(voiceId) => 
          setLanguageConfig(prev => ({ ...prev, voiceId }))
        }
      />

      {/* Voice Selection */}
      <VoiceSelectionCard
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
      />

      {/* Voice Settings */}
      <VoiceSettingsCard
        speakingSpeed={speakingSpeed}
        enthusiasm={enthusiasm}
        onSpeedChange={setSpeakingSpeed}
        onEnthusiasmChange={setEnthusiasm}
      />

      {/* Save Button */}
      <SaveSettingsButton
        selectedVoice={selectedVoice}
        speakingSpeed={speakingSpeed[0]}
        enthusiasm={enthusiasm[0]}
        languageConfig={languageConfig}
      />
    </div>
  );
};

export default VoiceLanguageTab;
