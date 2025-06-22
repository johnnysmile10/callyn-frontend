import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { User, OnboardingData, UserAgent, AuthContextType, ProgressState } from './types/authTypes';
import { OutreachData } from '@/components/dashboard/outreach/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useProgressState } from './hooks/useProgressState';
import { authService } from './services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User>('user');
  const [userAgent, setUserAgentStorage] = useLocalStorage<UserAgent>('user_agent');
  const [onboardingData, setOnboardingData] = useLocalStorage<OnboardingData>('onboarding_data');
  const [outreachData, setOutreachData] = useLocalStorage<OutreachData>('outreach_data');
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [campaignBuilderData, setCampaignBuilderData] = useLocalStorage('campaignBuilderData', {});

  // Add local state to ensure immediate UI updates
  const [localUserAgent, setLocalUserAgent] = useState<UserAgent | null>(userAgent);
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

  const isAuthenticated = !!user;

  // Initialize state only once
  useEffect(() => {
    if (!isInitialized) {
      console.log("AuthProvider: Initializing state");
      
      // Initialize setup completion status
      const storedSetupCompleted = localStorage.getItem('setup_completed');
      if (storedSetupCompleted === 'true') {
        setSetupCompleted(true);
      }

      // Initialize local user agent
      setLocalUserAgent(userAgent);
      setIsInitialized(true);
    }
  }, [isInitialized, userAgent]);

  // Update agent configuration level when user agent changes
  const updateAgentConfigLevel = useCallback((agent: UserAgent | null) => {
    if (agent && agent.id) {
      console.log("AuthProvider: User agent detected, updating configuration level with language support", agent);
      
      const hasBasicConfig = agent.configuration?.businessInfo?.name && agent.configuration?.voice;
      const hasLanguageConfig = onboardingData?.languageConfig?.primaryLanguage;
      const hasCompleteConfig = hasBasicConfig && 
                              agent.configuration?.script && 
                              agent.configuration?.personality &&
                              hasLanguageConfig;
      
      if (hasCompleteConfig) {
        console.log("Setting complete configuration level (including language support)");
        setAgentConfigurationLevel('complete');
      } else if (hasBasicConfig) {
        setAgentConfigurationLevel('basic');
      } else {
        setAgentConfigurationLevel('basic');
      }
    } else {
      console.log("AuthProvider: No user agent found, setting configuration level to none");
      setAgentConfigurationLevel('none');
    }
  }, [setAgentConfigurationLevel, onboardingData?.languageConfig]);

  // Update agent configuration level when userAgent changes
  useEffect(() => {
    if (isInitialized) {
      updateAgentConfigLevel(localUserAgent || userAgent);
    }
  }, [isInitialized, localUserAgent, userAgent, updateAgentConfigLevel]);

  // Run smart detection only when data changes and we're initialized
  useEffect(() => {
    if (isInitialized && (localUserAgent || userAgent || onboardingData || outreachData)) {
      detectProgressFromData(localUserAgent || userAgent, onboardingData, outreachData);
    }
  }, [isInitialized, localUserAgent, userAgent, onboardingData, outreachData, detectProgressFromData]);

  // Sync local state with storage state
  useEffect(() => {
    if (isInitialized && userAgent !== localUserAgent) {
      console.log("AuthProvider: Syncing user agent state", { stored: !!userAgent, local: !!localUserAgent });
      setLocalUserAgent(userAgent);
    }
  }, [isInitialized, userAgent, localUserAgent]);

  const login = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
  };

  const googleLogin = async () => {
    const loggedInUser = await authService.googleLogin();
    setUser(loggedInUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    const newUser = await authService.signup(email, password, name);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setUserAgentStorage(null);
    setLocalUserAgent(null);
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
    console.log("AuthProvider: Creating user agent with enhanced language data:", data);
    
    try {
      const newAgent = await authService.createUserAgent(data);
      console.log("AuthProvider: Successfully created agent with language support:", newAgent);
      
      setUserAgentStorage(newAgent);
      setLocalUserAgent(newAgent);
      setSetupCompleted(true);
      
      // Enhanced progress state update with language detection
      updateProgressState({
        hasVoiceIntegration: !!(data.selectedVoice || data.languageConfig?.voiceId),
        agentConfigurationLevel: data.languageConfig?.primaryLanguage ? 'complete' : 'basic'
      });
      
      console.log("Language configuration preserved:", data.languageConfig);
      
      return newAgent;
    } catch (error) {
      console.error("AuthProvider: Error creating user agent:", error);
      throw error;
    }
  };

  // Enhanced setUserAgent function that updates both storage and local state
  const setUserAgent = (agent: UserAgent | null) => {
    console.log("AuthProvider: Setting user agent with language awareness:", agent);
    setUserAgentStorage(agent);
    setLocalUserAgent(agent);
    
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
    const currentAgent = localUserAgent || userAgent;
    const completed = setupCompleted && !!currentAgent && !!currentAgent.id;
    console.log("AuthProvider: hasCompletedSetup check:", { 
      setupCompleted, 
      userAgent: !!currentAgent, 
      agentId: currentAgent?.id,
      result: completed 
    });
    return completed;
  };

  const markSetupCompleted = () => {
    console.log("AuthProvider: Marking setup as completed");
    setSetupCompleted(true);
    localStorage.setItem('setup_completed', 'true');
  };

  const value = {
    user,
    onboardingData,
    userAgent: localUserAgent, // Use local state for immediate updates
    outreachData,
    setupCompleted,
    progressState,
    isAuthenticated,
    login,
    googleLogin,
    signup,
    logout,
    setOnboardingData,
    setUserAgent,
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
