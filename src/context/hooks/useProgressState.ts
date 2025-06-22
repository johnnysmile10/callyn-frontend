
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

  const detectProgressFromData = useCallback((userAgent: any, onboardingData: any, outreachData: any) => {
    if (detectionRunRef.current) {
      return;
    }
    
    detectionRunRef.current = true;
    
    const updates: Partial<ProgressState> = {};
    
    // Enhanced voice detection - check for voice integration including language config
    if (onboardingData?.selectedVoice || 
        onboardingData?.languageConfig?.voiceId || 
        onboardingData?.languageConfig?.primaryLanguage) {
      updates.hasVoiceIntegration = true;
      console.log("Voice integration detected via enhanced language config");
    }
    
    // Check if leads should be marked as imported
    if (outreachData?.leadList?.length > 0) {
      updates.hasLeads = true;
    }
    
    // Check if campaigns should be marked as created
    if (outreachData && (outreachData.targetAudience || outreachData.script || outreachData.scheduling)) {
      updates.hasCampaigns = true;
    }
    
    // Enhanced agent configuration level detection
    if (userAgent && userAgent.id) {
      const hasBasicConfig = userAgent.configuration?.businessInfo?.name && 
                           (userAgent.configuration?.voice || onboardingData?.selectedVoice);
      
      const hasLanguageConfig = onboardingData?.languageConfig?.primaryLanguage;
      const hasCompleteConfig = hasBasicConfig && 
                              userAgent.configuration?.script && 
                              userAgent.configuration?.personality &&
                              hasLanguageConfig;
      
      if (hasCompleteConfig) {
        updates.agentConfigurationLevel = 'complete';
        console.log("Complete agent configuration detected (including language)");
      } else if (hasBasicConfig) {
        updates.agentConfigurationLevel = 'basic';
        console.log("Basic agent configuration detected");
      }
    }
    
    if (Object.keys(updates).length > 0) {
      console.log("Enhanced smart detection found updates:", updates);
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
