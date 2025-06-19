
import React, { createContext, useState, ReactNode, useEffect } from 'react';
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

  // Sync local state with storage state
  useEffect(() => {
    if (userAgent !== localUserAgent) {
      console.log("AuthProvider: Syncing user agent state", { stored: !!userAgent, local: !!localUserAgent });
      setLocalUserAgent(userAgent);
    }
  }, [userAgent, localUserAgent]);

  // Load setup completion status and update agent configuration level
  useEffect(() => {
    const storedSetupCompleted = localStorage.getItem('setup_completed');
    if (storedSetupCompleted === 'true') {
      setSetupCompleted(true);
    }

    // Update agent configuration level based on userAgent status
    const currentAgent = localUserAgent || userAgent;
    if (currentAgent && currentAgent.id) {
      console.log("AuthProvider: User agent detected, updating configuration level", currentAgent);
      const hasBasicConfig = currentAgent.configuration?.businessInfo?.name && currentAgent.configuration?.voice;
      const hasCompleteConfig = hasBasicConfig && currentAgent.configuration?.script && currentAgent.configuration?.personality;
      
      if (hasCompleteConfig) {
        setAgentConfigurationLevel('complete');
      } else if (hasBasicConfig) {
        setAgentConfigurationLevel('basic');
      } else {
        setAgentConfigurationLevel('basic'); // Give benefit of the doubt if agent exists
      }
    } else {
      console.log("AuthProvider: No user agent found, setting configuration level to none");
      setAgentConfigurationLevel('none');
    }

    // Run smart detection to update progress state based on existing data
    detectProgressFromData(currentAgent, onboardingData, outreachData);
  }, [localUserAgent, userAgent, onboardingData, outreachData, setAgentConfigurationLevel, detectProgressFromData]);

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
    updateProgressState({
      hasLeads: false,
      hasVoiceIntegration: false,
      hasCampaigns: false,
      agentConfigurationLevel: 'none'
    });
  };

  const createUserAgent = async (data: OnboardingData): Promise<UserAgent> => {
    console.log("AuthProvider: Creating user agent with data:", data);
    
    try {
      const newAgent = await authService.createUserAgent(data);
      console.log("AuthProvider: Successfully created agent:", newAgent);
      
      setUserAgentStorage(newAgent);
      setLocalUserAgent(newAgent);
      setSetupCompleted(true);
      setAgentConfigurationLevel('basic');
      
      // Update progress state
      updateProgressState({
        hasVoiceIntegration: !!data.selectedVoice,
        agentConfigurationLevel: 'basic'
      });
      
      return newAgent;
    } catch (error) {
      console.error("AuthProvider: Error creating user agent:", error);
      throw error;
    }
  };

  // Enhanced setUserAgent function that updates both storage and local state
  const setUserAgent = (agent: UserAgent | null) => {
    console.log("AuthProvider: Setting user agent:", agent);
    setUserAgentStorage(agent);
    setLocalUserAgent(agent);
    
    if (agent) {
      // Update progress state when agent is set
      updateProgressState({
        hasVoiceIntegration: !!agent.configuration?.voice,
        agentConfigurationLevel: 'basic'
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
