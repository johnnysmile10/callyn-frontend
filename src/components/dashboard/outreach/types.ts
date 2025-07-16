export interface TargetAudience {
  description: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email?: string;
  number: string;
  company?: string;
  title?: string;
  status: 'new' | 'called' | 'interested' | 'not_interested';
  source?: 'manual' | 'csv' | 'import';
  tags?: string[];
  createdAt?: string;
}

export interface LanguageConfig {
  primaryLanguage: string;
  secondaryLanguages: string[];
  voiceId?: string;
  model?: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'authoritative';
  formality?: 'formal' | 'informal' | 'balanced';
  culturalAdaptation?: boolean;
  localExpressions?: boolean;
}

export interface ScriptConfig {
  greeting: string;
  mainPitch: string;
  objectionHandling: string[];
  closingStatement: string;
  language?: string;
  tone?: string;
  personality?: string;
  languageConfig?: LanguageConfig;
}

export interface SchedulingConfig {
  calendarIntegration?: {
    provider: string;
    connected: boolean;
    calendarId?: string;
    syncEnabled: boolean;
  };
  operatingHours: {
    monday: { enabled: boolean; start: string; end: string; };
    tuesday: { enabled: boolean; start: string; end: string; };
    wednesday: { enabled: boolean; start: string; end: string; };
    thursday: { enabled: boolean; start: string; end: string; };
    friday: { enabled: boolean; start: string; end: string; };
    saturday: { enabled: boolean; start: string; end: string; };
    sunday: { enabled: boolean; start: string; end: string; };
  };
  timezone: string;
  bufferTime: number;
  retryDelay: number;
  weekendCalling: boolean;
}

export interface CampaignData {
  isLive?: boolean;
  campaignStarted?: boolean;
  launchedAt?: string | null;
}

export interface LeadManagement {
  leadList?: LeadRecord[];
  importMethod?: string;
  leadSources: [];
}

export interface OutreachData {
  targetAudience?: TargetAudience;
  leadManagement?: LeadManagement;
  script?: ScriptConfig;
  callScheduling?: SchedulingConfig;
  campaign?: CampaignData;
}
