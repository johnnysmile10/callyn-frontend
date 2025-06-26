
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

  console.log("🔍 Enhanced unlock conditions check:", {
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

  // Enhanced helper function to check if agent is valid and active
  const hasValidAgent = (): boolean => {
    // More lenient validation - check multiple sources
    const hasAgent = !!userAgent;
    const hasId = userAgent?.id && userAgent.id.trim() !== '';
    const hasValidStatus = !userAgent?.status || 
                          userAgent.status === 'active' || 
                          userAgent.status === 'inactive' ||
                          userAgent.status === 'training';
    
    // Also check localStorage as fallback
    const storedAgent = localStorage.getItem('user_agent');
    const hasStoredAgent = storedAgent && storedAgent !== 'null';
    
    // Check setup completion as additional validation
    const setupComplete = localStorage.getItem('setup_completed') === 'true';
    
    const isValid = (hasAgent && hasId && hasValidStatus) || hasStoredAgent || setupComplete;
    
    console.log("🤖 Enhanced agent validation:", {
      hasAgent,
      hasId,
      hasValidStatus,
      hasStoredAgent,
      setupComplete,
      userAgentStatus: userAgent?.status,
      finalResult: isValid
    });
    
    return isValid;
  };

  // Check if we have any indication of agent existence
  const hasAnyAgentIndication = (): boolean => {
    const configLevel = progressState.agentConfigurationLevel;
    const hasConfigLevel = configLevel !== 'none';
    const hasValidAgentResult = hasValidAgent();
    
    console.log("🔎 Agent indication check:", {
      hasValidAgent: hasValidAgentResult,
      configLevel,
      hasConfigLevel,
      result: hasValidAgentResult || hasConfigLevel
    });
    
    return hasValidAgentResult || hasConfigLevel;
  };

  for (const condition of conditions) {
    console.log(`🔧 Checking condition: ${condition.type}`);
    
    switch (condition.type) {
      case 'agent':
        if (!hasAnyAgentIndication()) {
          console.log("❌ Agent condition failed - no agent indication");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("✅ Agent condition passed");
        }
        break;
        
      case 'leads':
        if (!hasAnyAgentIndication()) {
          console.log("❌ Leads condition failed: No agent");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("✅ Leads condition passed");
        }
        break;
        
      case 'voice':
        if (!hasAnyAgentIndication()) {
          console.log("❌ Voice condition failed: No agent");
          missingRequirements.push('Create your AI agent first');
        } else {
          console.log("✅ Voice condition passed");
        }
        break;
        
      case 'campaigns':
        if (!hasAnyAgentIndication()) {
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
          hasAgent: hasAnyAgentIndication()
        });
        
        // More lenient config level checking
        if (hasAnyAgentIndication() && currentIndex < 1) {
          console.log("⬆️ Auto-upgrading config level due to agent existence");
          // Don't fail if agent exists
        } else if (currentIndex < requiredIndex && !hasAnyAgentIndication()) {
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

  console.log("🎯 Enhanced unlock result:", result);
  return result;
};

// Helper function to force unlock all features (for debugging)
export const forceUnlockAll = (): { isUnlocked: boolean; missingRequirements: string[] } => {
  console.log("🚨 FORCE UNLOCK ACTIVATED - All features unlocked");
  return { isUnlocked: true, missingRequirements: [] };
};

// Helper function to check if user should have access to features
export const shouldHaveAccess = (userAgent: UserAgent | null, progressState: ProgressState): boolean => {
  const hasAgent = !!userAgent;
  const hasStoredAgent = localStorage.getItem('user_agent') && localStorage.getItem('user_agent') !== 'null';
  const setupComplete = localStorage.getItem('setup_completed') === 'true';
  const hasBasicConfig = progressState.agentConfigurationLevel !== 'none';
  
  return hasAgent || hasStoredAgent || setupComplete || hasBasicConfig;
};

// Enhanced recovery function to fix state inconsistencies
export const recoverUserState = (updateProgressState?: (updates: Partial<ProgressState>) => void) => {
  console.log("🔄 Starting enhanced state recovery process");
  
  const storedAgent = localStorage.getItem('user_agent');
  const setupComplete = localStorage.getItem('setup_completed') === 'true';
  
  if ((storedAgent && storedAgent !== 'null') || setupComplete) {
    console.log("🎯 Found stored agent or setup completion, updating progress state");
    
    if (updateProgressState) {
      updateProgressState({
        agentConfigurationLevel: 'basic',
        hasVoiceIntegration: true,
        hasCampaigns: false,
        hasLeads: false
      });
    }
    
    return true;
  }
  
  console.log("❌ No recoverable state found");
  return false;
};

// Function to diagnose unlock issues
export const diagnoseUnlockIssues = (userAgent: UserAgent | null, progressState: ProgressState) => {
  console.log("🔍 DIAGNOSTIC REPORT:");
  console.log("===================");
  
  const hasAgent = !!userAgent;
  const storedAgent = localStorage.getItem('user_agent');
  const setupComplete = localStorage.getItem('setup_completed');
  const shouldUnlock = shouldHaveAccess(userAgent, progressState);
  
  console.log("User Agent:", userAgent);
  console.log("Has Agent:", hasAgent);
  console.log("Stored Agent:", storedAgent);
  console.log("Setup Complete:", setupComplete);
  console.log("Progress State:", progressState);
  console.log("Should Unlock:", shouldUnlock);
  
  const issues = [];
  
  if (!hasAgent && (!storedAgent || storedAgent === 'null')) {
    issues.push("No agent found in memory or localStorage");
  }
  
  if (progressState.agentConfigurationLevel === 'none' && !hasAgent) {
    issues.push("Configuration level is 'none' and no agent exists");
  }
  
  if (setupComplete !== 'true' && !hasAgent) {
    issues.push("Setup not marked as complete and no agent exists");
  }
  
  console.log("Issues found:", issues);
  console.log("===================");
  
  return {
    hasAgent,
    storedAgent: !!storedAgent,
    setupComplete: setupComplete === 'true',
    shouldUnlock,
    issues
  };
};
