
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
        // More robust agent check - check for both existence and valid ID
        const hasValidAgent = userAgent && 
                            userAgent.id && 
                            userAgent.id.trim() !== '' && 
                            userAgent.status !== 'inactive';
        
        if (!hasValidAgent) {
          console.log("Agent condition failed: No valid user agent found", {
            hasUserAgent: !!userAgent,
            agentId: userAgent?.id,
            agentStatus: userAgent?.status
          });
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("Agent condition passed: Valid user agent exists", {
            agentId: userAgent.id,
            agentStatus: userAgent.status
          });
        }
        break;
        
      case 'leads':
        // Check for leads - allow access if agent exists for now
        const hasValidAgentForLeads = userAgent && userAgent.id && userAgent.id.trim() !== '';
        if (!hasValidAgentForLeads) {
          console.log("Leads condition failed: No user agent found");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("Leads condition passed: User agent exists for lead management");
        }
        break;
        
      case 'voice':
        const hasValidAgentForVoice = userAgent && userAgent.id && userAgent.id.trim() !== '';
        if (!progressState.hasVoiceIntegration && !hasValidAgentForVoice) {
          console.log("Voice condition failed: No voice integration and no agent");
          missingRequirements.push('Complete agent setup first');
        } else {
          console.log("Voice condition passed");
        }
        break;
        
      case 'campaigns':
        // Allow access if they have basic agent setup
        const hasValidAgentForCampaigns = userAgent && userAgent.id && userAgent.id.trim() !== '';
        if (!hasValidAgentForCampaigns) {
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
          hasUserAgent: !!userAgent,
          agentId: userAgent?.id
        });
        
        // If we have a valid user agent, upgrade to at least basic level
        const hasValidAgentForConfig = userAgent && userAgent.id && userAgent.id.trim() !== '';
        if (hasValidAgentForConfig && currentIndex < 1) {
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
