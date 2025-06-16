
export interface TargetAudience {
  industry: string[];
  companySize: string[];
  jobTitles: string[];
  location: string[];
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  status: 'new' | 'called' | 'interested' | 'not_interested';
}

export interface ScriptConfig {
  greeting: string;
  mainPitch: string;
  objectionHandling: string[];
  closingStatement: string;
  language?: string;
  tone?: string;
  personality?: string;
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

export interface OutreachData {
  targetAudience?: TargetAudience;
  leadList?: LeadRecord[];
  script?: ScriptConfig;
  scheduling?: SchedulingConfig;
}
