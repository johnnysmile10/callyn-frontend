
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import ExpandedVoiceLibrary from "./ExpandedVoiceLibrary";
import EnhancedLanguageSelector from "../language/EnhancedLanguageSelector";
import { LanguageConfig } from "../outreach/types";

interface StepProps {
  onNext: () => void;
  onPrev?: () => void;
  data: any;
  updateData: (field: string, value: any) => void;
}

export const BusinessSetupStep = ({ onNext, data, updateData }: StepProps) => {
  const canProceed = data.businessName && data.industry;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Tell us about your business</h3>
        <p className="text-gray-600">This helps us personalize your AI agent</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="business-name">Business Name</Label>
          <Input
            id="business-name"
            placeholder="Enter your business name"
            value={data.businessName || ''}
            onChange={(e) => updateData('businessName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            placeholder="e.g., Technology, Healthcare, Real Estate"
            value={data.industry || ''}
            onChange={(e) => updateData('industry', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const LanguageSelectionStep = ({ onNext, onPrev, data, updateData }: StepProps) => {
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>(
    data.languageConfig || {
      primaryLanguage: "en",
      secondaryLanguages: [],
      voiceId: "9BWtsMINqrJLrRacOk9x",
      model: "eleven_multilingual_v2",
      tone: "professional",
      formality: "balanced",
      culturalAdaptation: false,
      localExpressions: false
    }
  );

  const handleLanguageConfigChange = (config: LanguageConfig) => {
    setLanguageConfig(config);
    updateData('languageConfig', config);
  };

  const canProceed = languageConfig.primaryLanguage;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose your language settings</h3>
        <p className="text-gray-600">Select the primary language for your AI agent and any additional languages</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <EnhancedLanguageSelector
          config={languageConfig}
          onConfigChange={handleLanguageConfigChange}
          showVoiceSelection={false}
        />
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const VoiceSelectionStep = ({ onNext, onPrev, data, updateData }: StepProps) => {
  const canProceed = data.selectedVoice;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose your AI voice</h3>
        <p className="text-gray-600">Select a voice that matches your brand and chosen language</p>
      </div>

      <ExpandedVoiceLibrary
        selectedVoice={data.selectedVoice || ''}
        onVoiceSelect={(voiceId) => updateData('selectedVoice', voiceId)}
        showTestingFeatures={true}
      />

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const ScriptCreationStep = ({ onNext, onPrev, data, updateData }: StepProps) => {
  const canProceed = data.script && data.script.length > 50;

  const generateScript = () => {
    const primaryLang = data.languageConfig?.primaryLanguage || 'en';
    const greetingMap: Record<string, string> = {
      'en': 'Hello! This is [Agent Name] calling from',
      'no': 'Hei! Dette er [Agent Name] som ringer fra',
      'sv': 'Hej! Det här är [Agent Name] som ringer från',
      'da': 'Hej! Det her er [Agent Name] der ringer fra',
      'de': 'Hallo! Hier ist [Agent Name] von',
      'fr': 'Bonjour! C\'est [Agent Name] qui appelle de',
      'es': 'Hola! Soy [Agent Name] llamando de',
      'it': 'Ciao! Sono [Agent Name] che chiama da'
    };

    const followupMap: Record<string, string> = {
      'en': 'I hope I\'m not catching you at a bad time. I\'m reaching out because we specialize in helping businesses in the',
      'no': 'Jeg håper jeg ikke ringer på et dårlig tidspunkt. Jeg tar kontakt fordi vi spesialiserer oss på å hjelpe bedrifter innen',
      'sv': 'Jag hoppas att jag inte ringer vid ett dåligt tillfälle. Jag kontaktar dig eftersom vi specialiserar oss på att hjälpa företag inom',
      'da': 'Jeg håber, jeg ikke ringer på et dårligt tidspunkt. Jeg kontakter dig, fordi vi specialiserer os i at hjælpe virksomheder inden for',
      'de': 'Ich hoffe, ich störe Sie nicht. Ich melde mich, weil wir uns darauf spezialisiert haben, Unternehmen in der',
      'fr': 'J\'espère que je ne vous dérange pas. Je vous contacte parce que nous nous spécialisons dans l\'aide aux entreprises du secteur',
      'es': 'Espero no llamar en mal momento. Me pongo en contacto porque nos especializamos en ayudar a empresas del sector',
      'it': 'Spero di non disturbare in un momento sbagliato. La contatto perché ci specializziamo nell\'aiutare aziende del settore'
    };

    const closingMap: Record<string, string> = {
      'en': 'Would you have just a few minutes to chat about how we might be able to help your business grow?',
      'no': 'Ville du ha noen minutter til å snakke om hvordan vi kan hjelpe bedriften din med å vokse?',
      'sv': 'Skulle du ha några minuter att prata om hur vi kan hjälpa ditt företag att växa?',
      'da': 'Ville du have et par minutter til at tale om, hvordan vi kan hjælpe din virksomhed med at vokse?',
      'de': 'Hätten Sie ein paar Minuten Zeit, um darüber zu sprechen, wie wir Ihrem Unternehmen beim Wachstum helfen können?',
      'fr': 'Auriez-vous quelques minutes pour discuter de la façon dont nous pourrions aider votre entreprise à se développer?',
      'es': '¿Tendría unos minutos para hablar sobre cómo podríamos ayudar a que su negocio crezca?',
      'it': 'Avrebbe qualche minuto per parlare di come potremmo aiutare la sua azienda a crescere?'
    };

    const greeting = greetingMap[primaryLang] || greetingMap['en'];
    const followup = followupMap[primaryLang] || followupMap['en'];
    const closing = closingMap[primaryLang] || closingMap['en'];

    const script = `${greeting} ${data.businessName || '[Company]'}.

${followup} ${data.industry || 'your'} industry.

${closing}`;
    
    updateData('script', script);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Create your call script</h3>
        <p className="text-gray-600">What should your AI agent say?</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <Button
            onClick={generateScript}
            variant="outline"
            className="flex items-center gap-2"
          >
            Generate Script from Business Info
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="script">Call Script</Label>
          <Textarea
            id="script"
            placeholder="Enter your call script here..."
            value={data.script || ''}
            onChange={(e) => updateData('script', e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
        </div>

        {data.languageConfig?.primaryLanguage && data.languageConfig.primaryLanguage !== 'en' && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Language:</strong> {data.languageConfig.primaryLanguage.toUpperCase()}
              {data.languageConfig.secondaryLanguages?.length > 0 && (
                <span> + {data.languageConfig.secondaryLanguages.length} additional languages</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-green-600 hover:bg-green-700"
        >
          Complete Setup
          <CheckCircle className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
