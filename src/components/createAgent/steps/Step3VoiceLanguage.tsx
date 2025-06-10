
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, X } from "lucide-react";
import { AgentData } from "@/pages/CreateAgent";
import { SUPPORTED_LANGUAGES } from "@/components/dashboard/language/languageConfig";

interface Step3Props {
  data: AgentData;
  updateData: (updates: Partial<AgentData>) => void;
  onNext: () => void;
}

const voices = [
  { id: "aria", name: "Aria", gender: "Female", accent: "American" },
  { id: "roger", name: "Roger", gender: "Male", accent: "British" },
  { id: "sarah", name: "Sarah", gender: "Female", accent: "Australian" },
  { id: "charlie", name: "Charlie", gender: "Male", accent: "American" },
  { id: "laura", name: "Laura", gender: "Female", accent: "Canadian" },
];

const Step3VoiceLanguage = ({ data, updateData, onNext }: Step3Props) => {
  const [selectedVoice, setSelectedVoice] = useState(data.voiceId || "aria");
  const [primaryLanguage, setPrimaryLanguage] = useState(data.primaryLanguage);
  const [additionalLanguages, setAdditionalLanguages] = useState<string[]>(data.additionalLanguages);

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
  };

  const addLanguage = (languageCode: string) => {
    if (!additionalLanguages.includes(languageCode) && languageCode !== primaryLanguage) {
      setAdditionalLanguages([...additionalLanguages, languageCode]);
    }
  };

  const removeLanguage = (languageCode: string) => {
    setAdditionalLanguages(additionalLanguages.filter(lang => lang !== languageCode));
  };

  const handleNext = () => {
    updateData({
      voiceId: selectedVoice,
      primaryLanguage,
      additionalLanguages
    });
    onNext();
  };

  const getLanguageName = (code: string) => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Voice & Language</h2>
        <p className="text-gray-600">Select how your agent will sound and which languages it will speak</p>
      </div>

      {/* Voice Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Voice</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {voices.map((voice) => (
            <Card 
              key={voice.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedVoice === voice.id ? "ring-2 ring-callyn-blue" : ""
              }`}
              onClick={() => handleVoiceSelect(voice.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{voice.name}</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  {voice.gender} • {voice.accent}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Language Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Primary Language</label>
            <Select value={primaryLanguage} onValueChange={setPrimaryLanguage}>
              <SelectTrigger className="w-full">
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

          <div>
            <label className="text-sm font-medium mb-2 block">Additional Languages (Optional)</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {additionalLanguages.map((langCode) => (
                <Badge key={langCode} variant="secondary" className="gap-1">
                  {getLanguageName(langCode)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => removeLanguage(langCode)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Select onValueChange={addLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add another language" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES
                  .filter(lang => lang.code !== primaryLanguage && !additionalLanguages.includes(lang.code))
                  .map((lang) => (
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
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleNext}
          className="px-8 py-3 bg-callyn-blue hover:bg-callyn-darkBlue"
        >
          Continue to Training
        </Button>
      </div>
    </div>
  );
};

export default Step3VoiceLanguage;
