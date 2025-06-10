
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Globe, FileText, TestTube } from "lucide-react";
import { useState } from "react";
import { ScriptConfig, LanguageConfig } from "../types";
import EnhancedLanguageSelector from "../../language/EnhancedLanguageSelector";
import { getLanguageByCode } from "../../language/languageConfig";

interface Step3ScriptLanguageProps {
  data: ScriptConfig;
  onUpdate: (data: ScriptConfig) => void;
}

const Step3ScriptLanguage = ({ data, onUpdate }: Step3ScriptLanguageProps) => {
  const [activeTab, setActiveTab] = useState("script");

  const defaultLanguageConfig: LanguageConfig = {
    primaryLanguage: 'en',
    secondaryLanguages: [],
    tone: 'professional',
    formality: 'balanced',
    culturalAdaptation: true,
    localExpressions: false
  };

  const updateScript = (updates: Partial<ScriptConfig>) => {
    onUpdate({ ...data, ...updates });
  };

  const updateLanguageConfig = (languageConfig: LanguageConfig) => {
    updateScript({ languageConfig });
  };

  const generateSampleScript = () => {
    const currentLanguage = data.languageConfig?.primaryLanguage || 'en';
    const formality = data.languageConfig?.formality || 'balanced';
    const tone = data.languageConfig?.tone || 'professional';
    
    const language = getLanguageByCode(currentLanguage);
    
    let greeting = "Hello! This is [Your Name] from [Company]. How are you today?";
    let pitch = "I'm reaching out because I noticed your company could benefit from our solution that helps businesses increase their efficiency by 30%.";
    let closing = "Would you be interested in a brief 15-minute demo next week?";
    
    if (currentLanguage === 'es') {
      greeting = formality === 'formal' 
        ? "Buenos días. Mi nombre es [Su Nombre] de [Empresa]. ¿Cómo se encuentra usted hoy?"
        : "¡Hola! Soy [Su Nombre] de [Empresa]. ¿Cómo está?";
      pitch = "Me comunico con usted porque noté que su empresa podría beneficiarse de nuestra solución que ayuda a las empresas a aumentar su eficiencia en un 30%.";
      closing = "¿Le interesaría una demostración breve de 15 minutos la próxima semana?";
    } else if (currentLanguage === 'fr') {
      greeting = formality === 'formal'
        ? "Bonjour. Je suis [Votre Nom] de [Entreprise]. Comment allez-vous aujourd'hui?"
        : "Salut! Je suis [Votre Nom] de [Entreprise]. Comment ça va?";
      pitch = "Je vous contacte parce que j'ai remarqué que votre entreprise pourrait bénéficier de notre solution qui aide les entreprises à augmenter leur efficacité de 30%.";
      closing = "Seriez-vous intéressé par une démonstration de 15 minutes la semaine prochaine?";
    } else if (currentLanguage === 'de') {
      greeting = formality === 'formal'
        ? "Guten Tag. Ich bin [Ihr Name] von [Unternehmen]. Wie geht es Ihnen heute?"
        : "Hallo! Ich bin [Ihr Name] von [Unternehmen]. Wie geht's?";
      pitch = "Ich kontaktiere Sie, weil ich bemerkt habe, dass Ihr Unternehmen von unserer Lösung profitieren könnte, die Unternehmen dabei hilft, ihre Effizienz um 30% zu steigern.";
      closing = "Wären Sie an einer kurzen 15-minütigen Demo nächste Woche interessiert?";
    }

    // Adjust tone
    if (tone === 'casual') {
      greeting = greeting.replace(/Good|Buenos|Bonjour|Guten/, match => 
        currentLanguage === 'en' ? 'Hey' :
        currentLanguage === 'es' ? 'Hola' :
        currentLanguage === 'fr' ? 'Salut' : 
        'Hi'
      );
    }

    updateScript({
      greeting,
      mainPitch: pitch,
      objectionHandling: ["I understand your concern. Let me explain how this specifically helps your situation..."],
      closingStatement: closing
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-orange-600" />
          <CardTitle>Craft Your Outreach Script</CardTitle>
        </div>
        <CardDescription>
          Create compelling conversation flows with multi-language support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="script" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Script Editor
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Language & Voice
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="script" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Opening Greeting</Label>
                <Textarea
                  placeholder="Hello! This is [Your Name] from [Company]..."
                  value={data.greeting || ''}
                  onChange={(e) => updateScript({ greeting: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Main Pitch</Label>
                <Textarea
                  placeholder="I'm reaching out because..."
                  value={data.mainPitch || ''}
                  onChange={(e) => updateScript({ mainPitch: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Closing Statement</Label>
                <Textarea
                  placeholder="Would you be interested in learning more?"
                  value={data.closingStatement || ''}
                  onChange={(e) => updateScript({ closingStatement: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={generateSampleScript} variant="outline">
                  Generate Sample Script
                </Button>
                <Button variant="outline">
                  Import from Template
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-6">
            <EnhancedLanguageSelector
              config={data.languageConfig || defaultLanguageConfig}
              onConfigChange={updateLanguageConfig}
              showVoiceSelection={true}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">Script Preview</CardTitle>
                <CardDescription>
                  How your script will sound to prospects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.languageConfig && (
                  <div className="pb-4 border-b">
                    <Label className="text-sm font-medium text-blue-700">Language Configuration:</Label>
                    <div className="text-sm mt-1 space-y-1">
                      <p>Primary: {getLanguageByCode(data.languageConfig.primaryLanguage)?.name} {getLanguageByCode(data.languageConfig.primaryLanguage)?.flag}</p>
                      {data.languageConfig.secondaryLanguages.length > 0 && (
                        <p>Secondary: {data.languageConfig.secondaryLanguages.map(code => getLanguageByCode(code)?.name).join(", ")}</p>
                      )}
                      <p>Tone: {data.languageConfig.tone} • Formality: {data.languageConfig.formality}</p>
                      {data.languageConfig.voiceId && <p>Voice: {data.languageConfig.voiceId}</p>}
                    </div>
                  </div>
                )}

                {data.greeting && (
                  <div>
                    <Label className="text-sm font-medium text-green-700">Opening:</Label>
                    <p className="text-sm mt-1">{data.greeting}</p>
                  </div>
                )}
                
                {data.mainPitch && (
                  <div>
                    <Label className="text-sm font-medium text-blue-700">Main Pitch:</Label>
                    <p className="text-sm mt-1">{data.mainPitch}</p>
                  </div>
                )}
                
                {data.closingStatement && (
                  <div>
                    <Label className="text-sm font-medium text-purple-700">Closing:</Label>
                    <p className="text-sm mt-1">{data.closingStatement}</p>
                  </div>
                )}

                {(!data.greeting && !data.mainPitch) && (
                  <p className="text-muted-foreground text-center py-8">
                    No script content to preview. Start by configuring your language settings and adding your greeting and main pitch.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Step3ScriptLanguage;
