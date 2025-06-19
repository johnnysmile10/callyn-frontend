
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
    userAgentId: userAgent?.id,
    userAgentStatus: userAgent?.status,
    progressState,
    timestamp: new Date().toISOString()
  });

  // If no conditions, always unlocked
  if (!conditions || conditions.length === 0) {
    console.log("No unlock conditions - always unlocked");
    return { isUnlocked: true, missingRequirements: [] };
  }

  for (const condition of conditions) {
    switch (condition.type) {
      case 'agent':
        // Check if user agent exists with valid ID
        if (!userAgent || !userAgent.id) {
          console.log("Agent condition failed: No user agent found or missing ID", {
            hasUserAgent: !!userAgent,
            agentId: userAgent?.id
          });
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("Agent condition passed: User agent exists with ID", {
            agentId: userAgent.id,
            agentStatus: userAgent.status
          });
        }
        break;
      case 'leads':
        // More lenient - if they have an agent, they can access campaign manager to import leads
        if (!userAgent || !userAgent.id) {
          console.log("Leads condition failed: No user agent found");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("Leads condition passed: User agent exists for lead management");
        }
        break;
      case 'voice':
        if (!progressState.hasVoiceIntegration && (!userAgent || !userAgent.id)) {
          console.log("Voice condition failed: No voice integration and no agent");
          missingRequirements.push('Configure voice settings');
        } else {
          console.log("Voice condition passed");
        }
        break;
      case 'campaigns':
        // More lenient - allow access if they have basic agent setup
        if (!userAgent || !userAgent.id) {
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
          requiredIndex,
          hasUserAgent: !!userAgent
        });
        
        // If we have a user agent, upgrade to at least basic level
        if (userAgent && userAgent.id && currentIndex < 1) {
          console.log("Upgrading config level to basic due to agent existence");
          // Don't fail the condition if agent exists
        } else if (currentIndex < requiredIndex) {
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
