
export interface TargetAudience {
  industry: string[];
  companySize: string[];
  jobTitles: string[];
  location: string[];
}

export interface LeadRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'interested' | 'not_interested';
}

export interface LanguageConfig {
  primaryLanguage: string;
  secondaryLanguages: string[];
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  formality: 'formal' | 'informal' | 'balanced';
  culturalAdaptation: boolean;
  localExpressions: boolean;
}

export interface ScriptConfig {
  greeting: string;
  mainPitch: string;
  objectionHandling: string[];
  closingStatement: string;
  languageConfig?: LanguageConfig;
}

export interface OutreachData {
  targetAudience?: TargetAudience;
  leadList?: LeadRecord[];
  script?: ScriptConfig;
  scheduling?: {
    timezone: string;
    availability: string[];
  };
  testResults?: {
    callCount: number;
    successRate: number;
  };
}
