
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Edit, Plus, Volume2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EnhancedLanguageSelector from "../language/EnhancedLanguageSelector";
import { LanguageConfig } from "../outreach/types";
import { getLanguageByCode, getVoicesForLanguage } from "../language/languageConfig";

interface LanguageConfigPanelProps {
  config?: LanguageConfig;
  onConfigChange: (config: LanguageConfig) => void;
}

const LanguageConfigPanel = ({ config, onConfigChange }: LanguageConfigPanelProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const defaultConfig: LanguageConfig = {
    primaryLanguage: 'en',
    secondaryLanguages: [],
    tone: 'professional',
    formality: 'balanced',
    culturalAdaptation: true,
    localExpressions: false
  };

  const currentConfig = config || defaultConfig;

  const handleConfigSave = (newConfig: LanguageConfig) => {
    onConfigChange(newConfig);
    setIsDialogOpen(false);
  };

  const primaryLanguage = getLanguageByCode(currentConfig.primaryLanguage);
  const selectedVoice = currentConfig.voiceId ? 
    getVoicesForLanguage(currentConfig.primaryLanguage).find(v => v.id === currentConfig.voiceId) : 
    null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <CardTitle>Language & Voice Configuration</CardTitle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {config ? <Edit className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {config ? 'Edit' : 'Configure'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Configure Language & Voice Settings</DialogTitle>
              </DialogHeader>
              <EnhancedLanguageSelector
                config={currentConfig}
                onConfigChange={handleConfigSave}
                showVoiceSelection={true}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {config ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Primary Language</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg">{primaryLanguage?.flag}</span>
                  <span className="text-sm text-gray-900">{primaryLanguage?.name}</span>
                  <span className="text-xs text-gray-500">({primaryLanguage?.nativeName})</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Communication Style</label>
                <p className="text-sm text-gray-900 mt-1 capitalize">
                  {config.tone} • {config.formality}
                </p>
              </div>
            </div>

            {selectedVoice && (
              <div>
                <label className="text-sm font-medium text-gray-500">Selected Voice</label>
                <div className="flex items-center gap-2 mt-1">
                  <Volume2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-900">{selectedVoice.name}</span>
                  <Badge variant="outline" className="capitalize">
                    {selectedVoice.gender}
                  </Badge>
                </div>
              </div>
            )}

            {config.secondaryLanguages.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Secondary Languages</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {config.secondaryLanguages.map((langCode) => {
                    const lang = getLanguageByCode(langCode);
                    return (
                      <Badge key={langCode} variant="secondary" className="flex items-center gap-1">
                        <span>{lang?.flag}</span>
                        <span>{lang?.name}</span>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${config.culturalAdaptation ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-gray-600">Cultural Adaptation</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${config.localExpressions ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-gray-600">Local Expressions</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Language Configuration</h3>
            <p className="text-gray-600 mb-4">
              Set up multi-language support and voice selection for your AI agent
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Configure Languages & Voice
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguageConfigPanel;
