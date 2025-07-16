
import { useState, useCallback, useRef } from 'react';
import { ProgressState } from '../types/authTypes';

export const useProgressState = () => {
  const [progressState, setProgressState] = useState<ProgressState>({
    hasLeads: false,
    hasVoiceIntegration: false,
    hasCampaigns: false,
    agentConfigurationLevel: 'none'
  });

  const detectionRunRef = useRef(false);

  const updateProgressState = useCallback((updates: Partial<ProgressState>) => {
    const currentState = progressState || {
      hasLeads: false,
      hasVoiceIntegration: false,
      hasCampaigns: false,
      agentConfigurationLevel: 'none' as const
    };

    const hasChanges = Object.entries(updates).some(([key, value]) =>
      currentState[key as keyof ProgressState] !== value
    );

    if (hasChanges) {
      setProgressState({ ...currentState, ...updates });
    }
  }, [progressState, setProgressState]);

  const markLeadsImported = useCallback(() => {
    updateProgressState({ hasLeads: true });
  }, [updateProgressState]);

  const markVoiceConfigured = useCallback(() => {
    updateProgressState({ hasVoiceIntegration: true });
  }, [updateProgressState]);

  const markCampaignCreated = useCallback(() => {
    updateProgressState({ hasCampaigns: true });
  }, [updateProgressState]);

  const setAgentConfigurationLevel = useCallback((level: 'none' | 'basic' | 'complete') => {
    if (progressState?.agentConfigurationLevel !== level) {
      updateProgressState({ agentConfigurationLevel: level });
    }
  }, [progressState?.agentConfigurationLevel, updateProgressState]);

  const detectProgressFromData = useCallback((userAgent: any, onboardingData: any, outreachData: any, campaignBuilderData?: any) => {
    if (detectionRunRef.current) {
      return;
    }

    detectionRunRef.current = true;

    const updates: Partial<ProgressState> = {};

    // Enhanced voice detection - check for voice integration including language config and campaign builder
    if (onboardingData?.selectedVoice ||
      onboardingData?.languageConfig?.voiceId ||
      onboardingData?.languageConfig?.primaryLanguage ||
      campaignBuilderData?.voiceSettings?.voiceId ||
      campaignBuilderData?.voiceSettings?.primaryLanguage) {
      updates.hasVoiceIntegration = true;
    }

    // Enhanced lead detection to check campaign builder leadManagement structure
    if (outreachData?.leadList?.length > 0 ||
      campaignBuilderData?.leadManagement?.leadList?.length > 0) {
      updates.hasLeads = true;
    }

    // Check if campaigns should be marked as created
    if ((outreachData && (outreachData.targetAudience || outreachData.script || outreachData.scheduling)) ||
      (campaignBuilderData && (campaignBuilderData.agentProfile || campaignBuilderData.targetAudience || campaignBuilderData.script))) {
      updates.hasCampaigns = true;
    }

    // Enhanced agent configuration level detection
    if (userAgent && userAgent.id) {
      const hasBasicConfig = userAgent.configuration?.businessInfo?.name &&
        (userAgent.configuration?.voice || onboardingData?.selectedVoice);

      const hasLanguageConfig = onboardingData?.languageConfig?.primaryLanguage ||
        campaignBuilderData?.voiceSettings?.primaryLanguage;
      const hasCompleteConfig = hasBasicConfig &&
        userAgent.configuration?.script &&
        userAgent.configuration?.personality &&
        hasLanguageConfig;

      if (hasCompleteConfig) {
        updates.agentConfigurationLevel = 'complete';
      } else if (hasBasicConfig) {
        updates.agentConfigurationLevel = 'basic';
      }
    }

    if (Object.keys(updates).length > 0) {
      updateProgressState(updates);
    }

    setTimeout(() => {
      detectionRunRef.current = false;
    }, 1000);
  }, [updateProgressState]);

  return {
    progressState,
    updateProgressState,
    markLeadsImported,
    markVoiceConfigured,
    markCampaignCreated,
    setAgentConfigurationLevel,
    detectProgressFromData
  };
};
