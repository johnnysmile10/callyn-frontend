
import VoiceLanguageTab from "../../agent-config/VoiceLanguageTab";

interface Step4VoiceSettingsProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step4VoiceSettings = ({ data, onUpdate }: Step4VoiceSettingsProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <VoiceLanguageTab />
    </div>
  );
};

export default Step4VoiceSettings;
