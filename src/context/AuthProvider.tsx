import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { User, OnboardingData, UserAgent, AuthContextType, ProgressState } from './types/authTypes';
import { OutreachData } from '@/components/dashboard/outreach/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useProgressState } from './hooks/useProgressState';
import { authService } from './services/authService';
import ApiService from './services/apiService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAgent, setUserAgent] = useState<UserAgent | null>(null)
  const [onboardingData, setOnboardingData] = useLocalStorage<OnboardingData>('onboarding_data');
  const [outreachData, setOutreachData] = useLocalStorage<OutreachData>('outreach_data');
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [campaignBuilderData, setCampaignBuilderData] = useState({});

  // Add local state to ensure immediate UI updates
  // const [localUserAgent, setLocalUserAgent] = useState<UserAgent | null>(userAgent);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    progressState,
    updateProgressState,
    markLeadsImported,
    markVoiceConfigured,
    markCampaignCreated,
    setAgentConfigurationLevel,
    detectProgressFromData
  } = useProgressState();

  // Update agent configuration level when user agent changes
  const updateAgentConfigLevel = useCallback((agent: UserAgent | null) => {
    if (agent && agent.id) {
      const hasBasicConfig = agent.configuration?.businessInfo?.name && agent.configuration?.voice;
      const hasLanguageConfig = onboardingData?.languageConfig?.primaryLanguage;
      const hasCompleteConfig = hasBasicConfig &&
        agent.configuration?.script &&
        agent.configuration?.personality &&
        hasLanguageConfig;

      if (hasCompleteConfig) {
        setAgentConfigurationLevel('complete');
      } else if (hasBasicConfig) {
        setAgentConfigurationLevel('basic');
      } else {
        setAgentConfigurationLevel('basic');
      }
    } else {
      setAgentConfigurationLevel('none');
    }
  }, [setAgentConfigurationLevel, onboardingData?.languageConfig]);

  // Update agent configuration level when userAgent changes
  useEffect(() => {
    if (isInitialized) {
      updateAgentConfigLevel(userAgent);
    }
  }, [isInitialized, userAgent, updateAgentConfigLevel]);

  // Run smart detection only when data changes and we're initialized
  useEffect(() => {
    if (isInitialized && (userAgent || onboardingData || outreachData)) {
      detectProgressFromData(userAgent, onboardingData, outreachData);
    }
  }, [isInitialized, userAgent, onboardingData, outreachData, detectProgressFromData]);

  const login = async (email: string, password: string): Promise<void> => {
    const loggedInUser = await authService.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  const loginByToken = async (token: string): Promise<void> => {
    ApiService.setToken(token)
    try {
      const data = await ApiService.get('/auth/me');
      setUser(data.user);
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  }

  const googleLogin = async () => {
    const loggedInUser = await authService.googleLogin();
    setUser(loggedInUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    await authService.signup(email, password, name);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setUserAgent(null);
    setOnboardingData(null);
    setOutreachData(null);
    setSetupCompleted(false);
    setIsInitialized(false);
    updateProgressState({
      hasLeads: false,
      hasVoiceIntegration: false,
      hasCampaigns: false,
      agentConfigurationLevel: 'none'
    });
  };

  const createUserAgent = async (data: OnboardingData): Promise<UserAgent> => {
    try {
      const newAgent = await authService.createUserAgent(data);

      setSetupCompleted(true);

      // Enhanced progress state update with language detection
      updateProgressState({
        hasVoiceIntegration: !!(data.selectedVoice || data.languageConfig?.voiceId),
        agentConfigurationLevel: data.languageConfig?.primaryLanguage ? 'complete' : 'basic'
      });

      return Promise.resolve(newAgent);
    } catch (error) {
      console.error("AuthProvider: Error creating user agent:", error);
      throw error;
    }
  };

  // Enhanced setUserAgent function that updates both storage and local state
  const setEnhancedUserAgent = (agent: UserAgent | null) => {
    setUserAgent(agent)

    if (agent) {
      // Enhanced progress state update
      const hasLanguageSupport = onboardingData?.languageConfig?.primaryLanguage;
      updateProgressState({
        hasVoiceIntegration: !!(agent.configuration?.voice || onboardingData?.selectedVoice),
        agentConfigurationLevel: hasLanguageSupport ? 'complete' : 'basic'
      });
    }
  };

  const hasCompletedSetup = (): boolean => {
    const currentAgent = userAgent;
    const completed = setupCompleted && !!currentAgent && !!currentAgent.id;
    return completed;
  };

  const markSetupCompleted = () => {
    setSetupCompleted(true);
  };

  const value = {
    user,
    onboardingData,
    userAgent,
    outreachData,
    setupCompleted,
    progressState,
    login,
    loginByToken,
    googleLogin,
    signup,
    logout,
    setOnboardingData,
    setUserAgent: setEnhancedUserAgent,
    setOutreachData,
    createUserAgent,
    hasCompletedSetup,
    markSetupCompleted,
    campaignBuilderData,
    setCampaignBuilderData,
    updateProgressState,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
