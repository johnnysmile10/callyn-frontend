
import { UserAgent, ProgressState } from '@/context/types/authTypes';

export interface UnlockCondition {
  type: 'agent' | 'leads' | 'voice' | 'campaigns' | 'config_level';
  requirement?: 'basic' | 'complete';
  description: string;
}

export const checkUnlockConditions = (
  conditions: UnlockCondition[],
  userAgent: UserAgent | null,
  progressState: ProgressState
): { isUnlocked: boolean; missingRequirements: string[] } => {
  const missingRequirements: string[] = [];

  for (const condition of conditions) {
    switch (condition.type) {
      case 'agent':
        if (!userAgent) {
          missingRequirements.push('Create your AI agent first');
        }
        break;
      case 'leads':
        // More lenient - if they have an agent, they can access campaign manager to import leads
        if (!userAgent) {
          missingRequirements.push('Create your AI agent first');
        }
        break;
      case 'voice':
        if (!progressState.hasVoiceIntegration && !userAgent) {
          missingRequirements.push('Configure voice settings');
        }
        break;
      case 'campaigns':
        // More lenient - allow access if they have basic agent setup
        if (!userAgent) {
          missingRequirements.push('Create your AI agent first');
        }
        break;
      case 'config_level':
        const requiredLevel = condition.requirement || 'basic';
        const currentLevel = progressState.agentConfigurationLevel;
        const levelHierarchy = ['none', 'basic', 'complete'];
        const currentIndex = levelHierarchy.indexOf(currentLevel);
        const requiredIndex = levelHierarchy.indexOf(requiredLevel);
        
        if (currentIndex < requiredIndex) {
          missingRequirements.push(condition.description);
        }
        break;
    }
  }

  return {
    isUnlocked: missingRequirements.length === 0,
    missingRequirements
  };
};
