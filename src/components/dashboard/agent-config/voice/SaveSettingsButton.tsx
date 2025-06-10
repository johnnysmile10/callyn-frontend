
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { LanguageConfig } from "../../outreach/types";

interface SaveSettingsButtonProps {
  selectedVoice: string;
  speakingSpeed: number;
  enthusiasm: number;
  languageConfig: LanguageConfig;
}

const SaveSettingsButton = ({ 
  selectedVoice, 
  speakingSpeed, 
  enthusiasm, 
  languageConfig 
}: SaveSettingsButtonProps) => {
  const { onboardingData, setOnboardingData } = useAuth();
  const { toast } = useToast();

  const handleSaveSettings = () => {
    const updatedData = {
      ...onboardingData,
      selectedVoice,
      speakingSpeed,
      enthusiasm,
      languageConfig
    };

    setOnboardingData(updatedData);
    
    toast({
      title: "Settings Saved",
      description: "Voice and language settings have been updated successfully.",
    });
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
        Save Voice & Language Settings
      </Button>
    </div>
  );
};

export default SaveSettingsButton;
