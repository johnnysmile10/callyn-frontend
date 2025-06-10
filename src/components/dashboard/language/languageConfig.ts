
export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  elevenlabsVoices: {
    id: string;
    name: string;
    gender: 'male' | 'female';
    accent?: string;
  }[];
  defaultModel: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' },
      { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male' },
      { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', gender: 'female' }
    ],
    defaultModel: 'eleven_turbo_v2_5'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' },
      { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' },
      { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'da',
    name: 'Danish',
    nativeName: 'Dansk',
    flag: '🇩🇰',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk',
    flag: '🇳🇴',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    flag: '🇸🇪',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2',
    rtl: true
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    elevenlabsVoices: [
      { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
      { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' }
    ],
    defaultModel: 'eleven_multilingual_v2'
  }
];

export const getLanguageByCode = (code: string): SupportedLanguage | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
};

export const getDefaultVoiceForLanguage = (languageCode: string): string => {
  const language = getLanguageByCode(languageCode);
  return language?.elevenlabsVoices[0]?.id || '9BWtsMINqrJLrRacOk9x'; // Default to Aria
};

export const getVoicesForLanguage = (languageCode: string) => {
  const language = getLanguageByCode(languageCode);
  return language?.elevenlabsVoices || [];
};
