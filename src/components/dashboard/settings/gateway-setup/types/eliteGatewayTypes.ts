
import { GatewayAction, GatewayMenuOption } from './gatewayTypes';

export interface EliteGatewayMenuOption extends GatewayMenuOption {
  // Multi-language support
  languages?: LanguageMatch[];
  
  // Voice recognition patterns
  voiceTags?: VoiceTag[];
  
  // AI learning data
  learningData?: AILearningData;
  
  // Advanced timing
  advancedTiming?: AdvancedTiming;
  
  // Fallback strategies
  fallbackPlan?: FallbackStrategy[];
  
  // Confidence scoring
  confidenceThreshold?: number;
  
  // Success tracking
  successMetrics?: SuccessMetrics;
}

export interface LanguageMatch {
  language: string;
  prompt: string;
  confidence: number;
  dialect?: string;
}

export interface VoiceTag {
  tag: string;
  pattern: string;
  confidence: number;
  description?: string;
}

export interface AILearningData {
  successRate: number;
  lastUpdated: Date;
  adaptations: LearningAdaptation[];
  callPatterns: CallPattern[];
}

export interface LearningAdaptation {
  id: string;
  trigger: string;
  action: string;
  confidence: number;
  timestamp: Date;
}

export interface CallPattern {
  pattern: string;
  frequency: number;
  successRate: number;
  context?: string;
}

export interface AdvancedTiming {
  preActionDelay?: number;
  postActionDelay?: number;
  retryDelay?: number;
  maxRetries?: number;
  adaptiveDelay?: boolean;
}

export interface FallbackStrategy {
  id: string;
  condition: string;
  action: GatewayAction;
  priority: number;
  description?: string;
}

export interface SuccessMetrics {
  totalAttempts: number;
  successfulAttempts: number;
  averageTime: number;
  lastSuccess?: Date;
  commonFailures?: string[];
}

export interface EliteGatewaySetup {
  id: string;
  name: string;
  description?: string;
  menuOptions: EliteGatewayMenuOption[];
  globalSettings: EliteGlobalSettings;
  aiLearningEnabled: boolean;
  voiceDetectionEnabled: boolean;
  multiLanguageEnabled: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EliteGlobalSettings {
  defaultLanguage: string;
  fallbackToOperator: boolean;
  maxCallDuration: number;
  adaptiveLearning: boolean;
  voiceSensitivity: number;
  confidenceThreshold: number;
  enableRealTimeAdaptation: boolean;
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  mockPrompts: string[];
  expectedActions: GatewayAction[];
  language?: string;
  voiceCharacteristics?: string[];
}

export interface TestResult {
  scenarioId: string;
  success: boolean;
  executionTime: number;
  detectedPrompts: string[];
  executedActions: GatewayAction[];
  confidence: number;
  errors?: string[];
  timestamp: Date;
}

// Elite feature flags
export const ELITE_FEATURES = {
  AI_LEARNING: 'ai_learning',
  VOICE_DETECTION: 'voice_detection',
  MULTI_LANGUAGE: 'multi_language',
  REAL_TIME_ADAPTATION: 'real_time_adaptation',
  ADVANCED_TESTING: 'advanced_testing',
  FALLBACK_STRATEGIES: 'fallback_strategies'
} as const;

// Predefined test scenarios
export const DEFAULT_TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'basic_menu',
    name: 'Basic Menu Navigation',
    description: 'Test basic menu option selection',
    mockPrompts: ['Press 1 for sales, Press 2 for support'],
    expectedActions: [{ type: 'press_key', value: '1' }]
  },
  {
    id: 'operator_fallback',
    name: 'Operator Fallback',
    description: 'Test fallback to human operator',
    mockPrompts: ['Please hold while we connect you to an agent'],
    expectedActions: [{ type: 'press_key', value: '0' }]
  },
  {
    id: 'voice_prompt',
    name: 'Voice Response Required',
    description: 'Test voice response to menu prompts',
    mockPrompts: ['Please say your company name'],
    expectedActions: [{ type: 'speak', value: 'Acme Corporation' }]
  },
  {
    id: 'multilingual',
    name: 'Multi-language Menu',
    description: 'Test non-English menu navigation',
    mockPrompts: ['Para español, presione 2', 'For English, press 1'],
    expectedActions: [{ type: 'press_key', value: '1' }],
    language: 'es'
  }
];
