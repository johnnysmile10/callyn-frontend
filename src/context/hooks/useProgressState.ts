
import { useState, useCallback } from 'react';
import { ProgressState } from '../types/authTypes';
import { useLocalStorage } from './useLocalStorage';

export const useProgressState = () => {
  const [progressState, setProgressState] = useLocalStorage<ProgressState>('progress_state', {
    hasLeads: false,
    hasVoiceIntegration: false,
    hasCampaigns: false,
    agentConfigurationLevel: 'none'
  });

  const updateProgressState = useCallback((updates: Partial<ProgressState>) => {
    const currentState = progressState || {
      hasLeads: false,
      hasVoiceIntegration: false,
      hasCampaigns: false,
      agentConfigurationLevel: 'none' as const
    };
    setProgressState({ ...currentState, ...updates });
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
    updateProgressState({ agentConfigurationLevel: level });
  }, [updateProgressState]);

  return {
    progressState,
    updateProgressState,
    markLeadsImported,
    markVoiceConfigured,
    markCampaignCreated,
    setAgentConfigurationLevel
  };
};
