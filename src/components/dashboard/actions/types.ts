
export interface SMSAction {
  id: string;
  name: string;
  enabled: boolean;
  trigger: 'call_end' | 'qualified_lead' | 'appointment_scheduled' | 'custom';
  message: string;
  phoneField: string; // which field contains the phone number
}

export interface AppointmentAction {
  id: string;
  name: string;
  enabled: boolean;
  trigger: 'qualified_lead' | 'customer_request' | 'custom';
  calendarProvider: 'calendly' | 'google' | 'outlook' | 'custom';
  calendarUrl?: string;
  duration: number; // in minutes
  bufferTime: number; // in minutes
}

export interface TransferAction {
  id: string;
  name: string;
  enabled: boolean;
  trigger: 'escalation_needed' | 'specific_request' | 'custom';
  transferType: 'phone' | 'department' | 'agent';
  destination: string;
  conditions: string[];
}

export interface CustomAction {
  id: string;
  name: string;
  enabled: boolean;
  trigger: 'call_start' | 'call_end' | 'qualified_lead' | 'custom';
  type: 'webhook' | 'api' | 'zapier';
  url: string;
  method: 'GET' | 'POST' | 'PUT';
  headers?: Record<string, string>;
  payload?: string;
  authentication?: {
    type: 'none' | 'bearer' | 'api_key' | 'basic';
    token?: string;
    username?: string;
    password?: string;
  };
}

export interface ActionTrigger {
  id: string;
  name: string;
  description: string;
  type: 'post_call' | 'realtime' | 'custom';
}
