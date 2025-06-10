
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageConfig } from "../outreach/types";

interface CommunicationStyleSettingsProps {
  tone: LanguageConfig['tone'];
  formality: LanguageConfig['formality'];
  onToneChange: (tone: LanguageConfig['tone']) => void;
  onFormalityChange: (formality: LanguageConfig['formality']) => void;
}

const CommunicationStyleSettings = ({ 
  tone, 
  formality, 
  onToneChange, 
  onFormalityChange 
}: CommunicationStyleSettingsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Tone</Label>
        <Select 
          value={tone} 
          onValueChange={onToneChange}
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
          value={formality} 
          onValueChange={onFormalityChange}
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
  );
};

export default CommunicationStyleSettings;
