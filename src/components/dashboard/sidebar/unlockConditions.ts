
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
        if (!progressState.hasLeads) {
          missingRequirements.push('Import leads to your database');
        }
        break;
      case 'voice':
        if (!progressState.hasVoiceIntegration) {
          missingRequirements.push('Configure voice settings');
        }
        break;
      case 'campaigns':
        if (!progressState.hasCampaigns) {
          missingRequirements.push('Create your first campaign');
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
