
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

  // If no conditions, always unlocked
  if (!conditions || conditions.length === 0) {
    return { isUnlocked: true, missingRequirements: [] };
  }

  // Enhanced helper function to check if agent is valid and active
  const hasValidAgent = (): boolean => {
    // More lenient validation - check multiple sources
    const hasAgent = !!userAgent;
    const hasId = userAgent?.id;
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

    return isValid;
  };

  // Check if we have any indication of agent existence
  const hasAnyAgentIndication = (): boolean => {
    const configLevel = progressState.agentConfigurationLevel;
    const hasConfigLevel = configLevel !== 'none';
    const hasValidAgentResult = hasValidAgent();

    return hasValidAgentResult || hasConfigLevel;
  };

  for (const condition of conditions) {

    switch (condition.type) {
      case 'agent':
        if (!hasAnyAgentIndication()) {
          missingRequirements.push('Create your AI agent first');
        } else {
        }
        break;

      case 'leads':
        if (!hasAnyAgentIndication()) {
          missingRequirements.push('Create your AI agent first');
        } else {
        }
        break;

      case 'voice':
        if (!hasAnyAgentIndication()) {
          missingRequirements.push('Create your AI agent first');
        } else {
        }
        break;

      case 'campaigns':
        if (!hasAnyAgentIndication()) {
          missingRequirements.push('Create your AI agent first');
        } else {
        }
        break;

      case 'config_level':
        const requiredLevel = condition.requirement || 'basic';
        const currentLevel = progressState.agentConfigurationLevel;
        const levelHierarchy = ['none', 'basic', 'complete'];
        const currentIndex = levelHierarchy.indexOf(currentLevel);
        const requiredIndex = levelHierarchy.indexOf(requiredLevel);

        // More lenient config level checking
        if (hasAnyAgentIndication() && currentIndex < 1) {
          // Don't fail if agent exists
        } else if (currentIndex < requiredIndex && !hasAnyAgentIndication()) {
          missingRequirements.push(condition.description);
        } else {
        }
        break;

      default:
    }
  }

  const result = {
    isUnlocked: missingRequirements.length === 0,
    missingRequirements
  };

  return result;
};

// Helper function to force unlock all features (for debugging)
export const forceUnlockAll = (): { isUnlocked: boolean; missingRequirements: string[] } => {
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

  const storedAgent = localStorage.getItem('user_agent');
  const setupComplete = localStorage.getItem('setup_completed') === 'true';

  if ((storedAgent && storedAgent !== 'null') || setupComplete) {

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

  return false;
};

// Function to diagnose unlock issues
export const diagnoseUnlockIssues = (userAgent: UserAgent | null, progressState: ProgressState) => {
  const hasAgent = !!userAgent;
  const storedAgent = localStorage.getItem('user_agent');
  const setupComplete = localStorage.getItem('setup_completed');
  const shouldUnlock = shouldHaveAccess(userAgent, progressState);

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

  return {
    hasAgent,
    storedAgent: !!storedAgent,
    setupComplete: setupComplete === 'true',
    shouldUnlock,
    issues
  };
};
