
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Volume2, Globe } from "lucide-react";
import { getLanguageByCode, getVoicesForLanguage } from "./languageConfig";

interface LanguagePreviewSystemProps {
  selectedLanguage: string;
  selectedVoice?: string;
  onLanguageChange?: (language: string) => void;
  onVoiceChange?: (voiceId: string) => void;
}

const LanguagePreviewSystem = ({ 
  selectedLanguage, 
  selectedVoice,
  onLanguageChange,
  onVoiceChange 
}: LanguagePreviewSystemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const language = getLanguageByCode(selectedLanguage);
  const voices = getVoicesForLanguage(selectedLanguage);
  const currentVoice = selectedVoice ? voices.find(v => v.id === selectedVoice) : voices[0];

  const handlePlayPreview = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const getPreviewText = (langCode: string) => {
    const previews: Record<string, string> = {
      'en': "Hello! I'm calling from {company} to discuss how we can help your business grow.",
      'es': "¡Hola! Llamo de {company} para hablar sobre cómo podemos ayudar a que su negocio crezca.",
      'fr': "Bonjour ! J'appelle de {company} pour discuter de la façon dont nous pouvons aider votre entreprise à croître.",
      'de': "Hallo! Ich rufe von {company} an, um zu besprechen, wie wir Ihrem Unternehmen beim Wachstum helfen können.",
      'it': "Ciao! Chiamo da {company} per discutere di come possiamo aiutare la tua azienda a crescere.",
      'pt': "Olá! Estou ligando da {company} para discutir como podemos ajudar o seu negócio a crescer.",
      'nl': "Hallo! Ik bel van {company} om te bespreken hoe we uw bedrijf kunnen helpen groeien.",
      'pl': "Cześć! Dzwonię z {company}, aby omówić, jak możemy pomóc Twojej firmie się rozwijać.",
      'hi': "नमस्ते! मैं {company} से कॉल कर रहा हूँ यह चर्चा करने के लिए कि हम आपके व्यवसाय को बढ़ने में कैसे मदद कर सकते हैं।",
      'zh': "您好！我是{company}的，想和您谈谈我们如何帮助您的企业发展。",
      'ja': "こんにちは！{company}からお電話しております。御社のビジネス成長をどのようにサポートできるかお話しさせていただきたく。",
      'ko': "안녕하세요! {company}에서 연락드렸습니다. 귀하의 비즈니스 성장을 어떻게 도울 수 있는지 논의하고 싶습니다.",
      'ar': "مرحبا! أتصل من {company} لمناقشة كيف يمكننا مساعدة عملك على النمو.",
      'tr': "Merhaba! {company}'den arıyorum, işinizin büyümesine nasıl yardımcı olabileceğimizi konuşmak için.",
      'ru': "Привет! Звоню из {company}, чтобы обсудить, как мы можем помочь вашему бизнесу расти."
    };
    return previews[langCode] || previews['en'];
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-900">Language Preview</span>
          <Badge variant="outline" className="ml-auto">
            {language?.flag} {language?.name}
          </Badge>
        </div>
        
        <div className="bg-white rounded-lg p-3 mb-3">
          <p className="text-sm text-gray-700 italic" dir={language?.rtl ? 'rtl' : 'ltr'}>
            "{getPreviewText(selectedLanguage)}"
          </p>
        </div>

        {currentVoice && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">{currentVoice.name}</span>
              <Badge variant="outline" className="text-xs capitalize">
                {currentVoice.gender}
              </Badge>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handlePlayPreview}
              disabled={isPlaying}
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              <Play className={`mr-1 h-3 w-3 ${isPlaying ? 'animate-pulse' : ''}`} />
              {isPlaying ? 'Playing...' : 'Preview'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguagePreviewSystem;
