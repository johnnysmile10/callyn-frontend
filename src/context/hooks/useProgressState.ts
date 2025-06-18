
import { useState, useCallback, useEffect } from 'react';
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

  // Smart detection function to check if conditions should be met
  const detectProgressFromData = useCallback((userAgent: any, onboardingData: any, outreachData: any) => {
    const updates: Partial<ProgressState> = {};
    
    // Check if voice should be marked as configured
    if (onboardingData?.selectedVoice || onboardingData?.languageConfig) {
      updates.hasVoiceIntegration = true;
    }
    
    // Check if leads should be marked as imported (mock data counts as having leads)
    if (outreachData?.leadList?.length > 0) {
      updates.hasLeads = true;
    }
    
    // Check if campaigns should be marked as created
    if (outreachData && (outreachData.targetAudience || outreachData.script || outreachData.scheduling)) {
      updates.hasCampaigns = true;
    }
    
    // Apply updates if any were detected
    if (Object.keys(updates).length > 0) {
      updateProgressState(updates);
    }
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
