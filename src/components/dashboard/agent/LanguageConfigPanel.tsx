
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Edit, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LanguageSelector from "../language/LanguageSelector";
import { LanguageConfig } from "../outreach/types";

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

  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'zh': 'Chinese',
      'ja': 'Japanese',
      'ko': 'Korean',
      'ar': 'Arabic'
    };
    return languages[code] || code.toUpperCase();
  };

  const handleConfigSave = (newConfig: LanguageConfig) => {
    onConfigChange(newConfig);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <CardTitle>Language Configuration</CardTitle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {config ? <Edit className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {config ? 'Edit' : 'Configure'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Configure Language Settings</DialogTitle>
              </DialogHeader>
              <LanguageSelector
                config={currentConfig}
                onConfigChange={handleConfigSave}
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
                <p className="text-sm text-gray-900 mt-1">
                  {getLanguageName(config.primaryLanguage)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Communication Style</label>
                <p className="text-sm text-gray-900 mt-1 capitalize">
                  {config.tone} · {config.formality}
                </p>
              </div>
            </div>

            {config.secondaryLanguages.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Secondary Languages</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {config.secondaryLanguages.map((lang) => (
                    <Badge key={lang} variant="secondary">
                      {getLanguageName(lang)}
                    </Badge>
                  ))}
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
              Set up multi-language support for your AI agent
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Configure Languages
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguageConfigPanel;
