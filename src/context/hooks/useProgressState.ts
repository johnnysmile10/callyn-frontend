
import { useState, useCallback, useRef } from 'react';
import { ProgressState } from '../types/authTypes';
import { useLocalStorage } from './useLocalStorage';

export const useProgressState = () => {
  const [progressState, setProgressState] = useLocalStorage<ProgressState>('progress_state', {
    hasLeads: false,
    hasVoiceIntegration: false,
    hasCampaigns: false,
    agentConfigurationLevel: 'none'
  });

  // Use ref to track if we've already run detection to prevent loops
  const detectionRunRef = useRef(false);

  const updateProgressState = useCallback((updates: Partial<ProgressState>) => {
    const currentState = progressState || {
      hasLeads: false,
      hasVoiceIntegration: false,
      hasCampaigns: false,
      agentConfigurationLevel: 'none' as const
    };
    
    // Only update if there are actual changes
    const hasChanges = Object.entries(updates).some(([key, value]) => 
      currentState[key as keyof ProgressState] !== value
    );
    
    if (hasChanges) {
      console.log("Progress state updating:", { current: currentState, updates });
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

  // Smart detection function to check if conditions should be met
  const detectProgressFromData = useCallback((userAgent: any, onboardingData: any, outreachData: any) => {
    // Prevent multiple runs
    if (detectionRunRef.current) {
      return;
    }
    
    detectionRunRef.current = true;
    
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
      console.log("Smart detection found updates:", updates);
      updateProgressState(updates);
    }
    
    // Reset detection flag after a delay
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
