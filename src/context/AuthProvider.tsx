
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, OnboardingData, UserAgent, AuthContextType, ProgressState } from './types/authTypes';
import { OutreachData } from '@/components/dashboard/outreach/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useProgressState } from './hooks/useProgressState';
import { authService } from './services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User>('user');
  const [userAgent, setUserAgent] = useLocalStorage<UserAgent>('user_agent');
  const [onboardingData, setOnboardingData] = useLocalStorage<OnboardingData>('onboarding_data');
  const [outreachData, setOutreachData] = useLocalStorage<OutreachData>('outreach_data');
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [campaignBuilderData, setCampaignBuilderData] = useLocalStorage('campaignBuilderData', {});

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

  // Load setup completion status and update agent configuration level
  useEffect(() => {
    const storedSetupCompleted = localStorage.getItem('setup_completed');
    if (storedSetupCompleted === 'true') {
      setSetupCompleted(true);
    }

    // Update agent configuration level based on userAgent status
    if (userAgent && userAgent.id) {
      console.log("AuthProvider: User agent detected, updating configuration level", userAgent);
      const hasBasicConfig = userAgent.configuration?.businessInfo?.name && userAgent.configuration?.voice;
      const hasCompleteConfig = hasBasicConfig && userAgent.configuration?.script && userAgent.configuration?.personality;
      
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
    detectProgressFromData(userAgent, onboardingData, outreachData);
  }, [userAgent, onboardingData, outreachData, setAgentConfigurationLevel, detectProgressFromData]);

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
    setUserAgent(null);
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
      
      setUserAgent(newAgent);
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

  // Enhanced setUserAgent function that updates related state
  const enhancedSetUserAgent = (agent: UserAgent | null) => {
    console.log("AuthProvider: Setting user agent:", agent);
    setUserAgent(agent);
    
    if (agent) {
      // Update progress state when agent is set
      updateProgressState({
        hasVoiceIntegration: !!agent.configuration?.voice,
        agentConfigurationLevel: 'basic'
      });
    }
  };

  const hasCompletedSetup = (): boolean => {
    const completed = setupCompleted && !!userAgent && !!userAgent.id;
    console.log("AuthProvider: hasCompletedSetup check:", { 
      setupCompleted, 
      userAgent: !!userAgent, 
      agentId: userAgent?.id,
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
    userAgent,
    outreachData,
    setupCompleted,
    progressState,
    isAuthenticated,
    login,
    googleLogin,
    signup,
    logout,
    setOnboardingData,
    setUserAgent: enhancedSetUserAgent,
    setOutreachData,
    createUserAgent,
    hasCompletedSetup,
    markSetupCompleted,
    campaignBuilderData,
    setCampaignBuilderData,
    updateProgressState,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};
