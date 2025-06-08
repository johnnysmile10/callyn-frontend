
export interface LeadRecord {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  status: 'new' | 'contacted' | 'interested' | 'not-interested' | 'callback' | 'booked';
  source: 'manual' | 'csv' | 'integration';
  tags: string[];
  notes?: string;
  lastContact?: string;
  nextFollowUp?: string;
  createdAt: string;
  customFields?: Record<string, any>;
}

export interface TargetAudience {
  industry: string[];
  companySize: string[];
  jobTitles: string[];
  location: string[];
  customCriteria?: string;
}

export interface OutreachScript {
  greeting: string;
  valueProposition: string;
  objectionHandling: Record<string, string>;
  closingStatement: string;
  followUpMessages: string[];
}

export interface CallScheduling {
  timezone: string;
  availableHours: {
    start: string;
    end: string;
  };
  availableDays: string[];
  bufferTime: number; // minutes between calls
  maxCallsPerDay: number;
}

export interface OutreachData {
  targetAudience?: TargetAudience;
  leadList?: LeadRecord[];
  script?: OutreachScript;
  scheduling?: CallScheduling;
  testResults?: {
    callCount: number;
    successRate: number;
    feedback: string[];
  };
  campaignSettings?: {
    name: string;
    dailyCallLimit: number;
    autoStart: boolean;
    followUpEnabled: boolean;
  };
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetAudience: TargetAudience;
  script: OutreachScript;
  scheduling: CallScheduling;
  leads: LeadRecord[];
  stats: {
    totalCalls: number;
    contactRate: number;
    bookingRate: number;
    totalCost: number;
  };
  createdAt: string;
  launchedAt?: string;
}
