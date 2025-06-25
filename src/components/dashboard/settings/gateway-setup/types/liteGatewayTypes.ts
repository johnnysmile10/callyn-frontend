
export interface LiteGatewayMenuOption {
  id: string;
  prompt: string;
  action: LiteGatewayAction;
  createdAt: Date;
}

export interface LiteGatewayAction {
  type: 'press_key' | 'wait' | 'speak' | 'transfer';
  value: string;
  duration?: number; // for wait actions
}

export interface LiteGatewaySetup {
  id: string;
  name: string;
  description?: string;
  menuOptions: LiteGatewayMenuOption[];
  contactType: 'business' | 'personal';
  alwaysTryZero: boolean;
  fallbackToOperator: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const LITE_ACTION_TYPES = [
  { value: 'press_key', label: 'Press Key', description: 'Press a number key (0-9)' },
  { value: 'wait', label: 'Wait', description: 'Wait for specified seconds' },
  { value: 'speak', label: 'Speak', description: 'Say something' },
  { value: 'transfer', label: 'Transfer', description: 'Transfer to operator' },
] as const;

export const CONTACT_TYPES = [
  { value: 'business', label: 'Business Calls', description: 'Professional business interactions' },
  { value: 'personal', label: 'Personal Calls', description: 'Personal or casual conversations' },
] as const;
