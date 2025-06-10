
export interface TargetAudience {
  industry: string[];
  companySize: string[];
  jobTitles: string[];
  location: string[];
  customCriteria?: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone: string;
  status: 'new' | 'contacted' | 'interested' | 'not_interested';
  source?: string;
  tags?: string[];
  createdAt?: string;
}

export interface LanguageConfig {
  primaryLanguage: string;
  secondaryLanguages: string[];
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  formality: 'formal' | 'informal' | 'balanced';
  culturalAdaptation: boolean;
  localExpressions: boolean;
  voiceId?: string;
  model?: string;
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
