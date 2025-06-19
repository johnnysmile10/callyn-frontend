
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

  console.log("Checking unlock conditions:", {
    conditions,
    userAgent: !!userAgent,
    progressState,
    agentId: userAgent?.id
  });

  for (const condition of conditions) {
    switch (condition.type) {
      case 'agent':
        if (!userAgent) {
          console.log("Agent condition failed: No user agent found");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("Agent condition passed: User agent exists", userAgent.id);
        }
        break;
      case 'leads':
        // More lenient - if they have an agent, they can access campaign manager to import leads
        if (!userAgent) {
          console.log("Leads condition failed: No user agent found");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("Leads condition passed: User agent exists for lead management");
        }
        break;
      case 'voice':
        if (!progressState.hasVoiceIntegration && !userAgent) {
          console.log("Voice condition failed: No voice integration and no agent");
          missingRequirements.push('Configure voice settings');
        } else {
          console.log("Voice condition passed");
        }
        break;
      case 'campaigns':
        // More lenient - allow access if they have basic agent setup
        if (!userAgent) {
          console.log("Campaigns condition failed: No user agent found");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("Campaigns condition passed: User agent exists for campaigns");
        }
        break;
      case 'config_level':
        const requiredLevel = condition.requirement || 'basic';
        const currentLevel = progressState.agentConfigurationLevel;
        const levelHierarchy = ['none', 'basic', 'complete'];
        const currentIndex = levelHierarchy.indexOf(currentLevel);
        const requiredIndex = levelHierarchy.indexOf(requiredLevel);
        
        console.log("Config level check:", {
          requiredLevel,
          currentLevel,
          currentIndex,
          requiredIndex
        });
        
        if (currentIndex < requiredIndex) {
          console.log("Config level condition failed");
          missingRequirements.push(condition.description);
        } else {
          console.log("Config level condition passed");
        }
        break;
    }
  }

  const result = {
    isUnlocked: missingRequirements.length === 0,
    missingRequirements
  };

  console.log("Unlock conditions result:", result);
  return result;
};
