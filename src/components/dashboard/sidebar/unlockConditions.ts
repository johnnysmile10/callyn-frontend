
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

  console.log("🔍 Checking unlock conditions:", {
    conditions: conditions.map(c => c.type),
    hasUserAgent: !!userAgent,
    userAgentId: userAgent?.id,
    userAgentStatus: userAgent?.status,
    progressState,
    timestamp: new Date().toISOString()
  });

  // If no conditions, always unlocked
  if (!conditions || conditions.length === 0) {
    console.log("✅ No unlock conditions - always unlocked");
    return { isUnlocked: true, missingRequirements: [] };
  }

  // Helper function to check if agent is valid and active
  const hasValidAgent = () => {
    const isValid = userAgent && 
                   userAgent.id && 
                   userAgent.id.trim() !== '' && 
                   userAgent.status !== 'inactive';
    
    console.log("🤖 Agent validation:", {
      hasUserAgent: !!userAgent,
      hasId: userAgent?.id && userAgent.id.trim() !== '',
      status: userAgent?.status,
      isValid
    });
    
    return isValid;
  };

  for (const condition of conditions) {
    console.log(`🔧 Checking condition: ${condition.type}`);
    
    switch (condition.type) {
      case 'agent':
        if (!hasValidAgent()) {
          console.log("❌ Agent condition failed");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("✅ Agent condition passed");
        }
        break;
        
      case 'leads':
        if (!hasValidAgent()) {
          console.log("❌ Leads condition failed: No agent");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("✅ Leads condition passed");
        }
        break;
        
      case 'voice':
        if (!hasValidAgent()) {
          console.log("❌ Voice condition failed: No agent");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("✅ Voice condition passed");
        }
        break;
        
      case 'campaigns':
        if (!hasValidAgent()) {
          console.log("❌ Campaigns condition failed: No agent");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("✅ Campaigns condition passed");
        }
        break;
        
      case 'config_level':
        const requiredLevel = condition.requirement || 'basic';
        const currentLevel = progressState.agentConfigurationLevel;
        const levelHierarchy = ['none', 'basic', 'complete'];
        const currentIndex = levelHierarchy.indexOf(currentLevel);
        const requiredIndex = levelHierarchy.indexOf(requiredLevel);
        
        console.log("🎚️ Config level check:", {
          requiredLevel,
          currentLevel,
          currentIndex,
          requiredIndex,
          hasAgent: hasValidAgent()
        });
        
        // If we have a valid agent, consider config level at least basic
        if (hasValidAgent() && currentIndex < 1) {
          console.log("⬆️ Upgrading config level to basic due to agent existence");
          // Don't fail the condition if agent exists
        } else if (currentIndex < requiredIndex && !hasValidAgent()) {
          console.log("❌ Config level condition failed");
          missingRequirements.push(condition.description);
        } else {
          console.log("✅ Config level condition passed");
        }
        break;
        
      default:
        console.log(`⚠️ Unknown condition type: ${condition.type}`);
    }
  }

  const result = {
    isUnlocked: missingRequirements.length === 0,
    missingRequirements
  };

  console.log("🎯 Final unlock result:", result);
  return result;
};
