
export interface GatewayMenuOption {
  id: string;
  prompt: string;
  action: GatewayAction;
  keyPress?: string;
  waitTime?: number;
  instructions?: string;
  createdAt: Date;
}

export interface GatewayAction {
  type: 'press_key' | 'wait' | 'speak' | 'transfer' | 'hangup';
  value?: string;
  duration?: number;
}

export interface GatewaySetupData {
  id: string;
  name: string;
  description?: string;
  menuOptions: GatewayMenuOption[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const GATEWAY_ACTION_TYPES = [
  { value: 'press_key', label: 'Press Key', description: 'Press a specific key (0-9, *, #)' },
  { value: 'wait', label: 'Wait', description: 'Wait for a specified duration' },
  { value: 'speak', label: 'Speak', description: 'Say something to the system' },
  { value: 'transfer', label: 'Transfer', description: 'Transfer to human agent' },
  { value: 'hangup', label: 'Hang Up', description: 'End the call' },
] as const;
